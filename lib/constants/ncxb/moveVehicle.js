'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$LOGGEDIN$name, _Roles$MoveVehicleOpe, _Roles$ROOT$name, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.init, '初始的'), (0, _defineProperty3.default)(_STRING, state.send, '已请求'), (0, _defineProperty3.default)(_STRING, state.answered, '已响应'), (0, _defineProperty3.default)(_STRING, state.answered2, '已被动响应'), (0, _defineProperty3.default)(_STRING, state.failed, '已失败'), (0, _defineProperty3.default)(_STRING, state.end, '已结束'), (0, _defineProperty3.default)(_STRING, state.end2, '已被动结束'), (0, _defineProperty3.default)(_STRING, state.end3, '未成功就结束'), _STRING);
    return STRING[s];
};

var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, state.init, [state.send]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, state.send, [state.answered]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, state.answered, [state.end, state.send]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, state.answered2, [state.end, state.send]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, state.failed, [state.send, state.answered]), _Roles$LOGGEDIN$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.MoveVehicleOperator.name, (_Roles$MoveVehicleOpe = {}, (0, _defineProperty3.default)(_Roles$MoveVehicleOpe, state.send, [state.answered2]), (0, _defineProperty3.default)(_Roles$MoveVehicleOpe, state.failed, [state.answered2]), _Roles$MoveVehicleOpe)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, state.init, [state.end3]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.send, [state.end2, state.failed]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.answered, [state.end2]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.answered2, [state.end2]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.failed, [state.end3]), _Roles$ROOT$name)), _StateTransformMatrix);

var event = {
    autoCallMaster: 1,
    callMasterYourself: 2,
    noticeFirstTime: 3,
    noticeSecondTime: 4
};

var decodeEvent = function decodeEvent(e) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, event.autoCallMaster, '正为您拨打车主电话'), (0, _defineProperty3.default)(_STRING2, event.callMasterYourself, '请手动拨打车主电话'), (0, _defineProperty3.default)(_STRING2, event.noticeFirstTime, '正在为您第一次通知车主'), (0, _defineProperty3.default)(_STRING2, event.noticeSecondTime, '正在为您第二次通知车主'), _STRING2);

    return STRING[e];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix,
    event: event,
    decodeEvent: decodeEvent
};