const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');


const state = Object.assign({}, commonState, {
    pending: 301,
    solved: 401,
    finished: 501,
});

const decodeState = (s) => {
    const S = {
        [state.pending]: '待处理',
        [state.solved]: '已处理',
        [state.finished]: '已完成'
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    solve: 301,
    resubmit: 401,
    finish: 501,
});

const decodeAction = (a) => {
    const S = {
        [action.solve]: '处理',
        [action.resubmit]: '重新提交',
        [action.finish]: '完成',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.solve]: [state.pending, state.solved],
    [action.resubmit]: [state.solved, state.pending],
    [action.finish]: [state.solved, state.finished],
};
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRAN_MATRIX,
};