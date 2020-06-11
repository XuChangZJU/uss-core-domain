'use strict';

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var action = Object.assign({}, commonAction, {
    cancel: 621
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.cancel, '撤销');

    return S[a] || decodeCommonAction(a);
};
var category = Object.assign({}, {
    bid: 1,
    count: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, category.bid, "出价"), _defineProperty(_STRINGS_OF_ORIGINS, category.count, "落槌倒计时"), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
var state = Object.assign({}, commonState, {
    bidding: 301,
    success: 401,
    cancelled: 501
});
var decodeState = function decodeState(s) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, state.bidding, '竞拍'), _defineProperty(_S2, state.success, '成交'), _defineProperty(_S2, state.cancelled, '撤销'), _S2);
    return S[s] || decodeCommonState(s);
};
var STATE_TRAN_MATRIX = _defineProperty({}, action.cancel, [state.bidding, state.cancelled]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};