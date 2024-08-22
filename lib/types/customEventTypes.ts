// CustomTypedEventEmitter.ts
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

class CustomTypedEventEmitter extends EventEmitter {
    emit(event: keyof Events, ...args: any[]) {
        return super.emit(event, ...args);
    }

    on(event: keyof Events, listener: (...args: any[]) => void) {
        return super.on(event, listener);
    }

    once(event: keyof Events, listener: (...args: any[]) => void) {
        return super.once(event, listener);
    }
}

export default CustomTypedEventEmitter;
