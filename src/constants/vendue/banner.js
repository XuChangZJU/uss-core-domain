const {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
} = require('../action');

const type = {
    in: 1,
    out: 2,
    none: 3,
}

const decodeType = (c) => {
    const C = {
        [type.in]: '内部跳转',
        [type.out]: '外部跳转',
        [type.none]: '无',
    };
    return C[c];
}

const category = {
    'online': 1,
    'venue': 2,
    'vendueDetail': 3,
    'session': 4,
    'sessionDetail': 5,
    'auction': 6,
    'auctionDetail': 7,
}

const decodeCategory = (c) => {
    const C = {
        [category.online]: '在线拍',
        [category.venue]: '拍卖会',
        [category.vendueDetail]: '拍卖会详情',
        [category.session]: '专场列表',
        [category.sessionDetail]: '专场详情',
        [category.auction]: '拍品列表',
        [category.auctionDetail]: '拍品详情',
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
    type,
    decodeType,
};

