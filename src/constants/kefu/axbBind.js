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
    unbinded: 302,
    // expired
});

const decodeState = (s) => {
    const S = {
        [state.binded]: '已绑定',
        [state.unbinded]: '已解绑',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    // create
    // bind: 1101,
    unbind: 1102,
    // expire
});

const decodeAction = (a) => {
    const A = {
        // [action.bind]: '绑定',
        [action.unbind]: '解绑'
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    // [action.bind]: [state.init, state.binded],
    [action.expire]: [state.binded, state.expired],
    [action.unbind]: [[state.binded, state.expired], state.unbinded],
};

module.exports = {
    origin,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};