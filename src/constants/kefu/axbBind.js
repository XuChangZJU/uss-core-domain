const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    binded: 301,
    notBind: 302,
    // expired 过期的
});

const decodeState = (s) => {
    const S = {
        [state.binded]: '已绑定',
        [state.unbind]: '未绑定',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    bind: 1101,
    unbind: 1102,
    // expire
});

const decodeAction = (a) => {
    const A = {
        [action.bind]: '绑定',
        [action.unbind]: '解绑',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.unbind]: [state.binded, state.unbind],
    [action.bind]: [state.unbind, state.binded],
    [action.expire]: [state.binded, state.expired],
};

module.export = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};