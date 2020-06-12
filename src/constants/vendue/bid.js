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
});

const decodeAction = (a) => {
    const S = {
        [action.cancel]: '撤销'
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
    cancelled: 501
});
const decodeState = (s) => {
    const S = {
        [state.bidding]: '竞拍',
        [state.success]: '成交',
        [state.cancelled]: '撤销',
    };
    return S[s] || decodeCommonState(s);
};
const STATE_TRAN_MATRIX = {
    [action.cancel]: [state.bidding, state.cancelled],
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

