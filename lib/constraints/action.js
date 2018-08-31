'use strict';

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/8/31.
 * 本文件定义是公共有支付对象的状态变化矩阵
 */

var _require = require('../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../constants/action'),
    State = _require2.state;

// 状态允许更新矩阵


var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.paid, State.cancelled]), _defineProperty(_Roles$ROOT$name, State.unpaid, [State.paid, State.cancelled]), _defineProperty(_Roles$ROOT$name, State.paid, [State.expired, State.aborted]), _Roles$ROOT$name));

module.exports = {
    StateTransformMatrix: StateTransformMatrix
};