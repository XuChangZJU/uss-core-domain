"use strict";

// 通话方向
var direction = {
    AtoB: 0,
    BtoA: 1
};

var releaseReason = {
    hangup: 0,
    calleeBusy: 1,
    noReply: 2,
    phoneOff: 3
};

module.exports = {
    direction: direction,
    releaseReason: releaseReason
};