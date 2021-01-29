const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    available: 401,
    unavailable: 402,
});

const decodeState = (s) => {
    const S = {
        [state.available]: '可用',
        [state.unavailable]: '不可用',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    bind: 1201,
    unbind: 1202,
    delete: 1203,
    arrear: 1204,
    halt: 1205,
});

const decodeAction = (a) => {
    const A = {
        [action.bind]: '绑定',
        [action.unbind]: '解绑',
        [action.arrear]: '欠费',
        [action.halt]: '停机',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.bind]: [state.available, state.unavailable],
    [action.unbind]: [state.unavailable, state.available],
    [action.arrear]: [state.available, state.unavailable],
    [action.halt]: [state.available, state.unavailable],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};