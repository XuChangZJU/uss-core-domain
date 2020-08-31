const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
    relation,
    decodeRelation,
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
    accepted: 401,
    refused: 410,
    finished: 501,
});

const decodeState = (s) => {
    const S = {
        [state.pending]: '待处理',
        [state.accepted]: '已同意',
        [state.refused]: '已拒绝',
        [state.finished]: '已完成'
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    accept: 301,
    refuse: 310,
    resubmit: 401,
    // finish: 501,
});

const decodeAction = (a) => {
    const S = {
        [action.accept]: '同意',
        [action.refuse]: '拒绝',
        [action.resubmit]: '重新提交',
        // [action.finish]: '完成',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.accept]: [state.pending, state.accepted],
    [action.refuse]: [state.pending, state.refused],
    [action.resubmit]: [state.refused, state.pending],
    // [action.finish]: [[state.accepted, state.refused], state.finished],
};
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    type,
    decodeType,
    STATE_TRAN_MATRIX,
};