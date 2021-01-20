'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var category = {
    'auctionList': 1,
    'auctionDetail': 2,
    'vendueList': 3,
    'vendueDetail': 4,
    'sessionList': 5,
    'sessionDetail': 6
};

var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.auctionList, '拍品列表'), _defineProperty(_C, category.auctionDetail, '拍品详情'), _defineProperty(_C, category.vendueList, '拍卖会列表'), _defineProperty(_C, category.vendueDetail, '拍卖会详情'), _defineProperty(_C, category.sessionList, '专场列表'), _defineProperty(_C, category.sessionDetail, '专场详情'), _C);
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
    decodeCategory: decodeCategory
};