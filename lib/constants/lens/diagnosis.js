'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511
};
var category = {
    '配镜': 1,
    '角膜塑形镜': 2,
    '成镜': 3,
    '耗品': 4,
    '视训': 5,
    '配镜复查': 6,
    '角膜塑形镜复查': 7,
    '视训复查': 8
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.成镜, 1), _defineProperty(_C, category.角膜塑形镜, 2), _defineProperty(_C, category.成镜, 3), _defineProperty(_C, category.耗品, 4), _defineProperty(_C, category.视训, 5), _defineProperty(_C, category.配镜复查, 6), _defineProperty(_C, category.角膜塑形镜复查, 7), _defineProperty(_C, category.视训复查, 8), _C);
    return C[c];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.noTrade, '无交易'), _defineProperty(_S, state.hasTrade, '有交易'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    expire: 320
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.expire, '过期');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.expire, [state.noTrade, state.expired]);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};