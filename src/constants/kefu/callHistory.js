// 通话方向
const direction = {
    AtoB: 0,
    BtoA: 1,
};

const releaseReason = {
    hangup: 0,
    calleeBusy: 1,
    noReply: 2,
    phoneOff: 3,
};

module.exports = {
    direction,
    releaseReason,
};