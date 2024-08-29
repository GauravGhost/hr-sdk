import RequestEvent from "./events/RequestEventsHandler";
declare class HR {
    private highrise;
    action: RequestEvent;
    on: (...args: any[]) => void;
    connect: (token: string, roomId: string, cb: () => void) => void;
    constructor(token: string, roomId: string, options?: any);
}
export default HR;
