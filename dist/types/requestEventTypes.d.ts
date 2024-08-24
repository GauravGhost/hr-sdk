export interface Position {
    x: number;
    y: number;
    z: number;
    facing: number;
}
export interface User {
    id: string;
    username: string;
}
export interface EmotePayload {
    emoteId: string;
    targetUserId?: string;
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
export declare enum Facing {
    FrontRight = 0,
    FrontLeft = 1,
    BackRight = 2,
    BackLeft = 3
}
export interface TeleportPayload {
    userId: string;
    destination: Position;
}
