import { AnchorHitPayload, BuyItemPayload, Conversation, CurrencyItem, EmotePayload, FloorHitPayload, GetRoomPrivilegePayload, Item, Message, ModerateRoomPayload, Position, RoomPermission, SetOutfitPayload, TeleportPayload, TipUserPayload, User, WhisperPayload } from "../types/types";
type ValidationSchema<T> = {
    [K in keyof T]: 'required' | 'optional';
};
export declare function validate<T>(data: T, schema: ValidationSchema<T>): string | null;
export declare function validateEnum(value: any, enumType: any): string | null;
export declare const validateAndThrow: (validationResult: string | null) => void;
/**
 * =================== Schema Definition =================
 */
export declare const itemSchema: ValidationSchema<Item>;
export declare const positionSchema: ValidationSchema<Position>;
export declare const currencyItemSchema: ValidationSchema<CurrencyItem>;
export declare const conversationSchema: ValidationSchema<Conversation>;
export declare const messageSchema: ValidationSchema<Message>;
export declare const roomPermissionSchema: ValidationSchema<RoomPermission>;
export declare const userSchema: ValidationSchema<User>;
export declare const tipUserSchema: ValidationSchema<TipUserPayload>;
export declare const buyItemSchema: ValidationSchema<BuyItemPayload>;
export declare const setOutfitSchema: ValidationSchema<SetOutfitPayload>;
export declare const whisperSchema: ValidationSchema<WhisperPayload>;
export declare const emoteSchema: ValidationSchema<EmotePayload>;
export declare const anchorSchema: ValidationSchema<AnchorHitPayload>;
export declare const floorHitSchema: ValidationSchema<FloorHitPayload>;
export declare const teleportSchema: ValidationSchema<TeleportPayload>;
export declare const moderationSchema: ValidationSchema<ModerateRoomPayload>;
export declare const getRoomPrivilegeSchema: ValidationSchema<GetRoomPrivilegePayload>;
export {};
