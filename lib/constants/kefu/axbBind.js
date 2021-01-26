'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    binded: 301,
    notBind: 302
    // expired 过期的
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.binded, '已绑定'), _defineProperty(_S, state.unbind, '未绑定'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    bind: 1101,
    unbind: 1102
    // expire
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.bind, '绑定'), _defineProperty(_A, action.unbind, '解绑'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.unbind, [state.binded, state.unbind]), _defineProperty(_STATE_TRANS_MATRIX, action.bind, [state.unbind, state.binded]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.binded, state.expired]), _STATE_TRANS_MATRIX);

module.export = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};