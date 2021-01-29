'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var type = {
    in: 1,
    out: 2,
    none: 3
};

var decodeType = function decodeType(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, type.in, '内部跳转'), _defineProperty(_C, type.out, '外部跳转'), _defineProperty(_C, type.none, '无'), _C);
    return C[c];
};

var category = {
    'online': 1,
    'venue': 2,
    'vendueDetail': 3,
    'session': 4,
    'sessionDetail': 5,
    'auction': 6,
    'auctionDetail': 7
};

var decodeCategory = function decodeCategory(c) {
    var _C2;

    var C = (_C2 = {}, _defineProperty(_C2, category.online, '在线拍'), _defineProperty(_C2, category.venue, '拍卖会'), _defineProperty(_C2, category.vendueDetail, '拍卖会详情'), _defineProperty(_C2, category.session, '专场列表'), _defineProperty(_C2, category.sessionDetail, '专场详情'), _defineProperty(_C2, category.auction, '拍品列表'), _defineProperty(_C2, category.auctionDetail, '拍品详情'), _C2);
    return C[c];
};
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    type: type,
    decodeType: decodeType
};