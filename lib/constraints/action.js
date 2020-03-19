'use strict';

var _Roles$ROOT$name, _Roles$LOGGEDIN$name, _StateTransformMatrix, _StateTransformMatrix2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/8/31.
 * 本文件定义是公共有支付对象的状态变化矩阵
 */

var _require = require('../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../constants/action'),
    State = _require2.state,
    Relation = _require2.relation;

// 状态允许更新矩阵


var StateTransformMatrixForPaid = (_StateTransformMatrix = {}, _defineProperty(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.unpaid, State.cancelled, State.expired]), _defineProperty(_Roles$ROOT$name, State.unpaid, [State.legal, State.cancelled, State.expired, State.cantPaid]), _defineProperty(_Roles$ROOT$name, State.legal, [State.completed, State.aborted, State.abandoned, State.aborting, State.abandoning]), _defineProperty(_Roles$ROOT$name, State.aborting, [State.aborted, State.completed]), _defineProperty(_Roles$ROOT$name, State.abandoning, [State.abandoned, State.completed]), _defineProperty(_Roles$ROOT$name, State.cantPaid, [State.legal, State.expired]), _defineProperty(_Roles$ROOT$name, State.sent, [State.completed]), _Roles$ROOT$name)), _defineProperty(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, _defineProperty(_Roles$LOGGEDIN$name, State.init, [State.unpaid, State.cancelled]), _defineProperty(_Roles$LOGGEDIN$name, State.unpaid, [State.cancelled]), _defineProperty(_Roles$LOGGEDIN$name, State.legal, [State.aborted, State.aborting, State.abandoned, State.abandoning, State.sent]), _defineProperty(_Roles$LOGGEDIN$name, State.sent, [State.completed, State.rejected]), _Roles$LOGGEDIN$name)), _StateTransformMatrix);

var StateTransformMatrixForGrant = (_StateTransformMatrix2 = {}, _defineProperty(_StateTransformMatrix2, Roles.ROOT.name, _defineProperty({}, State.init, [State.expired])), _defineProperty(_StateTransformMatrix2, Roles.LOGGEDIN.name, _defineProperty({}, State.init, [State.confirmed])), _StateTransformMatrix2);

var AllowEveryoneAuth = {
    allowEveryone: true
};

var AnyRelationAuth = {
    relation: 'any'
};

var OwnerRelationAuth = {
    relation: [Relation.owner]
};

module.exports = {
    StateTransformMatrixForPaid: StateTransformMatrixForPaid,
    StateTransformMatrixForGrant: StateTransformMatrixForGrant,

    AllowEveryoneAuth: AllowEveryoneAuth,
    OwnerRelationAuth: OwnerRelationAuth,
    AnyRelationAuth: AnyRelationAuth
};