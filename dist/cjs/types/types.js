"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.PaymentResult = exports.WalletType = exports.GoldBars = exports.PaymentMethod = exports.ModerationAction = exports.Facing = exports.Reaction = exports.EmitEvent = void 0;
var EmitEvent;
(function (EmitEvent) {
    EmitEvent["Ready"] = "Ready";
    EmitEvent["PlayerJoin"] = "PlayerJoin";
    EmitEvent["PlayerLeft"] = "PlayerLeft";
    EmitEvent["Chat"] = "Chat";
    EmitEvent["PlayerMovement"] = "PlayerMovement";
    EmitEvent["PlayerSit"] = "PlayerSit";
    EmitEvent["Error"] = "Error";
})(EmitEvent || (exports.EmitEvent = EmitEvent = {}));
var Reaction;
(function (Reaction) {
    Reaction["clap"] = "clap";
    Reaction["heart"] = "heart";
    Reaction["thumbs"] = "thumbs";
    Reaction["wave"] = "wave";
    Reaction["wink"] = "wink";
})(Reaction || (exports.Reaction = Reaction = {}));
var Facing;
(function (Facing) {
    Facing["FrontRight"] = "FrontRight";
    Facing["FrontLeft"] = "FrontLeft";
    Facing["BackRight"] = "BackRight";
    Facing["BackLeft"] = "BackLeft";
})(Facing || (exports.Facing = Facing = {}));
var ModerationAction;
(function (ModerationAction) {
    ModerationAction["kick"] = "kick";
    ModerationAction["ban"] = "ban";
    ModerationAction["unban"] = "unban";
    ModerationAction["mute"] = "mute";
    ModerationAction["unmute"] = "unmute";
})(ModerationAction || (exports.ModerationAction = ModerationAction = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["bot_wallet_only"] = "bot_wallet_only";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var GoldBars;
(function (GoldBars) {
    GoldBars["goldBar1"] = "gold_bar_1";
    GoldBars["goldBar5"] = "gold_bar_5";
    GoldBars["goldBar10"] = "gold_bar_10";
    GoldBars["goldBar50"] = "gold_bar_50";
    GoldBars["goldBar100"] = "gold_bar_100";
    GoldBars["goldBar500"] = "gold_bar_500";
    GoldBars["goldBar1k"] = "gold_bar_1k";
    GoldBars["goldBar5000"] = "gold_bar_5000";
    GoldBars["goldBar10k"] = "gold_bar_10k";
})(GoldBars || (exports.GoldBars = GoldBars = {}));
;
var WalletType;
(function (WalletType) {
    WalletType["gold"] = "gold";
    WalletType["roomBoostTokens"] = "room_boost_tokens";
    WalletType["roomVoiceTokens"] = "room_voice_tokens";
})(WalletType || (exports.WalletType = WalletType = {}));
var PaymentResult;
(function (PaymentResult) {
    PaymentResult["success"] = "success";
    PaymentResult["insufficientFunds"] = "insufficient_funds";
    PaymentResult["onlyTokenBought"] = "only_token_bought";
})(PaymentResult || (exports.PaymentResult = PaymentResult = {}));
var MessageType;
(function (MessageType) {
    MessageType["text"] = "text";
    MessageType["invite"] = "invite";
})(MessageType || (exports.MessageType = MessageType = {}));
