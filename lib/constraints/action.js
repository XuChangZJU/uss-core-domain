'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name, _Roles$LOGGEDIN$name, _StateTransformMatrix, _StateTransformMatrix2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var StateTransformMatrixForPaid = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.init, [State.unpaid, State.cancelled, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.unpaid, [State.legal, State.cancelled, State.expired, State.cantPaid]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.legal, [State.completed, State.aborted, State.abandoned, State.aborting, State.abandoning]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.aborting, [State.aborted, State.completed]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.abandoning, [State.abandoned, State.completed]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.cantPaid, [State.legal, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.sent, [State.completed]), _Roles$ROOT$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.init, [State.unpaid, State.cancelled]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.unpaid, [State.cancelled]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.legal, [State.aborted, State.aborting, State.abandoned, State.abandoning, State.sent]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.sent, [State.completed, State.rejected]), _Roles$LOGGEDIN$name)), _StateTransformMatrix);

var StateTransformMatrixForGrant = (_StateTransformMatrix2 = {}, (0, _defineProperty3.default)(_StateTransformMatrix2, Roles.ROOT.name, (0, _defineProperty3.default)({}, State.init, [State.expired])), (0, _defineProperty3.default)(_StateTransformMatrix2, Roles.LOGGEDIN.name, (0, _defineProperty3.default)({}, State.init, [State.confirmed])), _StateTransformMatrix2);

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