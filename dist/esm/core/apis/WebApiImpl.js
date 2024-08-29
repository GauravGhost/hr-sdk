import WebApi from "./WebApi";
const webApi = new WebApi();
export const webApiImpl = {
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
