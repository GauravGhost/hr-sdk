import RequestEvent from "./core/events/requestEvents/RequestEvents";
declare class HR {
    private highrise;
    requestEvent: RequestEvent;
    constructor(token: string, roomId: string);
}
export default HR;
