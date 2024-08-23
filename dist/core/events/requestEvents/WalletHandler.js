"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletHandler = void 0;
const constant_1 = require("../../../utils/constant");
const error_1 = require("../../../utils/error");
const utils_1 = require("../../../utils/utils");
class WalletHandler {
    createPayload(data) {
        if (!data) {
            throw new error_1.PayloadError("data cannot be empty");
        }
        const payload = {
            _type: constant_1.eventRequest.GetWalletRequest,
            rid: (0, utils_1.generateRid)(),
        };
        return payload;
    }
}
exports.WalletHandler = WalletHandler;
