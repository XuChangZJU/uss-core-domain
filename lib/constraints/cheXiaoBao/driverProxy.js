'use strict';

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/driverProxyConstant'),
    State = _require.state,
    Source = _require.source;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/stringUtils'),
    checkMobile = _require3.checkMobile;

var _require4 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require4.checkConditionThrowString;

var isAvailable = function isAvailable(dp) {
    return [State.accepted, State.arrived, State.started, State.finished].includes(dp.state);
};

var AvailableStatesWhere = {
    $in: [State.accepted, State.arrived, State.started, State.finished]
};

// 属性允许更新矩阵
var AttrsUpdateMatrix = _defineProperty({}, Roles.ROOT.name, {
    driverName: [State.fresh],
    driverMob: [State.fresh],
    data: [State.fresh],
    externalOid: [State.init]
});

// 状态允许更新矩阵
var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.cancelled, State.fresh]), _defineProperty(_Roles$ROOT$name, State.fresh, [State.cancelled, State.expired, State.accepted]), _defineProperty(_Roles$ROOT$name, State.accepted, [State.cancelled, State.arrived, State.driverCancelled]), _defineProperty(_Roles$ROOT$name, State.arrived, [State.cancelled, State.started, State.driverCancelled]), _defineProperty(_Roles$ROOT$name, State.started, [State.finished]), _defineProperty(_Roles$ROOT$name, State.finished, [State.cleared]), _Roles$ROOT$name));

// 检查对象是否合法
var checkValid = function checkValid(driverProxy, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(driverProxy.source, 'driverProxy must have source');
    assertFn2(driverProxy.state, 'driverProxy must have state');
    assertFn2(values(Source).includes(driverProxy.source), 'invalid source');
    assertFn2(values(State).includes(driverProxy.state), 'invalid state');
    assertFn2(driverProxy.agencyId, 'driverProxy must have agency');
    if (driverProxy.driverMob) {
        assertFn2(checkMobile(driverProxy.driverMob), 'driverMob must be legal mobile');
    }
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};