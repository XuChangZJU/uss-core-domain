const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    unsettled: 301,
    // 以及commonState中的
    // legal 生效的
    // aborted 中止的
    // complete 完成的
});

const decodeState = (s) => {
    const S = {
        [state.unsettled]: '待结算',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    auctionSuccess: 301,
    settle: 401
    // 以及commonAction中的
    // abort 中止
});

const decodeAction = (a) => {
    const A = {
        [action.auctionSuccess]: '拍卖成功',
        [action.settle]: '结算完成',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.auctionSuccess]: [state.legal, state.unsettled],
    [action.settle]: [state.unsettled, state.completed],
    [action.abort]: [[state.legal, state.unsettled], state.aborted],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};