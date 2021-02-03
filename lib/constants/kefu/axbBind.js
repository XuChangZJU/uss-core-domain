'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var origin = {
    huaweiCloud: 1,
    aliCloud: 2
};

var state = Object.assign({}, commonState, {
    // init
    binded: 301,
    inCall: 302,
    endCall: 303
    // expired
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.binded, '已绑定'), _defineProperty(_S, state.inCall, '通话中'), _defineProperty(_S, state.endCall, '通话已结束'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    // create
    bind: 1101,
    call: 1102,
    disconnect: 1103
    // expire
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.bind, '绑定'), _defineProperty(_A, action.call, '呼叫'), _defineProperty(_A, action.disconnect, '挂机'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.bind, [state.init, state.binded]), _defineProperty(_STATE_TRANS_MATRIX, action.call, [state.binded, state.inCall]), _defineProperty(_STATE_TRANS_MATRIX, action.disconnect, [state.inCall, state.endCall]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.disconnected, state.expired]), _STATE_TRANS_MATRIX);

module.exports = {
    origin: origin,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};