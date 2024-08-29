import axios from 'axios';
import { constant } from '../../utils/constant';
class WebApi {
    constructor() {
        this.baseUrl = constant.WEB_API_ENDPOINT;
        this.sort_order = ['asc', 'desc'];
    }
    async get(endpoint, queryParams = {}, params = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await axios.get(url, {
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
export default WebApi;
