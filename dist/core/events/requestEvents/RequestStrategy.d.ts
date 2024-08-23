import { Highrise } from "../../highrise";
export interface RequestStrategy {
    createPayload(message: any): object;
}
declare class RequestEventStrategy {
    private hr;
    private strategy;
    constructor(hr: Highrise, strategy: RequestStrategy);
    execute(incomingPayload: any): void;
}
export declare class RequestEventWithPromiseStrategy {
    private hr;
    private strategy;
    constructor(hr: Highrise, strategy: RequestStrategy);
    execute(incomingPayload: any): Promise<any>;
}
export default RequestEventStrategy;
