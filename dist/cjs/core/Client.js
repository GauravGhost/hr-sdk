"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const highrise_1 = require("./highrise");
class HR {
    constructor(token, roomId, options = {}) {
        this.highrise = new highrise_1.Highrise(token, roomId, options);
        this.connect = this.highrise.connect.bind(this.highrise);
        this.on = this.highrise.on.bind(this.highrise);
        this.action = this.highrise.action;
    }
}
exports.default = HR;
