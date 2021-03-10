'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var state = {
    calling: 501,
    inCall: 502,
    endCall: 503
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.calling, '呼叫中'), (0, _defineProperty3.default)(_S, state.inCall, '通话中'), (0, _defineProperty3.default)(_S, state.endCall, '通话已结束'), _S);
    return S[s];
};

module.exports = {
    direction: direction,
    releaseReason: releaseReason,
    decodeReleaseReason: decodeReleaseReason,
    state: state,
    decodeState: decodeState
};