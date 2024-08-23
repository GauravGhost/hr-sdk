import { AxiosResponse } from 'axios';
declare class WebApi {
    private baseUrl;
    sort_order: Array<string>;
    constructor();
    get<T>(endpoint: string, queryParams?: Record<string, any>, params?: Record<string, any>): Promise<AxiosResponse<T>>;
}
export default WebApi;
