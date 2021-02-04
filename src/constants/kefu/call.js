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
    hangup: 0,          // 挂断
    calleeBusy: 1,      // 用户忙
    noReply: 2,         // 用户未接听
    phoneOff: 3,        // 用户关机（不在服务器，欠费...）
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
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};