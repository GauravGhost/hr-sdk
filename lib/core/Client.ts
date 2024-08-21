import { Highrise } from "./highrise";
import RequestEvent from "./events/requestEvents/RequestEvents";


class HR {
    private highrise: Highrise
    public requestEvent: RequestEvent
    public on: (...args: any[]) => void;
    public connect: (token: string, roomId: string) => void;

    constructor(token: string, roomId: string) {
        this.highrise = new Highrise(token, roomId);
        this.connect = this.highrise.connect.bind(this.highrise);
        this.on = this.highrise.on.bind(this.highrise);
        this.requestEvent = this.highrise.requestEvent;
    }
}


export default HR;