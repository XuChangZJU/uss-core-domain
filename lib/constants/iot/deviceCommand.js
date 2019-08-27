'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/6/30.
 */
var state = {
    init: 1,
    sent: 5,
    success: 10,
    checking: 50,
    failure: 100,
    givenUp: 101,
    overTime: 102
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.init, '初建'), _defineProperty(_S, state.sent, '发送'), _defineProperty(_S, state.success, '成功'), _defineProperty(_S, state.checking, '复查'), _defineProperty(_S, state.failure, '失败'), _defineProperty(_S, state.givenUp, '放弃'), _defineProperty(_S, state.overTime, '超时'), _S);

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

var command = {
    work: 1,
    stopWork: 2,
    getSpec: 11,
    initialize: 12,

    checkResult: 100
};

var decodeCommand = function decodeCommand(c) {
    var _S3;

    var S = (_S3 = {}, _defineProperty(_S3, command.work, '工作'), _defineProperty(_S3, command.stopWork, '取消工作'), _defineProperty(_S3, command.getSpec, '获取规格'), _defineProperty(_S3, command.initialize, '初始化'), _defineProperty(_S3, command.checkResult, '查询结果'), _S3);

    return S[c];
};

var event = {
    workSuccess: 1,
    workFailure: 2,

    stopSuccess: 11,
    stopFailure: 12,

    querySuccess: 101,

    deviceConnected: 201,
    deviceDisconnected: 202
};

var decodeEvent = function decodeEvent(e) {
    var _S4;

    var S = (_S4 = {}, _defineProperty(_S4, event.workSuccess, '工作成功'), _defineProperty(_S4, event.workFailure, '工作失败'), _defineProperty(_S4, event.stopSuccess, '停止成功'), _defineProperty(_S4, event.stopFailure, '停止失败'), _defineProperty(_S4, event.querySuccess, '查询成功'), _defineProperty(_S4, event.deviceConnected, '重新连接'), _defineProperty(_S4, event.deviceDisconnected, '失去连接'), _S4);
    return S[e];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    channel: channel,
    decodeChannel: decodeChannel,
    command: command,
    decodeCommand: decodeCommand,
    event: event,
    decodeEvent: decodeEvent
};