'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    available: 401,
    unavailable: 402
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.available, '可用'), _defineProperty(_S, state.unavailable, '不可用'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    bind: 1201,
    unbind: 1202,
    delete: 1203,
    arrear: 1204,
    halt: 1205
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.bind, '绑定'), _defineProperty(_A, action.unbind, '解绑'), _defineProperty(_A, action.delete, '删除'), _defineProperty(_A, action.arrear, '欠费'), _defineProperty(_A, action.halt, '停机'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.bind, [state.available, state.unavailable]), _defineProperty(_STATE_TRANS_MATRIX, action.unbind, [state.unavailable, state.available]), _defineProperty(_STATE_TRANS_MATRIX, action.delete, [state.available, state.unavailable]), _defineProperty(_STATE_TRANS_MATRIX, action.arrear, [state.available, state.unavailable]), _defineProperty(_STATE_TRANS_MATRIX, action.halt, [state.available, state.unavailable]), _STATE_TRANS_MATRIX);

module.export = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};