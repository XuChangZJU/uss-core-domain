const {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
} = require('../action');

const category = {
    'auctionList': 1,
    'auctionDetail': 2,
    'vendueList': 3,
    'vendueDetail': 4,
    'sessionList': 5,
    'sessionDetail': 6,
}

const decodeCategory = (c) => {
    const C = {
        [category.auctionList]: '拍品列表',
        [category.auctionDetail]: '拍品详情',
        [category.vendueList]: '拍卖会列表',
        [category.vendueDetail]: '拍卖会详情',
        [category.sessionList]: '专场列表',
        [category.sessionDetail]: '专场详情',
    };
    return C[c];
}
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

