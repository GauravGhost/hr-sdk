import { PayloadError } from "./error";
var option;
(function (option) {
    option["required"] = "required";
    option["optional"] = "optional";
})(option || (option = {}));
export function validate(data, schema) {
    for (const key in schema) {
        if (schema[key] === 'required') {
            if (data[key] === undefined || data[key] === null) {
                return `Missing ${key} property`;
            }
            if (typeof data[key] === 'object' && data[key] !== null) {
                const nestedSchema = schema[key];
                const nestedError = validate(data[key], nestedSchema);
                if (nestedError) {
                    return nestedError;
                }
            }
        }
    }
    return null;
}
export function validateEnum(value, enumType) {
    if (!Object.values(enumType).includes(value)) {
        return `Invalid value: ${value}`;
    }
    return null;
}
export const validateAndThrow = (validationResult) => {
    if (validationResult) {
        throw new PayloadError(validationResult);
    }
};
/**
 * =================== Schema Definition =================
 */
export const itemSchema = {
    type: option.required,
    amount: option.required,
    id: option.required,
    accountBound: option.required,
    activePalette: option.optional, // Assuming activePalette can be optional
};
export const positionSchema = {
    x: option.required,
    y: option.required,
    z: option.required,
    facing: option.required,
};
export const currencyItemSchema = {
    type: option.required,
    amount: option.required,
};
export const roomPermissionSchema = {
    designer: option.optional,
    moderator: option.optional,
};
export const conversationSchema = {
    id: option.required,
    didJoin: option.required,
    unreadCount: option.required,
    muted: option.required,
    memberIds: option.required,
    name: option.required,
    ownerId: option.required,
};
export const messageSchema = {
    messageId: option.required,
    conversationId: option.required,
    createdAt: option.optional,
    content: option.required,
    senderId: option.required,
    category: option.required,
};
export const userSchema = {
    id: option.required,
    username: option.required,
};
export const tipUserSchema = {
    userId: option.required,
    goldBar: option.required,
};
export const buyItemSchema = {
    itemId: option.required,
};
export const setOutfitSchema = {
    outfit: option.required,
};
export const whisperSchema = {
    message: option.required,
    whisperTargetId: option.required,
};
export const emoteSchema = {
    emoteId: option.required,
    targetUserId: option.required
};
export const anchorSchema = {
    entityId: option.required,
    anchorIx: option.optional
};
export const floorHitSchema = {
    facing: option.optional,
    x: option.required,
    y: option.required,
    z: option.required,
};
export const teleportSchema = {
    userId: option.required,
    destination: option.required
};
export const moderationSchema = {
    userId: option.required,
    moderationAction: option.required,
    actionLength: option.optional
};
export const getRoomPrivilegeSchema = {
    userId: option.required
};
export const changeRoomPrivilegesSchema = {
    userId: option.required,
    permission: option.required
};
export const moveUserToRoomSchema = {
    roomId: option.required,
    userId: option.required
};
export const inviteSpeakerSchema = {
    userId: option.required
};
export const removeSpeakerSchema = {
    userId: option.required
};
export const getOutfitSchema = {
    userId: option.required
};
export const getConversationSchema = {
    lastId: option.optional,
    notJoined: option.optional
};
export const sendMessageSchema = {
    content: option.required,
    conversationId: option.required,
    roomId: option.optional,
    type: option.required,
    worldId: option.optional
};
export const sendBulkMessageSchema = {
    content: option.required,
    userIds: option.required,
    roomId: option.optional,
    type: option.required,
    worldId: option.optional
};
export const getMessageSchema = {
    conversationId: option.required,
    lastMessageId: option.optional
};
export const leaveConverationSchema = {
    conversationId: option.required,
};
export const buyVoiceTimeSchema = {
    paymentMethod: option.required
};
export const buyRoomBoostSchema = {
    amount: option.optional,
    paymentMethod: option.required
};
export const channelSchema = {
    message: option.required,
    onlyTo: option.optional,
    tags: option.required
};
