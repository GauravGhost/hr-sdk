import axios, { AxiosResponse } from 'axios';
import { constant } from '../../utils/constant';

class WebApi {
    private baseUrl: string;
    sort_order: Array<string>;
    constructor() {
        this.baseUrl = constant.WEB_API_ENDPOINT;
        this.sort_order = ['asc', 'desc'];
    }

    async get<T>(endpoint: string, queryParams: Record<string, any> = {}, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await axios.get<T>(url, {
                params: queryParams,
                ...params,
            });
            return response;
        } catch (error) {
            console.error(`Error in GET request to ${endpoint}:`, error);
            throw error; // Re-throw the error for handling in the calling code
        }
    }
}

export default WebApi;
