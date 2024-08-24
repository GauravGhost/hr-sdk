export interface Position {
    x: number,
    y: number,
    z: number,
    facing: number
}

export interface User {
    id: string;
    username: string;
}
export interface EmotePayload {
    emoteId: string,
    targetUserId?: string
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

export enum Facing {
    FrontRight,
    FrontLeft,
    BackRight,
    BackLeft
}

export interface TeleportPayload {
    userId: string;
    destination: Position
}
