'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.init, '初建'), (0, _defineProperty3.default)(_S, state.sent, '发送'), (0, _defineProperty3.default)(_S, state.success, '成功'), (0, _defineProperty3.default)(_S, state.checking, '复查'), (0, _defineProperty3.default)(_S, state.failure, '失败'), (0, _defineProperty3.default)(_S, state.givenUp, '放弃'), (0, _defineProperty3.default)(_S, state.overTime, '超时'), _S);

    return S[s];
};

var channel = {
    zhzn: 1,
    gsm: 2,
    ble: 3
};

var decodeChannel = function decodeChannel(c) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, channel.zhzn, 'ZHZN'), (0, _defineProperty3.default)(_S2, channel.gsm, '2G'), (0, _defineProperty3.default)(_S2, channel.ble, '蓝牙'), _S2);
    return S[c];
};

// 这里已经废弃，合并到utils/deviceProtocol/def里去了
/*const command = {
    work: 1,
    stopWork: 2,

    checkResult: 100,
};

const decodeCommand = (c) => {
    const S = {
        [command.work]: '工作',
        [command.stopWork]: '取消工作',
        [command.checkResult]: '查询结果',
    };

    return S[c];
};*/

var event = {
    workSuccess: 1,
    workFailure: 2,
    workComplete: 3,

    stopSuccess: 11,
    stopFailure: 12,

    querySuccess: 101,
    queryFailure: 102,
    report: 103,

    deviceConnected: 201,
    deviceDisconnected: 202,
    deviceConnectedByBle: 203
};

var decodeEvent = function decodeEvent(e) {
    var _S3;

    var S = (_S3 = {}, (0, _defineProperty3.default)(_S3, event.workSuccess, '工作成功'), (0, _defineProperty3.default)(_S3, event.workFailure, '工作失败'), (0, _defineProperty3.default)(_S3, event.workComplete, '工作结束'), (0, _defineProperty3.default)(_S3, event.stopSuccess, '停止成功'), (0, _defineProperty3.default)(_S3, event.stopFailure, '停止失败'), (0, _defineProperty3.default)(_S3, event.querySuccess, '查询成功'), (0, _defineProperty3.default)(_S3, event.queryFailure, '查询失败'), (0, _defineProperty3.default)(_S3, event.report, '汇报数据'), (0, _defineProperty3.default)(_S3, event.deviceConnected, '重新连接'), (0, _defineProperty3.default)(_S3, event.deviceDisconnected, '失去连接'), (0, _defineProperty3.default)(_S3, event.deviceConnectedByBle, '通过蓝牙连接'), _S3);
    return S[e];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    channel: channel,
    decodeChannel: decodeChannel,
    // command,
    // decodeCommand,
    event: event,
    decodeEvent: decodeEvent
};