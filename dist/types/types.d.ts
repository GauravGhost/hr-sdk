export declare enum Reaction {
    clap = "clap",
    heart = "heart",
    thumbs = "thumbs",
    wave = "wave",
    wink = "wink"
}
export declare enum Facing {
    FrontRight = "FrontRight",
    FrontLeft = "FrontLeft",
    BackRight = "BackRight",
    BackLeft = "BackLeft"
}
export declare enum ModerationAction {
    kick = "kick",
    ban = "ban",
    unban = "unban",
    mute = "mute",
    unmute = "unmute"
}
export interface Position {
    x: number;
    y: number;
    z: number;
    facing: number;
}
export interface Item {
    type: Array<string>;
    amount: number;
    id: string;
    accountBound: boolean;
    activePalette: number | null;
}
export interface CurrencyItem {
    type: string;
    amount: number;
}
export interface RoomPermission {
    moderator: boolean | null;
    designer: boolean | null;
}
export interface User {
    id: string;
    username: string;
}
export interface AnchorPosition {
    entityId: string;
    anchor_id: number;
}
export interface EmotePayload {
    emoteId: string;
    targetUserId?: string;
}
export interface Wallet {
    type: string;
    amount: number;
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
    entityId: string;
    anchorIx: number;
}
export interface FloorHitPayload extends Position {
}
export interface TeleportPayload {
    userId: string;
    destination: Position;
}
export interface ReactionPayload {
    reaction: Reaction;
    targetUserId: string;
}
export interface ChannelPayload {
    message: string;
    tags: Set<string>;
    only_to: Set<string>;
}
export interface ModeraterateRoomPayload {
    userId: string;
    moderationAction: ModerationAction;
    actionLength: number;
}
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
export interface RoomInfoPayload {
    ownerId: string;
    roomName: string;
}
export interface GetBackpackRequest {
    userId: string;
}
export interface ChangeBackpackRequest {
    userId: string;
    changes: Array<string>;
}
export interface RateLimit {
    client: Array<number>;
    socials: Array<number>;
}
export interface SessionMetadataEvent {
    userId: string;
    roomInfo: RoomInfoPayload;
    connectionId: string;
    rateLimits: RateLimit;
    sdkVersion: string;
}
export interface ChatEvent {
    user: User;
    message: string;
    whisper: boolean;
}
export interface EmoteEvent {
    userId: string;
    emoteId: string;
    receiver: User | null;
}
export interface ReactionEvent {
    user: User;
    reaction: Reaction;
    receiver: User;
}
export interface PlayerJoinedEvent {
    user: User;
    position: Position | AnchorPosition;
}
export interface PlayerLeftEvent {
    user: User;
}
export interface ChannelEvent {
    senderId: string;
    msg: string;
    tags: string[];
}
export interface TipReactionEvent {
    sender: User;
    receiver: User;
    item: Item | CurrencyItem;
}
export interface UserMovedEvent {
    user: User;
    position: Position | AnchorPosition;
}
