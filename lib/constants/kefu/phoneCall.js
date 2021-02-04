'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

// 通话方向


var direction = {
    AtoB: 0,
    BtoA: 1
};

var releaseReason = {
    hangup: 0, // 挂断
    calleeBusy: 1, // 用户忙
    noReply: 2, // 用户未接听
    phoneOff: 3 // 用户关机（不在服务器，欠费...）
};

var state = Object.assign({}, commonState, {
    calling: 501,
    inCall: 502,
    endCall: 503
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.calling, '呼叫中'), _defineProperty(_S, state.inCall, '通话中'), _defineProperty(_S, state.endCall, '通话已结束'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    answer: 1501,
    disconnect: 1502
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.answer, '接通'), _defineProperty(_A, action.disconnect, '挂机'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.answer, [state.calling, state.inCall]), _defineProperty(_STATE_TRANS_MATRIX, action.disconnect, [state.inCall, state.endCall]), _STATE_TRANS_MATRIX);

module.exports = {
    direction: direction,
    releaseReason: releaseReason,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};