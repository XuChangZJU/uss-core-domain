'use strict';

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/mingsu/house'),
    State = _require.state,
    Type = _require.type;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

var isAvailable = function isAvailable(house) {
    return house.state === State.online;
};

var AvailableStatesWhere = {
    $eq: State.online
};

// 状态允许更新矩阵
var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.uncompleted, [State.online]), _defineProperty(_Roles$ROOT$name, State.online, [State.offline, State.offlineByPlatform]), _defineProperty(_Roles$ROOT$name, State.offline, [State.online]), _defineProperty(_Roles$ROOT$name, State.offlineByPlatform, [State.online]), _Roles$ROOT$name));

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    StateTransformMatrix: StateTransformMatrix
};