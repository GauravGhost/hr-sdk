"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApiImpl = void 0;
const WebApi_1 = __importDefault(require("./WebApi"));
const webApi = new WebApi_1.default();
exports.webApiImpl = {
    getUserById(userId) {
        const endpoint = `/users/${userId}`;
        return webApi.get(endpoint)
            .then((response) => response.data.user)
            .catch((error) => {
            console.error('Error fetching user by ID:', error);
            throw error;
        });
    },
    getUserByUsername(username) {
        const endpoint = '/users';
        const queryParams = { username };
        return webApi.get(endpoint, queryParams)
            .then((response) => {
            const user = response.data.users[0];
            if (!user && user.username !== username) {
                throw new Error("User not found");
            }
            return this.getUserById(user.user_id)
                .then((userResponse) => userResponse);
        })
            .catch((error) => {
            console.error('Error fetching user by username:', error);
            throw error;
        });
    }
};
