const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

// 通话方向
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
        [releaseReason.phoneOff]: '用户处于关机、飞行模式、无网络等',
        [releaseReason.others]: '其他',
    };
    return R[r];
};

const state = Object.assign({}, commonState, {
    calling: 501,
    inCall: 502,
    endCall: 503,
});

const decodeState = (s) => {
    const S = {
        [state.calling]: '呼叫中',
        [state.inCall]: '通话中',
        [state.endCall]: '通话已结束',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    answer: 1501,
    disconnect: 1502,
});

const decodeAction = (a) => {
    const A = {
        [action.answer]: '接通',
        [action.disconnect]: '挂机',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.answer]: [state.calling, state.inCall],
    [action.disconnect]: [state.inCall, state.endCall],
};

module.exports = {
    direction,
    releaseReason,
    decodeReleaseReason,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};