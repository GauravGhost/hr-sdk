"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationAction = exports.Facing = exports.Reaction = void 0;
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
