import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from 'ws';

import { constant, eventRequest, eventResponse } from '../utils/constant';

import { ResponseEventFactory } from "./events/ResponseEvent";
import { HighriseError } from "../utils/error";
import RequestEvent from "./events/RequestEventsHandler";
import { Options } from "../types/types";

export class Highrise extends EventEmitter {

  public ws: WebSocket | null;
  private keepaliveInterval: NodeJS.Timeout | null;
  private reconnectTimeout: NodeJS.Timeout | null;
  private retryAttempts: number;
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  public action: RequestEvent
  private isChangingRoom: boolean = false;
  private readonly responseEventFactory: ResponseEventFactory

  constructor(private token?: string, private roomId?: string, public options?: Options) {
    super();
    this.ws = null;
    this.options = options || {};
    this.keepaliveInterval = null;
    this.reconnectTimeout = null;
    this.retryAttempts = 0;
    this.maxRetries = this.options.maxRetries ?? 5;
    this.retryDelay = this.options.retryDelay ?? 2000;
    this.action = new RequestEvent(this)
    this.responseEventFactory = new ResponseEventFactory(this);
  }



  connect(token: string, roomId: string, cb?: () => void) {
    if ((!token || token === "") && (!this.token || this.token === "")) {
      this.emit(eventResponse.Error, new HighriseError("[Aborted] Please supply a bot token in your configuration file."));
      return;
    }

    if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
      this.emit(eventResponse.Error, new HighriseError("[Aborted] Please supply a room ID in your configuration file."));
      return;
    }

    this.token = token || this.token;
    this.roomId = roomId || this.roomId;

    this.ws = new WebSocket(constant.WS_ENDPOINT, {
      headers: {
        'room-id': this.roomId,
        'api-token': this.token,
      },
    });

    this.once(eventResponse.Error, (error: any) => {
      if (error.message.includes('Multilogin')) {
        console.log('Multilogin detected, handling reconnection...');
        this.cleanupConnection().then(() => {
          setTimeout(() => {
            this.connect(token, roomId, cb);
          }, 2000);
        });
      }
    });

    cb ? this.addEventListeners(cb) : this.addEventListeners();
  }

  #sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({ _type: eventRequest.KeepaliveRequest, rid: null }));
    }
  }

  addEventListeners(cb?: () => void) {
    if (!this.ws) return;
    this.ws.addEventListener('open', () => {
      if (typeof cb == 'function') cb();
      this.#sendKeepalive();

      if (this.keepaliveInterval) {
        clearInterval(this.keepaliveInterval);
      }

      this.keepaliveInterval = setInterval(() => this.#sendKeepalive(), 14000);
      this.retryAttempts = 0;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    });
    this.ws.addEventListener('message', (message: any) => this.handleMessage(message));
    this.ws.addEventListener('close', () => this.handleClose());
    this.ws.addEventListener('error', (error: any) => this.errorHandler(error));

  }
  handleMessage(message: MessageEvent<any>) {
    const data = JSON.parse(message.data);
    if (data._type === 'KeepaliveResponse') {
      return;
    }
    const handler = this.responseEventFactory.getHandler(data._type);
    if (handler) {
      handler?.handle(data);
    }
  }

  handleClose() {
    console.log("WebSocket connection closed");
    this.reconnect();
  }

  reconnect() {
    if (this.retryAttempts >= this.maxRetries) {
      console.error("Max retry attempts reached. Connection failed.");
      return;
    }

    const delay = this.retryDelay * Math.pow(2, this.retryAttempts); // Exponential backoff
    console.log(`Reconnecting in ${delay / 1000} seconds...`);
    this.retryAttempts++;

    this.reconnectTimeout = setTimeout(() => {
      console.log("Attempting to reconnect...");
      this.connect(this.token!, this.roomId!);
    }, delay);
  }

  async changeRoom(token: string, newRoomId: string): Promise<void> {
    try {
      if (this.isChangingRoom) {
        throw new Error('Room change already in progress');
      }

      this.isChangingRoom = true;
      const oldRoomId = this.roomId;

      // Clean up existing connection
      await this.cleanupConnection();

      // Wait before establishing new connection
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Connect to new room
      return new Promise((resolve, reject) => {
        try {
          this.connect(token, newRoomId, () => {
            this.emit('roomChanged', { oldRoomId, newRoomId });
            resolve();
          });

          // Handle connection errors
          const errorHandler = (error: Error) => {
            this.emit('error', error);
            reject(error);
          };

          this.once(eventResponse.Error, errorHandler);

          // Remove error handler after successful connection
          this.once('ready', () => {
            this.removeListener(eventResponse.Error, errorHandler);
          });
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      this.emit('error', error);
      throw error;
    } finally {
      this.isChangingRoom = false;
    }
  }

  private async cleanupConnection(): Promise<void> {
    return new Promise((resolve) => {
      // Clear intervals and timeouts
      if (this.keepaliveInterval) {
        clearInterval(this.keepaliveInterval);
        this.keepaliveInterval = null;
      }

      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }

      // Close WebSocket if it exists
      if (this.ws) {
        // Remove all existing listeners
        this.ws.removeAllListeners();

        // Add one-time close listener
        this.ws.once('close', () => {
          this.ws = null;
          resolve();
        });

        // Close the connection
        this.ws.close();
      } else {
        resolve();
      }
    });
  }

  async close(): Promise<void> {
    await this.cleanupConnection();
    this.emit('closed');
  }

  errorHandler(error: ErrorEvent) {
    console.log("websocket error", error.message);
    this.handleClose();
  }
}