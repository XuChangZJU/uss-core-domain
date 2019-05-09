'use strict';

var _Roles$ROOT$name, _StateTransformMatrix2;

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


var StateTransformMatrixForPaid = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.unpaid, State.cancelled, State.expired]), _defineProperty(_Roles$ROOT$name, State.unpaid, [State.legal, State.cancelled, State.expired, State.cantPaid]), _defineProperty(_Roles$ROOT$name, State.legal, [State.refunding, State.completed, State.aborted, State.abandoned]), _defineProperty(_Roles$ROOT$name, State.refunding, [State.refunded]), _defineProperty(_Roles$ROOT$name, State.cantPaid, [State.paid, State.expired]), _Roles$ROOT$name));

var StateTransformMatrixForGrant = (_StateTransformMatrix2 = {}, _defineProperty(_StateTransformMatrix2, Roles.ROOT.name, _defineProperty({}, State.init, [State.expired])), _defineProperty(_StateTransformMatrix2, Roles.LOGGEDIN.name, _defineProperty({}, State.init, [State.confirmed])), _StateTransformMatrix2);

module.exports = {
    StateTransformMatrixForPaid: StateTransformMatrixForPaid,
    StateTransformMatrixForGrant: StateTransformMatrixForGrant
};