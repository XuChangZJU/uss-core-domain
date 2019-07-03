'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/6/30.
 */
var _require = require('../action'),
    state = _require.state,
    decodeState = _require.decodeState,
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var chargeState = {
    init: 1,
    starting: 11,
    inProgress: 21,
    stopping: 31,
    stopped: 41
};

var decodeChargeState = function decodeChargeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, chargeState.init, '初始的'), _defineProperty(_S, chargeState.starting, '正在启动'), _defineProperty(_S, chargeState.inProgress, '充电中'), _defineProperty(_S, chargeState.stopping, '正在结束'), _defineProperty(_S, chargeState.stopped, '已结束'), _S);

    return S[s];
};

var source = {
    server: 1,
    coin: 2
};

var decodeSource = function decodeSource(s) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, source.server, '服务器'), _defineProperty(_S2, source.coin, '投币'), _S2);
    return S[s];
};

var action = Object.assign({}, CommonAction, {
    startCharge: 101,
    stopCharge: 102
});

var decodeAction = function decodeAction(a) {
    var _S3;

    var S = (_S3 = {}, _defineProperty(_S3, action.startCharge, '开始充电'), _defineProperty(_S3, action.stopCharge, '停止充电'), _S3);

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    state: state,
    decodeState: decodeState,
    chargeState: chargeState,
    decodeChargeState: decodeChargeState,
    source: source,
    decodeSource: decodeSource,
    action: action,
    decodeAction: decodeAction
};