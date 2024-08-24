import { Position, User } from "./requestEventTypes";

export interface Wallet {
    type: string;
    amount: number
}

export interface RoomUser {
    user: User;
    position: Position;
}

export interface RoomUsers {
    users: RoomUser[];
}
