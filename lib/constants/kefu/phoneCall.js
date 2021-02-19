'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var R = (_R = {}, (0, _defineProperty3.default)(_R, releaseReason.hangup, '正常挂断'), (0, _defineProperty3.default)(_R, releaseReason.calleeBusy, '用户忙'), (0, _defineProperty3.default)(_R, releaseReason.noReply, '用户未响应'), (0, _defineProperty3.default)(_R, releaseReason.calleeDisconnect, '用户振铃时挂断'), (0, _defineProperty3.default)(_R, releaseReason.phoneOff, '用户处于关机、停机、飞行模式、无网络等'), (0, _defineProperty3.default)(_R, releaseReason.others, '其他'), _R);
    return R[r];
};

var state = (0, _assign2.default)({}, commonState, {
    calling: 501,
    inCall: 502,
    endCall: 503
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.calling, '呼叫中'), (0, _defineProperty3.default)(_S, state.inCall, '通话中'), (0, _defineProperty3.default)(_S, state.endCall, '通话已结束'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    answer: 1501,
    disconnect: 1502
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.answer, '接通'), (0, _defineProperty3.default)(_A, action.disconnect, '挂机'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.answer, [state.calling, state.inCall]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.disconnect, [state.inCall, state.endCall]), _STATE_TRANS_MATRIX);

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