import axios from "axios";
import { constant } from "../../utils/constant";

class WebApi {
    private baseUrl: string;
    constructor(){
        this.baseUrl = constant.WEB_API_ENDPOINT
    }
}