"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelSchema = exports.buyRoomBoostSchema = exports.buyVoiceTimeSchema = exports.leaveConverationSchema = exports.getMessageSchema = exports.sendBulkMessageSchema = exports.sendMessageSchema = exports.getConversationSchema = exports.getOutfitSchema = exports.removeSpeakerSchema = exports.inviteSpeakerSchema = exports.moveUserToRoomSchema = exports.changeRoomPrivilegesSchema = exports.getRoomPrivilegeSchema = exports.moderationSchema = exports.teleportSchema = exports.floorHitSchema = exports.anchorSchema = exports.emoteSchema = exports.whisperSchema = exports.setOutfitSchema = exports.buyItemSchema = exports.tipUserSchema = exports.userSchema = exports.messageSchema = exports.conversationSchema = exports.roomPermissionSchema = exports.currencyItemSchema = exports.positionSchema = exports.itemSchema = exports.validateAndThrow = void 0;
exports.validate = validate;
exports.validateEnum = validateEnum;
const error_1 = require("./error");
var option;
(function (option) {
    option["required"] = "required";
    option["optional"] = "optional";
})(option || (option = {}));
function validate(data, schema) {
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
function validateEnum(value, enumType) {
    if (!Object.values(enumType).includes(value)) {
        return `Invalid value: ${value}`;
    }
    return null;
}
const validateAndThrow = (validationResult) => {
    if (validationResult) {
        throw new error_1.PayloadError(validationResult);
    }
};
exports.validateAndThrow = validateAndThrow;
/**
 * =================== Schema Definition =================
 */
exports.itemSchema = {
    type: option.required,
    amount: option.required,
    id: option.required,
    accountBound: option.required,
    activePalette: option.optional, // Assuming activePalette can be optional
};
exports.positionSchema = {
    x: option.required,
    y: option.required,
    z: option.required,
    facing: option.required,
};
exports.currencyItemSchema = {
    type: option.required,
    amount: option.required,
};
exports.roomPermissionSchema = {
    designer: option.optional,
    moderator: option.optional,
};
exports.conversationSchema = {
    id: option.required,
    didJoin: option.required,
    unreadCount: option.required,
    muted: option.required,
    memberIds: option.required,
    name: option.required,
    ownerId: option.required,
};
exports.messageSchema = {
    messageId: option.required,
    conversationId: option.required,
    createdAt: option.optional,
    content: option.required,
    senderId: option.required,
    category: option.required,
};
exports.userSchema = {
    id: option.required,
    username: option.required,
};
exports.tipUserSchema = {
    userId: option.required,
    goldBar: option.required,
};
exports.buyItemSchema = {
    itemId: option.required,
};
exports.setOutfitSchema = {
    outfit: option.required,
};
exports.whisperSchema = {
    message: option.required,
    whisperTargetId: option.required,
};
exports.emoteSchema = {
    emoteId: option.required,
    targetUserId: option.required
};
exports.anchorSchema = {
    entityId: option.required,
    anchorIx: option.optional
};
exports.floorHitSchema = {
    facing: option.optional,
    x: option.required,
    y: option.required,
    z: option.required,
};
exports.teleportSchema = {
    userId: option.required,
    destination: option.required
};
exports.moderationSchema = {
    userId: option.required,
    moderationAction: option.required,
    actionLength: option.optional
};
exports.getRoomPrivilegeSchema = {
    userId: option.required
};
exports.changeRoomPrivilegesSchema = {
    userId: option.required,
    permission: option.required
};
exports.moveUserToRoomSchema = {
    roomId: option.required,
    userId: option.required
};
exports.inviteSpeakerSchema = {
    userId: option.required
};
exports.removeSpeakerSchema = {
    userId: option.required
};
exports.getOutfitSchema = {
    userId: option.required
};
exports.getConversationSchema = {
    lastId: option.optional,
    notJoined: option.optional
};
exports.sendMessageSchema = {
    content: option.required,
    conversationId: option.required,
    roomId: option.optional,
    type: option.required,
    worldId: option.optional
};
exports.sendBulkMessageSchema = {
    content: option.required,
    userIds: option.required,
    roomId: option.optional,
    type: option.required,
    worldId: option.optional
};
exports.getMessageSchema = {
    conversationId: option.required,
    lastMessageId: option.optional
};
exports.leaveConverationSchema = {
    conversationId: option.required,
};
exports.buyVoiceTimeSchema = {
    paymentMethod: option.required
};
exports.buyRoomBoostSchema = {
    amount: option.optional,
    paymentMethod: option.required
};
exports.channelSchema = {
    message: option.required,
    onlyTo: option.optional,
    tags: option.required
};
