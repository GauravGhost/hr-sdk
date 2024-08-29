import { Highrise } from "./highrise";
class HR {
    constructor(token, roomId, options = {}) {
        this.highrise = new Highrise(token, roomId, options);
        this.connect = this.highrise.connect.bind(this.highrise);
        this.on = this.highrise.on.bind(this.highrise);
        this.action = this.highrise.action;
    }
}
export default HR;
