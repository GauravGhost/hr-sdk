"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("../../utils/constant");
class WebApi {
    constructor() {
        this.baseUrl = constant_1.constant.WEB_API_ENDPOINT;
        this.sort_order = ['asc', 'desc'];
    }
    async get(endpoint, queryParams = {}, params = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await axios_1.default.get(url, {
                params: queryParams,
                ...params,
            });
            return response;
        }
        catch (error) {
            console.error(`Error in GET request to ${endpoint}:`, error);
            throw error; // Re-throw the error for handling in the calling code
        }
    }
}
exports.default = WebApi;
