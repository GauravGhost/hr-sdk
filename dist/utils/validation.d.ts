import { AnchorPosition, BuyItemPayload, Conversation, CurrencyItem, Item, Message, Position, RoomPermission, SetOutfitPayload, TipUserPayload, User } from "../types/types";
type ValidationSchema<T> = {
    [K in keyof T]: 'required' | 'optional';
};
export declare function validate<T>(data: T, schema: ValidationSchema<T>): string | null;
export declare function validateEnum(value: any, enumType: any): string | null;
/**
 * =================== Schema Definition =================
 */
export declare const itemSchema: ValidationSchema<Item>;
export declare const positionSchema: ValidationSchema<Position>;
export declare const anchorPositionSchema: ValidationSchema<AnchorPosition>;
export declare const currencyItemSchema: ValidationSchema<CurrencyItem>;
export declare const conversationSchema: ValidationSchema<Conversation>;
export declare const messageSchema: ValidationSchema<Message>;
export declare const roomPermissionSchema: ValidationSchema<RoomPermission>;
export declare const userSchema: ValidationSchema<User>;
export declare const tipUserSchema: ValidationSchema<TipUserPayload>;
export declare const buyItemSchema: ValidationSchema<BuyItemPayload>;
export declare const setOutfitSchema: ValidationSchema<SetOutfitPayload>;
export {};
