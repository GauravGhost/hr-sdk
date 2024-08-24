"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactions = exports.playerFace = exports.cacheKeys = exports.emitEvent = exports.eventResponse = exports.eventRequest = exports.constant = void 0;
exports.constant = {
    WEB_API_ENDPOINT: "https://webapi.highrise.game",
    WS_ENDPOINT: "wss://highrise.game/web/webapi"
};
exports.eventRequest = {
    AnchorHitRequest: "AnchorHitRequest",
    BuyItemRequest: "BuyItemRequest",
    BuyRoomBoostRequest: "BuyRoomBoostRequest",
    BuyVoiceTimeRequest: "BuyVoiceTimeRequest",
    ChangeRoomPrivilegeRequest: "ChangeRoomPrivilegeRequest",
    ChannelRequest: "ChannelRequest",
    ChatRequest: "ChatRequest",
    CheckVoiceChatRequest: "CheckVoiceChatRequest",
    EmoteRequest: "EmoteRequest",
    FloorHitRequest: "FloorHitRequest",
    GetBackpackRequest: "GetBackpackRequest",
    GetConversationsRequest: "GetConversationsRequest",
    GetInventoryRequest: "GetInventoryRequest",
    GetMessagesRequest: "GetMessagesRequest",
    GetRoomPrivilegeRequest: "GetRoomPrivilegeRequest",
    GetRoomUsersRequest: "GetRoomUsersRequest",
    GetUserOutfitRequest: "GetUserOutfitRequest",
    GetWalletRequest: "GetWalletRequest",
    InviteSpeakerRequest: "InviteSpeakerRequest",
    KeepaliveRequest: "KeepaliveRequest",
    LeaveConversationRequest: "LeaveConversationRequest",
    ModerateRoomRequest: "ModerateRoomRequest",
    MoveUserToRoomRequest: "MoveUserToRoomRequest",
    ReactionRequest: "ReactionRequest",
    RemoveSpeakerRequest: "RemoveSpeakerRequest",
    SendMessageRequest: "SendMessageRequest",
    SetOutfitRequest: "SetOutfitRequest",
    TeleportRequest: "TeleportRequest",
    TipUserRequest: "TipUserRequest"
};
exports.eventResponse = {
    AnchorHitResponse: 'AnchorHitResponse',
    BuyItemResponse: 'BuyItemResponse',
    BuyRoomBoostResponse: 'BuyRoomBoostResponse',
    BuyVoiceTimeResponse: 'BuyVoiceTimeResponse',
    ChangeRoomPrivilegeResponse: 'ChangeRoomPrivilegeResponse',
    ChannelEvent: 'ChannelEvent',
    ChannelResponse: 'ChannelResponse',
    ChatEvent: 'ChatEvent',
    CheckVoiceChatResponse: 'CheckVoiceChatResponse',
    EmoteEvent: 'EmoteEvent',
    EmoteResponse: 'EmoteResponse',
    Error: 'Error',
    FloorHitResponse: 'FloorHitResponse',
    GetConversationsResponse: 'GetConversationsResponse',
    GetInventoryResponse: 'GetInventoryResponse',
    GetMessagesResponse: 'GetMessagesResponse',
    GetRoomPrivilegeResponse: 'GetRoomPrivilegeResponse',
    GetRoomUsersResponse: 'GetRoomUsersResponse',
    GetUserOutfitResponse: 'GetUserOutfitResponse',
    GetWalletResponse: 'GetWalletResponse',
    KeepaliveResponse: 'KeepaliveResponse',
    LeaveConversationResponse: 'LeaveConversationResponse',
    MessageEvent: 'MessageEvent',
    ModerateRoomResponse: 'ModerateRoomResponse',
    MoveUserToRoomResponse: 'MoveUserToRoomResponse',
    ReactionEvent: 'ReactionEvent',
    ReactionResponse: 'ReactionResponse',
    RoomModeratedEvent: 'RoomModeratedEvent',
    SendBulkMessageResponse: 'SendBulkMessageResponse',
    SendMessageResponse: 'SendMessageResponse',
    SessionMetadata: 'SessionMetadata',
    SetOutfitResponse: 'SetOutfitResponse',
    TeleportResponse: 'TeleportResponse',
    TipReactionEvent: 'TipReactionEvent',
    TipUserResponse: 'TipUserResponse',
    UserJoinedEvent: 'UserJoinedEvent',
    UserLeftEvent: 'UserLeftEvent',
    UserMovedEvent: 'UserMovedEvent',
    VoiceEvent: 'VoiceEvent'
};
exports.emitEvent = {
    Ready: 'Ready',
    PlayerJoin: 'PlayerJoin',
    PlayerLeft: 'PlayerLeft',
    Chat: 'Chat',
    PlayerMovement: "PlayerMovement",
    PlayerSit: "PlayerSit",
    Error: "Error"
};
exports.cacheKeys = {
    owner_id: 'owner_id',
    room_name: 'room_name',
    bot_user_id: 'bot_user_id',
};
exports.playerFace = {
    BackLeft: 'BackLeft',
    BackRight: 'BackRight',
    FrontLeft: 'FrontLeft',
    FrontRight: 'FrontRight'
};
exports.reactions = {
    clap: "clap",
    heart: "heart",
    thumbs: "thumbs",
    wave: "wave",
    wink: "wink"
};
const moderationActions = {
    kick: "kick",
    ban: "ban",
    unban: "unban",
    mute: "mute",
    unmute: "unmute"
};
const goldBars = {
    gold_bar_1: "gold_bar_1",
    gold_bar_5: "gold_bar_5",
    gold_bar_10: "gold_bar_10",
    gold_bar_50: "gold_bar_50",
    gold_bar_100: "gold_bar_100",
    gold_bar_500: "gold_bar_500",
    gold_bar_1k: "gold_bar_1k",
    gold_bar_5000: "gold_bar_5000",
    gold_bar_10k: "gold_bar_10k"
};
