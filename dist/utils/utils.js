"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRid = generateRid;
function generateRid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
