const {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');
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
    succeed: 401,
});
const decodeState = (s) => {
    const S = {
        bidding: '竞拍',
        succeed: '成交',
    };
    return S[s] || decodeCommonState(s);
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
};

