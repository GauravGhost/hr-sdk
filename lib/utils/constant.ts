export const constant = {
    WEB_API_ENDPOINT: "https://webapi.highrise.game",
    WS_ENDPOINT: "wss://highrise.game/web/webapi"
}
export const eventRequest = {
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

export const eventResponse = {
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


export const emitEvent = {
    Ready: 'Ready',
    PlayerJoin: 'PlayerJoin',
    PlayerLeft: 'PlayerLeft',
    Chat: 'Chat',
    PlayerMovement: "PlayerMovement",
    PlayerSit: "PlayerSit",
    Error: "Error"
}

export const cacheKeys = {
    owner_id: 'owner_id',
    room_name: 'room_name',
    bot_user_id: 'bot_user_id',
}