"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomPrivilegeSchema = exports.moderationSchema = exports.teleportSchema = exports.floorHitSchema = exports.anchorSchema = exports.emoteSchema = exports.whisperSchema = exports.setOutfitSchema = exports.buyItemSchema = exports.tipUserSchema = exports.userSchema = exports.roomPermissionSchema = exports.messageSchema = exports.conversationSchema = exports.currencyItemSchema = exports.positionSchema = exports.itemSchema = exports.validateAndThrow = void 0;
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
exports.roomPermissionSchema = {
    moderator: option.optional,
    designer: option.optional,
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
