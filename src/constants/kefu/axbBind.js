const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    // init
    binded: 301,
    inCall: 302,
    endCall: 303,
    // expired
});

const decodeState = (s) => {
    const S = {
        [state.binded]: '已绑定',
        [state.inCall]: '通话中',
        [state.endCall]: '通话已结束',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    // create
    bind: 1101,
    call: 1102,
    disconnect: 1103,
    // expire
});

const decodeAction = (a) => {
    const A = {
        [action.bind]: '绑定',
        [action.call]: '呼叫',
        [action.disconnect]: '挂机',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.bind]: [state.init, state.binded],
    [action.call]: [state.binded, state.inCall],
    [action.disconnect]: [state.inCall, state.endCall],
    [action.expire]: [state.disconnected, state.expired],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};