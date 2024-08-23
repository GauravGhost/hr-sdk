"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const highrise_1 = require("./highrise");
class HR {
    constructor(token, roomId) {
        this.highrise = new highrise_1.Highrise(token, roomId);
        this.requestEvent = this.highrise.requestEvent;
    }
}
exports.default = HR;
