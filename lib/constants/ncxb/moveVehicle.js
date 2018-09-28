'use strict';

var _Roles$LOGGEDIN$name, _Roles$VehicleManager, _Roles$ROOT$name, _StateTransformMatrix;

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
    end: 1001,
    end2: 1002
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.init, '初始的'), _defineProperty(_STRING, state.send, '已请求'), _defineProperty(_STRING, state.answered, '已响应'), _defineProperty(_STRING, state.answered2, '已被动响应'), _defineProperty(_STRING, state.end, '已结束'), _defineProperty(_STRING, state.end2, '已被动结束'), _STRING);
    return STRING[s];
};

var StateTransformMatrix = (_StateTransformMatrix = {}, _defineProperty(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, _defineProperty(_Roles$LOGGEDIN$name, state.init, [state.send]), _defineProperty(_Roles$LOGGEDIN$name, state.answered, [state.end]), _Roles$LOGGEDIN$name)), _defineProperty(_StateTransformMatrix, Roles.VehicleManager.name, (_Roles$VehicleManager = {}, _defineProperty(_Roles$VehicleManager, state.send, [state.answered]), _defineProperty(_Roles$VehicleManager, state.answered, [state.end]), _Roles$VehicleManager)), _defineProperty(_StateTransformMatrix, Roles.MoveVehicleOperator.name, _defineProperty({}, state.send, [state.answered2])), _defineProperty(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, state.init, [state.end2]), _defineProperty(_Roles$ROOT$name, state.send, [state.end2]), _defineProperty(_Roles$ROOT$name, state.answered, [state.end2]), _defineProperty(_Roles$ROOT$name, state.answered2, [state.end2]), _Roles$ROOT$name)), _StateTransformMatrix);

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix
};