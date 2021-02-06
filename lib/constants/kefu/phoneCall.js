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
    hangup: 0,
    calleeBusy: 1,
    noReply: 2,
    calleeDisconnect: 3,
    phoneOff: 4,
    others: 5
};

var decodeReleaseReason = function decodeReleaseReason(r) {
    var _R;

    var R = (_R = {}, _defineProperty(_R, releaseReason.hangup, '正常挂断'), _defineProperty(_R, releaseReason.calleeBusy, '用户忙'), _defineProperty(_R, releaseReason.noReply, '用户未响应'), _defineProperty(_R, releaseReason.calleeDisconnect, '用户振铃时挂断'), _defineProperty(_R, releaseReason.phoneOff, '用户处于关机、飞行模式、无网络等'), _defineProperty(_R, releaseReason.others, '其他'), _R);
    return R[r];
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
    decodeReleaseReason: decodeReleaseReason,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};