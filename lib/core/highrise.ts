import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from 'ws';

import {constant, eventRequest, eventResponse} from '../utils/constant';

import RequestEvent from "./events/requestEvents/RequestEvents"

export class Highrise extends EventEmitter {
  public ws: WebSocket | null;
  private keepaliveInterval: NodeJS.Timeout | null;
  public requestEvent: RequestEvent
  constructor(private token: string, private roomId: string) {
    super();
    this.ws = null;
    this.keepaliveInterval = null;
    this.requestEvent = new RequestEvent(this)
  }



  connect(token: string, roomId: string){
    if ((!token || token === "") && (!this.token || this.token === "")) {
      console.error("[Aborted] Please supply a bot token in your configuration file.");
      return;
    }

    if ((!roomId || roomId === "") && (!this.roomId || this.roomId === "")) {
      console.error("[Aborted] Please supply a room ID in your configuration file.");
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
    this.addEventListeners();
  }

  #sendKeepalive() {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({ _type: eventRequest.KeepaliveRequest, rid: null }));
    }
  }

  addEventListeners() {
    if (!this.ws) return;
    this.ws.addEventListener('open', () => {
      console.log(`Connected the bot to the highrise`);
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
    // console.log("data ", JSON.parse(message.data));
    const data = JSON.parse(message.data);
    console.log("event type: ", data._type);

    if(data._type === 'Error'){
      console.log("error event: ", data);
    }

    if(data?._type == eventResponse.ChatEvent){
      console.log("entering chat event");
      this.emit('chatCreate', data.user, data.message);
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

  sendMessage(message: any) {
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      let payload;
      if (message.whisper) {
        payload = {
          _type: eventRequest.ChatRequest,
          message: message.message,
          whisper_target_id: message.whisper_target_id,
          rid: message.rid
        };
      } else {
        console.log("meesage enter");
        payload = {
          _type: eventRequest.ChatRequest,
          message: message.message,
          rid: message.rid
        };
      }

      this.ws.send(JSON.stringify(payload));
    } else {
      return console.error("WebSocket is not open. Message cannot be sent.");
    }
  }

}