import RequestEvent from "./events/RequestEventsHandler";
import { Highrise } from "./highrise";

class HR {
    private highrise: Highrise
    public action: RequestEvent
    public on: (...args: any[]) => void;
    public connect: (token: string, roomId: string, cb: () => void) => void;

    constructor(token?: string, roomId?: string, options: any = {}) {
        this.highrise = new Highrise(token, roomId, options);
        this.connect = this.highrise.connect.bind(this.highrise);
        this.on = this.highrise.on.bind(this.highrise);
        this.action = this.highrise.action;
    }
}


export default HR;