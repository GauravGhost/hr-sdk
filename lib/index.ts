import HR from './core/Client'

import { webApiImpl as webApi } from './core/apis/WebApiImpl';

import {
    // Enums
    EmitEvent as Event,
    Reaction,
    Facing,
    GoldBars,
    MessageType,
    PaymentResult,
    ModerationAction,
    PaymentMethod,

    // interface
    User,
    UserWithPosition,
    Position,
    Item,
    CurrencyItem,
    RoomPermission,
    Conversation,
    Message,
    AnchorPosition,

    // Events
    SessionMetadataEvent as ReadyEvent,
    PlayerJoinedEvent,
    PlayerLeftEvent,
    ChannelEvent,
    TipReactionEvent as TipEvent,
    PlayerMovedEvent,
    MessageEvent,
    RoomModeratedEvent,
    ChatEvent,
    ReactionEvent,
    EmoteEvent
} from "./types/types";

export {
    HR,
    webApi,
    // Enums with value
    Event,
    Reaction,
    Facing,
    GoldBars,
    MessageType,
    PaymentResult,
    ModerationAction,
    PaymentMethod,

    // interface
    User,
    UserWithPosition,
    Position,
    Item,
    CurrencyItem,
    RoomPermission,
    Conversation,
    Message,
    AnchorPosition,
    
    // Events
    ReadyEvent,
    ChatEvent,
    EmoteEvent,
    ReactionEvent,
    PlayerJoinedEvent,
    PlayerLeftEvent,
    ChannelEvent,
    TipEvent,
    PlayerMovedEvent,
    MessageEvent,
    RoomModeratedEvent,
}

export default HR;