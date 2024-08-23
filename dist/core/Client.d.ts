import RequestEvent from "./events/requestEvents/RequestEvents";
declare class HR {
    private highrise;
    requestEvent: RequestEvent;
    on: (...args: any[]) => void;
    connect: (token: string, roomId: string, cb: () => void) => void;
    constructor(token: string, roomId: string, options?: any);
}
export default HR;
