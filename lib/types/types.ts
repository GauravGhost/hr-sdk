export enum EmitEvent {
    Ready = 'Ready',
    PlayerJoin = 'PlayerJoin',
    PlayerLeft = 'PlayerLeft',
    Chat = 'Chat',
    PlayerMovement = "PlayerMovement",
    PlayerSit = "PlayerSit",
    Error = "Error"
}


export enum Reaction {
    clap = "clap",
    heart = "heart",
    thumbs = "thumbs",
    wave = "wave",
    wink = "wink"
}

export enum Facing {
    FrontRight = "FrontRight",
    FrontLeft = "FrontLeft",
    BackRight = "BackRight",
    BackLeft = "BackLeft"
}

export enum ModerationAction {
    kick = "kick",
    ban = "ban",
    unban = "unban",
    mute = "mute",
    unmute = "unmute"
}

export enum PaymentMethod {
    bot_wallet_only = "bot_wallet_only"
}

export enum GoldBars {
    goldBar1 = "gold_bar_1",
    goldBar5 = "gold_bar_5",
    goldBar10 = "gold_bar_10",
    goldBar50 = "gold_bar_50",
    goldBar100 = "gold_bar_100",
    goldBar500 = "gold_bar_500",
    goldBar1k = "gold_bar_1k",
    goldBar5000 = "gold_bar_5000",
    goldBar10k = "gold_bar_10k"
};

export enum WalletType {
    gold = "gold",
    roomBoostTokens = "room_boost_tokens",
    roomVoiceTokens = "room_voice_tokens"
}

export enum PaymentResult  {
    success = "success",
    insufficientFunds = "insufficient_funds",
    onlyTokenBought = "only_token_bought",
}

export enum MessageType {
    text = "text",
    invite = "invite"
}

export interface Position {
    x: number,
    y: number,
    z: number,
    facing: number
}

export interface Item {
    type: Array<string>
    amount: number;
    id: string;
    accountBound: boolean
    activePalette: number | null
}

export interface CurrencyItem{
    type: string;
    amount: number
}

export interface RoomPermission {
    moderator: boolean | null;
    designer: boolean | null;
}

export interface User {
    id: string;
    username: string;
}

export interface Conversation {
    id: string;
    didJoin: boolean;
    unreadCount: number;
    muted: boolean;
    memberIds: string[];
    name: string;
    ownerId: string;
}

export interface Message {
    messageId: string;
    conversationId: string;
    createdAt: string | null;
    content: string;
    senderId: string;
    category: MessageType;
}


export interface RoomInfo {
    roomName: string;
    ownerId: string;
}


export interface AnchorPosition {
    entityId: string;
    anchor_id: number;
}

export interface EmotePayload {
    emoteId: string,
    targetUserId?: string
}

export interface Wallet {
    type: WalletType;
    amount: number
}

export interface RoomUser {
    user: User;
    position: Position;
}

export interface RoomUsers {
    users: RoomUser[];
}

export interface WhisperPayload {
    message: string;
    whisperTargetId: string;
}

export interface AnchorHitPayload {
    entityId: string,
    anchorIx: number,
}

export interface FloorHitPayload extends Position {
}


export interface TeleportPayload {
    userId: string;
    destination: Position
}

export interface ReactionPayload {
    reaction: Reaction;
    targetUserId: string;
}

export interface ChannelPayload {
    message: string,
    tags: Set<string>
    onlyTo: Set<string>
}

export interface ModerateRoomPayload {
    userId: string;
    moderationAction: ModerationAction;
    actionLength: number;
}

// async
export interface GetRoomPrivilegePayload {
    userId: string;
}

export interface ChangeRoomPrevilegePayload {
    userId: string;
    permission: RoomPermission;
}

export interface MoveUserToRoomPayload {
    userId: string;
    roomId: string;
}

// async backpack
export interface GetBackpackPayload {
    userId: string;
}

export interface ChangeBackpackPayload {
    userId: string;
    changes: Array<string>
}

export interface CheckVoiceChatPayload {

}

export interface CheckVoiceChatResponse {
    secondsLeft: number;
    autoSpeakers: string[];
    // users: 
}

export interface InviteSpeakerPayload {
    userId: string;
}

export interface RemoveSpeakerPayload {
    userId: string;
}

export interface GetUserOutfitPayload {
    userId: string;
}

export interface GetUserOutfitResponse {
    outfit: Array<Item>;
}

export interface GetConversationsPayload {
    notJoined: boolean;
    lastId: string;
}

export interface GetConversationsResponse {
    conversations: Array<Conversation>
    notJoined: number;
}


export interface SendMessagePayload {
    conversationId: string;
    content: string;
    type: MessageType
    roomId: string | null;
    worldId: string | null;
}

export interface SendBulkMessagePayload {
    userIds: Array<string>;
    content: string;
    type: MessageType;
    roomId: string | null;
    worldId: string | null;
}

export interface GetMessagePayload {
    conversationId: string;
    lastMessageId: string | null;
}

export interface GetMessageResponse {
    messages: Message;
}

export interface LeaveConversationPayload {
    conversationId: string;
}


export interface BuyVoiceTimePayload {
    paymentMethod: PaymentMethod
}

export interface BuyVoiceTimeResponse {
    result: PaymentResult;
}

export interface BuyRoomBoostPayload {
    paymentMethod: PaymentMethod;
    amount: number;
}

export interface BuyRoomBoostResponse {
    result: PaymentResult;
}

export interface TipUserPayload {
    userId: string;
    goldBar: GoldBars;
}

export interface TipUserResponse {
    result: PaymentResult;
}

export interface GetInventoryPayload {
}

export interface GetInventoryResponse {
    items: Array<Item>
}

export interface SetOutfitPayload {
    outfit: Array<Item>;
}

export interface BuyItemPayload {
    itemId: string;
}

export interface BuyItemResponse {
    result: PaymentResult;
}

export interface RateLimit {
    client: Array<number>;
    socials: Array<number>;
}

/**
 * ================== Events ==================
 */

export interface SessionMetadataEvent {
    userId: string;
    roomInfo: RoomInfo;
    connectionId: string;
    rateLimits: RateLimit
    sdkVersion: string;
}

export interface ChatEvent {
    user: User;
    message: string;
    whisper: boolean
}
export interface EmoteEvent {
    userId: string;
    emoteId: string;
    receiver: User | null;
}

export interface ReactionEvent {
    user: User
    reaction: Reaction
    receiver: User
}

export interface PlayerJoinedEvent {
    user: User
    position: Position | AnchorPosition;
}

export interface PlayerLeftEvent {
    user: User
}

export interface ChannelEvent {
    senderId: string;
    msg: string;
    tags: string[];
}

export interface TipReactionEvent {
    sender: User;
    receiver: User;
    item: Item | CurrencyItem
}

export interface UserMovedEvent {
    user: User,
    position: Position | AnchorPosition
}

// export interface VoiceUser{
//     user: User,


// }
// export interface VoiceEvent {
//     users: Array<User>
//     secondsLeft: number
// }

export interface MessageEvent {
    userId: string;
    conversationId: string;
    isNewConversation: boolean;
}

export interface RoomModeratedEvent {
    moderatorId: string;
    targetUserId: string;
    moderationType: ModerationAction;
    duration: number | null;
}

