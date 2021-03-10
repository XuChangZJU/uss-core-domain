const {
    action,
    decodeAction,
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

const STATE_TRANS_MATRIX = {
    [action.expire]: [state.available, state.unavailable],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};