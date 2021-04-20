const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');
const action = Object.assign({}, commonAction, {
    rollbackMakeFailure: 301,
    success: 401,
    confirm: 402,
    violate: 1001,
    makeFailure: 2001,
});

const decodeAction = (a) => {
    const S = {
        [action.rollbackMakeFailure]: '回退使失败',
        [action.success]: '成交',
        [action.confirm]: '确认',
        [action.violate]: '违约',
        [action.makeFailure]: '失败',
    };

    return S[a] || decodeCommonAction(a);
};
const category = Object.assign({}, {
    bid: 1,
    count: 2,
});

const STRINGS_OF_ORIGINS = {
    [category.bid]: "出价",
    [category.count]: "落槌倒计时",
};

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
const state = Object.assign({}, commonState, {
    bidding: 301,
    success: 401,
    confirmed: 402,
    violated: 1001,
    failure: 2001,
});
const decodeState = (s) => {
    const S = {
        [state.bidding]: '竞拍',
        [state.success]: '成交',
        [state.confirmed]: '已核对',
        [state.violated]: '已违约',
        [state.failure]: '已失败',
    };
    return S[s] || decodeCommonState(s);
};
const STATE_TRAN_MATRIX = {
    [action.rollbackMakeFailure]: [state.failure, state.bidding],
    [action.success]: [state.bidding, state.success],
    [action.confirm]: [state.success, state.confirmed],
    [action.violate]: [[state.success, state.confirmed], state.violated],
    [action.makeFailure]: [state.bidding, state.failure],
};


module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    category,
    decodeCategory,
    STATE_TRAN_MATRIX
};
