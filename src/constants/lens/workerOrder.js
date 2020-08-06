const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');
const type =  {
    refund: 1,
    exchange: 2,
    fix: 3,
};

const decodeType = (t) => {
    const T = {
        [type.refund]: '退货',
        [type.exchange]: '换货',
        [type.fix]: '修理'
    };

    return T[t];
};
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
    type,
    decodeType,
    STATE_TRAN_MATRIX,
};