const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
} = require('../action');

const action = Object.assign({}, commonAction, {
    sign: 301,
    performance: 302,
});

const decodeAction = (a) => {
    const A = {
        [action.sign]: '签订',
        [action.performance]: '履行',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.sign]: [state.init, state.legal],
    [action.performance]: [state.legal, state.completed],
    [action.abort]: [[state.init, state.legal], state.aborted],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};