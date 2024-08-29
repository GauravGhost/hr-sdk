export var EmitEvent;
(function (EmitEvent) {
    EmitEvent["Ready"] = "Ready";
    EmitEvent["PlayerJoin"] = "PlayerJoin";
    EmitEvent["PlayerLeft"] = "PlayerLeft";
    EmitEvent["Chat"] = "Chat";
    EmitEvent["PlayerMovement"] = "PlayerMovement";
    EmitEvent["PlayerSit"] = "PlayerSit";
    EmitEvent["Error"] = "Error";
})(EmitEvent || (EmitEvent = {}));
export var Reaction;
(function (Reaction) {
    Reaction["clap"] = "clap";
    Reaction["heart"] = "heart";
    Reaction["thumbs"] = "thumbs";
    Reaction["wave"] = "wave";
    Reaction["wink"] = "wink";
})(Reaction || (Reaction = {}));
export var Facing;
(function (Facing) {
    Facing["FrontRight"] = "FrontRight";
    Facing["FrontLeft"] = "FrontLeft";
    Facing["BackRight"] = "BackRight";
    Facing["BackLeft"] = "BackLeft";
})(Facing || (Facing = {}));
export var ModerationAction;
(function (ModerationAction) {
    ModerationAction["kick"] = "kick";
    ModerationAction["ban"] = "ban";
    ModerationAction["unban"] = "unban";
    ModerationAction["mute"] = "mute";
    ModerationAction["unmute"] = "unmute";
})(ModerationAction || (ModerationAction = {}));
export var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["bot_wallet_only"] = "bot_wallet_only";
})(PaymentMethod || (PaymentMethod = {}));
export var GoldBars;
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
})(GoldBars || (GoldBars = {}));
;
export var WalletType;
(function (WalletType) {
    WalletType["gold"] = "gold";
    WalletType["roomBoostTokens"] = "room_boost_tokens";
    WalletType["roomVoiceTokens"] = "room_voice_tokens";
})(WalletType || (WalletType = {}));
export var PaymentResult;
(function (PaymentResult) {
    PaymentResult["success"] = "success";
    PaymentResult["insufficientFunds"] = "insufficient_funds";
    PaymentResult["onlyTokenBought"] = "only_token_bought";
})(PaymentResult || (PaymentResult = {}));
export var MessageType;
(function (MessageType) {
    MessageType["text"] = "text";
    MessageType["invite"] = "invite";
})(MessageType || (MessageType = {}));
