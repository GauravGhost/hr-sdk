import { AxiosResponse } from "axios";
import WebApi from "./WebApi";

const webApi = new WebApi();

export const webApiImpl = {
    getUserById(userId: string): Promise<any> {
        const endpoint = `/users/${userId}`;
        return webApi.get(endpoint)
            .then((response: AxiosResponse) => response.data.user)
            .catch((error) => {
                console.error('Error fetching user by ID:', error);
                throw error;
            });
    },

    getUserByUsername(username: string): Promise<any> {
        const endpoint = '/users';
        const queryParams = { username };
        return webApi.get(endpoint, queryParams)
            .then((response: AxiosResponse) => { 
                const user = response.data.users[0];
                if(!user && user.username !== username) {
                    throw new Error("User not found");
                }
                return this.getUserById(user.user_id)
                .then((userResponse: AxiosResponse) =>  userResponse);
            })
            .catch((error) => {
                console.error('Error fetching user by username:', error);
                throw error;
            });
    }
}


