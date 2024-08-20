import { EventEmitter } from "stream";
import WebSocket, { WebSocketServer } from 'ws';

import {constant} from './utils/constant';

export class Highrise extends EventEmitter {
  private ws: WebSocket | null;
  private keepaliveInterval: NodeJS.Timeout | null;
  constructor(private token: string, private roomId: string) {
    super();
    this.ws = null;
    this.keepaliveInterval = null;
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

  sendKeepalive() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ _type: constant.KeepaliveRequest, rid: null }));
    }
  }

  addEventListeners() {
    if (!this.ws) return;
    this.ws.addEventListener('open', () => {
      console.log(`Connected the bot to the highrise`);
      this.sendKeepalive();

      if (this.keepaliveInterval) {
        clearInterval(this.keepaliveInterval);
      }

      this.keepaliveInterval = setInterval(() => this.sendKeepalive(), 15000);
    });

    this.ws.addEventListener('message', this.handleMessage.bind(this));
    this.ws.addEventListener('close', this.close.bind(this));
    
  }
  handleMessage(message: WebSocket.MessageEvent) {
    // Handle incoming messages
  }

  close() {
    // Handle close
    if (this.keepaliveInterval) {
      clearInterval(this.keepaliveInterval);
      this.keepaliveInterval = null;
    }
  }

}