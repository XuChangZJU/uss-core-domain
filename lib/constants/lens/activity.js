'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var _require2 = require('./trade'),
    category = _require2.category,
    decodeCategory = _require2.decodeCategory;

var state = {
    ongoing: 301,
    finished: 401,
    cancelled: 501
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.ongoing, '进行中'), _defineProperty(_S, state.finished, '已结束'), _defineProperty(_S, state.cancelled, '已取消'), _S);
    return S[s];
};
var action = Object.assign({}, commonAction, {
    cancel: 301,
    restart: 401
});

var decodeAction = function decodeAction(a) {
    var A = _defineProperty({}, action.restart, '重新开始');

    return A[a] || decodeCommonAction(a);
};
var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.cancel, [state.ongoing, state.cancelled]), _defineProperty(_STATE_TRANS_MATRIX, action.restart, [state.cancelled, state.ongoing]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    category: category,
    decodeCategory: decodeCategory,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};