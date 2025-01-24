import { AxiosResponse } from "axios";
import WebApi from "./WebApi";
import { RoomResponse, UserResponse } from "../../types/types";
import { convertKeysToCamelCase } from "../../utils/utils";

const webApi = new WebApi();

export const webApiImpl = {
    getUserById(userId: string): Promise<UserResponse> {
        const endpoint = `/users/${userId}`;
        return webApi.get(endpoint)
            .then((response: AxiosResponse) => convertKeysToCamelCase(response.data.user))
            .catch((error) => {
                throw error;
            });
    },

    getUserByUsername(username: string): Promise<UserResponse> {
        const endpoint = '/users';
        const queryParams = { username };
        return webApi.get(endpoint, queryParams)
            .then((response: AxiosResponse) => {
                const user = response.data.users[0];
                if (!user && user.username !== username) {
                    throw new Error("User not found");
                }
                return this.getUserById(user.user_id)
                    .then((userResponse: UserResponse) => userResponse);
            })
            .catch((error) => {
                throw error;
            });
    },

    getRoomById(roomId: string): Promise<RoomResponse> {
        const endpoint = `/rooms/${roomId}`;
        return webApi.get(endpoint)
            .then((response: AxiosResponse) => {
                const roomData = response.data.room;
                if (!roomData) { throw new Error("Room not found") }
                return convertKeysToCamelCase(roomData);
            })
            .catch((error) => {
                throw error;
            })
    }
}


