const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');
const action = Object.assign({}, commonAction, {
    success: 701,
    confirm: 702,
    violate: 703,
});

const decodeAction = (a) => {
    const S = {
        [action.success]: '成交',
        [action.confirm]: '确认',
        [action.violate]: '违约',
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
    confirmed: 702,
    violated: 1001,
});
const decodeState = (s) => {
    const S = {
        [state.bidding]: '竞拍',
        [state.success]: '成交',
        [state.confirmed]: '已核对',
        [state.violated]: '已违约',
    };
    return S[s] || decodeCommonState(s);
};
const STATE_TRAN_MATRIX = {
    [action.success]: [state.bidding, state.success],
    [action.confirm]: [state.success, state.confirmed],
    [action.violate]: [[state.success, state.confirmed], state.violated],
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

