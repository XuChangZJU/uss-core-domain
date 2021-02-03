const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const origin = {
    huaweiCloud: 1,
    aliCloud: 2,
};

const state = Object.assign({}, commonState, {
    binded: 301,
    inCall: 302,
    endCall: 303,
    unbinded: 304
    // expired
});

const decodeState = (s) => {
    const S = {
        [state.binded]: '已绑定',
        [state.inCall]: '通话中',
        [state.endCall]: '通话已结束',
        [state.unbinded]: '已解绑',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    // create
    // bind: 1101,
    call: 1102,
    disconnect: 1103,
    unbind: 1104,
    // expire
});

const decodeAction = (a) => {
    const A = {
        // [action.bind]: '绑定',
        [action.call]: '呼叫',
        [action.disconnect]: '挂机',
        [action.unbind]: '解绑'
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    // [action.bind]: [state.init, state.binded],
    [action.call]: [state.binded, state.inCall],
    [action.disconnect]: [state.inCall, state.endCall],
    [action.expire]: [state.disconnected, state.expired],
    [action.unbind]: [[state.binded, state.inCall, state.disconnected, state.expired], state.unbinded],
};

module.exports = {
    origin,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};