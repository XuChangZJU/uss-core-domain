const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    subscribed: 601,
    unsubscribed: 602,
    // expired
});

const decodeState = (s) => {
    const S = {
        [state.subscribed]: '已订阅',
        [state.unsubscribed]: '未订阅',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    subscribe: 1401,
    unsubscribe: 1402,
    renew: 1403,
    // expire
});

const decodeAction = (a) => {
    const A = {
        [action.subscribe]: '订阅',
        [action.unsubscribe]: '退订',
        [action.renew]: '续费',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.subscribe]: [state.unsubscribed, state.subscribed],
    [action.unsubscribe]: [state.subscribed, state.unsubscribed],
    [action.expire]: [state.subscribed, state.expired],
    [action.renew]: [state.expired, state.subscribed],
};

module.export = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};