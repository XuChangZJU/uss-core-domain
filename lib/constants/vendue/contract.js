'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    unsettled: 301
    // 以及commonState中的
    // legal 生效的
    // aborted 中止的
    // complete 完成的
});

var decodeState = function decodeState(s) {
    var S = _defineProperty({}, state.unsettled, '待结算');
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    auctionSuccess: 301,
    settle: 401
    // 以及commonAction中的
    // abort 中止
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.auctionSuccess, '拍卖成功'), _defineProperty(_A, action.settle, '结算完成'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.auctionSuccess, [state.legal, state.unsettled]), _defineProperty(_STATE_TRAN_MATRIX, action.settle, [state.unsettled, state.completed]), _defineProperty(_STATE_TRAN_MATRIX, action.abort, [[state.legal, state.unsettled], state.aborted]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};