'use strict';

var _Roles$LOGGEDIN$name, _Roles$ROOT$name, _StateTransformMatrix;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var Roles = require('./role');

var state = {
    init: 10,
    send: 101,
    answered: 102,
    answered2: 103,
    failed: 201,
    end: 1001,
    end2: 1002,
    end3: 1003
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.init, '初始的'), _defineProperty(_STRING, state.send, '已请求'), _defineProperty(_STRING, state.answered, '已响应'), _defineProperty(_STRING, state.answered2, '已被动响应'), _defineProperty(_STRING, state.failed, '已失败'), _defineProperty(_STRING, state.end, '已结束'), _defineProperty(_STRING, state.end2, '已被动结束'), _defineProperty(_STRING, state.end3, '未成功就结束'), _STRING);
    return STRING[s];
};

var StateTransformMatrix = (_StateTransformMatrix = {}, _defineProperty(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, _defineProperty(_Roles$LOGGEDIN$name, state.init, [state.send]), _defineProperty(_Roles$LOGGEDIN$name, state.send, [state.answered]), _defineProperty(_Roles$LOGGEDIN$name, state.answered, [state.end, state.send]), _defineProperty(_Roles$LOGGEDIN$name, state.answered2, [state.end, state.send]), _defineProperty(_Roles$LOGGEDIN$name, state.failed, [state.send]), _Roles$LOGGEDIN$name)), _defineProperty(_StateTransformMatrix, Roles.MoveVehicleOperator.name, _defineProperty({}, state.send, [state.answered2, state.failed])), _defineProperty(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, state.init, [state.end3]), _defineProperty(_Roles$ROOT$name, state.send, [state.end2, state.failed]), _defineProperty(_Roles$ROOT$name, state.answered, [state.end2]), _defineProperty(_Roles$ROOT$name, state.answered2, [state.end2]), _defineProperty(_Roles$ROOT$name, state.failed, [state.end3]), _Roles$ROOT$name)), _StateTransformMatrix);

var event = {
    autoCallMaster: 1,
    callMasterYourself: 2,
    noticeFirstTime: 3,
    noticeSecondTime: 4
};

var decodeEvent = function decodeEvent(e) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, event.autoCallMaster, '正为您拨打车主电话'), _defineProperty(_STRING2, event.callMasterYourself, '请手动拨打车主电话'), _defineProperty(_STRING2, event.noticeFirstTime, '正在为您第一次通知车主'), _defineProperty(_STRING2, event.noticeSecondTime, '正在为您第二次通知车主'), _STRING2);

    return STRING[e];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix,
    event: event,
    decodeEvent: decodeEvent
};