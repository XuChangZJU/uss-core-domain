const direction = {
    AtoB: 0,
    BtoA: 1,
};

const releaseReason = {
    hangup: 0,
    calleeBusy: 1,
    noReply: 2,
    calleeDisconnect: 3,
    phoneOff: 4,
    others: 5,
};

const decodeReleaseReason = (r) => {
    const R = {
        [releaseReason.hangup]: '正常挂断',
        [releaseReason.calleeBusy]: '用户忙',
        [releaseReason.noReply]: '用户未响应',
        [releaseReason.calleeDisconnect]: '用户振铃时挂断',
        [releaseReason.phoneOff]: '用户处于关机、停机、飞行模式、无网络等',
        [releaseReason.others]: '其他',
    };
    return R[r];
};

const state = {
    calling: 501,
    inCall: 502,
    endCall: 503,
};

const decodeState = (s) => {
    const S = {
        [state.calling]: '呼叫中',
        [state.inCall]: '通话中',
        [state.endCall]: '通话已结束',
    };
    return S[s];
};



module.exports = {
    direction,
    releaseReason,
    decodeReleaseReason,
    state,
    decodeState,
};