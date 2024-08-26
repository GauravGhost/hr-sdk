"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOutfitSchema = exports.buyItemSchema = exports.tipUserSchema = exports.userSchema = exports.roomPermissionSchema = exports.messageSchema = exports.conversationSchema = exports.currencyItemSchema = exports.anchorPositionSchema = exports.positionSchema = exports.itemSchema = void 0;
exports.validate = validate;
exports.validateEnum = validateEnum;
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
exports.anchorPositionSchema = {
    entityId: option.required,
    anchor_id: option.required,
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
