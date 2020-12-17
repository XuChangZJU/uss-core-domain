const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');
const action = Object.assign({}, commonAction, {
    cancel: 621,
    success: 701,
    cancelBidding: 801,
    cancelSuccess: 901,
});

const decodeAction = (a) => {
    const S = {
        [action.cancel]: '撤销',
        [action.success]: '成交',
        [action.cancelBidding]: '撤销出价',
        [action.cancelSuccess]: '撤销成交',
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
    cancelledBidding: 601,
    cancelledSuccess: 701,
});
const decodeState = (s) => {
    const S = {
        [state.bidding]: '竞拍',
        [state.success]: '成交',
        [state.cancelledSuccess]: '已撤销成交',
        [state.cancelledBidding]: '已撤销出价',
    };
    return S[s] || decodeCommonState(s);
};
const STATE_TRAN_MATRIX = {
    [action.cancel]: [state.bidding, state.cancelledBidding],
    [action.cancelBidding]: [state.bidding, state.cancelledBidding],
    [action.cancelSuccess]: [state.success, state.cancelledSuccess],
    [action.success]: [state.bidding, state.success],
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

