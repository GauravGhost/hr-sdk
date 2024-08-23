import { EventEmitter } from 'events';
interface Events {
    metadata: {
        user_id: string;
        room_info: {
            owner_id: string;
            room_id: string;
        };
        rate_limits: {};
        connection_id: string;
        sdk_version: string;
    };
}
declare class CustomTypedEventEmitter extends EventEmitter {
    emit(event: keyof Events, ...args: any[]): boolean;
    on(event: keyof Events, listener: (...args: any[]) => void): this;
    once(event: keyof Events, listener: (...args: any[]) => void): this;
}
export default CustomTypedEventEmitter;
