'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _AttrsUpdateMatrix, _Roles$CXBCUSTOMER$na, _Roles$CXBWORKER$name, _Roles$ROOT$name, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/helpCheck'),
    State = _require.state;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

var isAvailable = function isAvailable(agency) {
    return agency.state < State.init;
};

var AvailableStatesWhere = {
    $lt: State.init
};

// 属性允许更新矩阵
var AttrsUpdateMatrix = (_AttrsUpdateMatrix = {}, (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.CXBCUSTOMER.name, {
    vehicleId: [State.init, State.unpaid, State.paid],
    mobile: [State.init, State.unpaid],
    stationId: [State.init, State.unpaid],
    params: [State.init, State.unpaid],
    time: [State.init, State.unpaid]
}), (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.CXBWORKER.name, {
    done: [State.inServe]
}), (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.ROOT.name, {
    fee: [State.cancelled2],
    feeDetail: [State.cancelled2]
}), _AttrsUpdateMatrix);

// 状态允许更新矩阵
var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.CXBCUSTOMER.name, (_Roles$CXBCUSTOMER$na = {}, (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.init, [State.unpaid, State.cancelled1]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.unpaid, [State.cancelled1]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.paid, [State.cancelled2, State.arrived]), _Roles$CXBCUSTOMER$na)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.CXBWORKER.name, (_Roles$CXBWORKER$name = {}, (0, _defineProperty3.default)(_Roles$CXBWORKER$name, State.arrived, [State.inServe]), (0, _defineProperty3.default)(_Roles$CXBWORKER$name, State.inServe, [State.end]), _Roles$CXBWORKER$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.init, [State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.unpaid, [State.paid, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.paid, [State.arrived, State.inServe]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.arrived, [State.inServe]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.inServe, [State.end]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.cancelled2, [State.over2]), _Roles$ROOT$name)), _StateTransformMatrix);

// 检查对象是否合法
var checkValid = function checkValid(helpCheck, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(helpCheck.state, 'helpCheck must have state');
    assertFn2(values(State).includes(helpCheck.state), 'invalid state');
    assertFn2(helpCheck.userId, 'helpCheck must have user');
    assertFn2(helpCheck.stationId, 'helpCheck must have station');
    assertFn2(helpCheck.vehicleId, 'helpCheck must have vehicle');
    assertFn2(helpCheck.price > 0, 'helpCheck must have positive price');
    assertFn2(helpCheck.time, 'helpCheck must have time');
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};