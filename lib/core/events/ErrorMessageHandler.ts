import { IMessageHandler } from "./EventFactory";

export class ErrorMessageHandler implements IMessageHandler {
    handle(data: any): void {
        console.log("Error event: ", data);
    }
}