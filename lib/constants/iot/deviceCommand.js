'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/6/30.
 */
var state = {
    init: 1,
    send: 5,
    success: 10,
    failure: 100,
    givenUp: 101,
    overTime: 102
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.init, '初建'), _defineProperty(_S, state.send, '发送'), _defineProperty(_S, state.success, '成功'), _defineProperty(_S, state.failure, '失败'), _defineProperty(_S, state.givenUp, '放弃'), _defineProperty(_S, state.overTime, '超时'), _S);

    return S[s];
};

var channel = {
    zhzn: 1,
    gsm: 2,
    ble: 3
};

var decodeChannel = function decodeChannel(c) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, channel.zhzn, 'ZHZN'), _defineProperty(_S2, channel.gsm, '2G'), _defineProperty(_S2, channel.ble, '蓝牙'), _S2);
    return S[c];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    channel: channel,
    decodeChannel: decodeChannel
};