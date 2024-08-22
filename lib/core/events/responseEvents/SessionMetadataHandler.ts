import { EventEmitter } from "stream";
import { IMessageHandler } from "../EventFactory";
import { cacheKeys, emitEvent } from "../../../utils/constant";
import hrCache, {HRCache} from '../../../utils/cache';
type room_info = {
    owner_id: string,
    room_name: string
}
type data = {
    user_id: string;
    room_info: room_info;
    rate_limits: {};
    connection_id: string;
    sdk_version: string;
}

export class SessionMetadataHandler implements IMessageHandler {
    private emitter: EventEmitter;
    private cache: HRCache

    constructor(emitter: EventEmitter) {
        this.emitter = emitter;
        this.cache = hrCache;
    }

    handle(data: data): void {
        this.emitter.emit(emitEvent.Ready, {
            user_id: data.user_id,
            room_info: data.room_info,
            rate_limits: data.rate_limits,
            connection_id: data.connection_id,
        });
        this.cache.set(cacheKeys.owner_id, data.room_info.owner_id);
        this.cache.set(cacheKeys.bot_user_id, data.user_id);
        this.cache.set(cacheKeys.room_name, data.room_info.room_name);
    }
}

