import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from 'ws';

import { constant, emitEvent, eventRequest } from '../utils/constant';

import RequestEvent from "./events/requestEvents/RequestEvents"
import { ResponseEventFactory } from "./events/ResponseEventFactory";
import { HighriseError } from "../utils/error";

export class Highrise extends EventEmitter {
  public ws: WebSocket | null;
  private keepaliveInterval: NodeJS.Timeout | null;
  public requestEvent: RequestEvent
  private responseEventFactory: ResponseEventFactory
  constructor(private token: string, private roomId: string, public options?: any) {
    super();
    this.ws = null;
    this.options = {};
    this.keepaliveInterval = null;
    this.requestEvent = new RequestEvent(this)
    this.responseEventFactory = new ResponseEventFactory(this);
  }



  connect(token: string, roomId: string, cb: () => void) {
    if ((!token || token === "") && (!this.token || this.token === "")) {
      this.emit(emitEvent.Error, new HighriseError("[Aborted] Please supply a bot token in your configuration file."));
      return;
    }

    if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
      this.emit(emitEvent.Error, new HighriseError("[Aborted] Please supply a room ID in your configuration file."));
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
    this.addEventListeners(cb);
  }

  #sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({ _type: eventRequest.KeepaliveRequest, rid: null }));
    }
  }

  addEventListeners(cb: () => void) {
    if (!this.ws) return;
    this.ws.addEventListener('open', () => {
      if(typeof cb == 'function') cb();
      this.#sendKeepalive();

      if (this.keepaliveInterval) {
        clearInterval(this.keepaliveInterval);
      }

      this.keepaliveInterval = setInterval(() => this.#sendKeepalive(), 15000);
    });

    this.ws.addEventListener('message', (message: any) => this.handleMessage(message));
    this.ws.addEventListener('close', this.close.bind(this));
    this.ws.addEventListener('error', (error: any) => this.errorHandler(error));

  }
  handleMessage(message: MessageEvent<any>) {
    const data = JSON.parse(message.data);
    if (data._type === 'KeepaliveResponse') {
      return;
    }
    const handler = this.responseEventFactory.getHandler(data._type);
    if (handler) {
      handler.handle(data);
    } else {
      console.log("No handler for event type: ", data._type);
    }
  }

  close() {
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = null;
    }
  }

  errorHandler(error: ErrorEvent) {
    console.log("error", error.message);
  }
}