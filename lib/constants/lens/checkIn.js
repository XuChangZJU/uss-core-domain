'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    start: 1,
    off: 2,
    business: 3
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.start, '上班'), _defineProperty(_C, category.off, '下班'), _defineProperty(_C, category.business, '出差'), _C);
    return C[c];
};
var state = {
    normal: 1,
    add: 2,
    late: 3,
    earlyLeave: 4,
    different: 8,
    business: 16
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.normal, '正常打卡'), _defineProperty(_S, state.add, '补卡'), _defineProperty(_S, state.late, '迟到'), _defineProperty(_S, state.earlyLeave, '早退'), _defineProperty(_S, state.different, '打卡门店与排班门店不同'), _defineProperty(_S, state.business, '出差'), _S);
    return S[s];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState
};