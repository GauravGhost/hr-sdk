import { AnchorHitPayload, BuyItemPayload, ChangeRoomPrevilegePayload, Conversation, CurrencyItem, EmotePayload, FloorHitPayload, GetRoomPrivilegePayload, Item, Message, ModerateRoomPayload, ModerationAction, Position, RoomPermission, RoomPermissionType, SetOutfitPayload, TeleportPayload, TipUserPayload, User, Wallet, WhisperPayload } from "../types/types";
import { PayloadError } from "./error";

type ValidationSchema<T> = {
    [K in keyof T]: 'required' | 'optional';
};

enum option {
    required = 'required',
    optional = 'optional'
}


export function validate<T>(data: T, schema: ValidationSchema<T>): string | null {
    for (const key in schema) {
        if (schema[key] === 'required') {
            if (data[key] === undefined || data[key] === null) {
                return `Missing ${key} property`;
            }
            if (typeof data[key] === 'object' && data[key] !== null) {
                const nestedSchema = schema[key] as unknown as ValidationSchema<any>;
                const nestedError = validate(data[key], nestedSchema);
                if (nestedError) {
                    return nestedError;
                }
            }
        }
    }
    return null;
}

export function validateEnum(value: any, enumType: any): string | null {
    if (!Object.values(enumType).includes(value)) {
        return `Invalid value: ${value}`;
    }
    return null;
}

export const validateAndThrow = (validationResult: string | null) => {
    if (validationResult) {
        throw new PayloadError(validationResult);
    }
};

/**
 * =================== Schema Definition =================
 */
export const itemSchema: ValidationSchema<Item> = {
    type: option.required,
    amount: option.required,
    id: option.required,
    accountBound: option.required,
    activePalette: option.optional, // Assuming activePalette can be optional
};

export const positionSchema: ValidationSchema<Position> = {
    x: option.required,
    y: option.required,
    z: option.required,
    facing: option.required,
};


export const currencyItemSchema: ValidationSchema<CurrencyItem> = {
    type: option.required,
    amount: option.required,
};


export const roomPermissionSchema: ValidationSchema<RoomPermissionType> = {
    designer: option.optional,
    moderator: option.optional,
}

export const conversationSchema: ValidationSchema<Conversation> = {
    id: option.required,
    didJoin: option.required,
    unreadCount: option.required,
    muted: option.required,
    memberIds: option.required,
    name: option.required,
    ownerId: option.required,
};

export const messageSchema: ValidationSchema<Message> = {
    messageId: option.required,
    conversationId: option.required,
    createdAt: option.optional,
    content: option.required,
    senderId: option.required,
    category: option.required,
};

export const userSchema: ValidationSchema<User> = {
    id: option.required,
    username: option.required,
};


export const tipUserSchema: ValidationSchema<TipUserPayload> = {
    userId: option.required,
    goldBar: option.required,
}

export const buyItemSchema: ValidationSchema<BuyItemPayload> = {
    itemId: option.required,
};

export const setOutfitSchema: ValidationSchema<SetOutfitPayload> = {
    outfit: option.required,
};

export const whisperSchema: ValidationSchema<WhisperPayload> = {
    message: option.required,
    whisperTargetId: option.required,
}

export const emoteSchema: ValidationSchema<EmotePayload> = {
    emoteId: option.required,
    targetUserId: option.required
}

export const anchorSchema: ValidationSchema<AnchorHitPayload> = {
    entityId: option.required,
    anchorIx: option.optional
}

export const floorHitSchema: ValidationSchema<FloorHitPayload> = {
    facing: option.optional,
    x: option.required,
    y: option.required,
    z: option.required,
}

export const teleportSchema: ValidationSchema<TeleportPayload> = {
    userId: option.required,
    destination: option.required
}

export const moderationSchema: ValidationSchema<ModerateRoomPayload> = {
    userId: option.required,
    moderationAction: option.required,
    actionLength: option.optional
}

export const getRoomPrivilegeSchema: ValidationSchema<GetRoomPrivilegePayload> = {
    userId: option.required
}

export const changeRoomPrivilegesSchema: ValidationSchema<ChangeRoomPrevilegePayload> = {
    userId: option.required,
    permission: option.required
}