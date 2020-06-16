'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    stored: 301,
    notStored: 302,
    sold: 401,
    returned: 402
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.stored, '已入库'), _defineProperty(_S, state.notStored, '未入库'), _defineProperty(_S, state.sold, '已售出'), _defineProperty(_S, state.returned, '已退还'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    inStore: 301,
    outStore: 302,
    sell: 401,
    return: 402
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.inStore, '入库'), _defineProperty(_A, action.outStore, '出库'), _defineProperty(_A, action.sell, '售出'), _defineProperty(_A, action.return, '退还'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.inStore, [state.notStored, state.stored]), _defineProperty(_STATE_TRAN_MATRIX, action.outStore, [state.stored, state.notStored]), _defineProperty(_STATE_TRAN_MATRIX, action.sell, [state.stored, state.sold]), _defineProperty(_STATE_TRAN_MATRIX, action.return, [state.stored, state.returned]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};