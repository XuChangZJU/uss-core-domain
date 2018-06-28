'use strict';

var _AttrsUpdateMatrix, _Roles$CXBCUSTOMER$na, _Roles$ROOT$name, _StateTransformMatrix;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/mcConstant'),
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
var AttrsUpdateMatrix = (_AttrsUpdateMatrix = {}, _defineProperty(_AttrsUpdateMatrix, Roles.CXBCUSTOMER.name, {
    vehicleId: [State.init, State.unpaid, State.paid],
    mobile: [State.init, State.unpaid],
    stationId: [State.init, State.unpaid],
    cityId: [State.init, State.unpaid],
    address: [State.init, State.unpaid],
    params: [State.init, State.unpaid],
    fetchTime: [State.init, State.unpaid]
}), _defineProperty(_AttrsUpdateMatrix, Roles.CXBWORKER.name, {
    done: [State.accepted]
}), _defineProperty(_AttrsUpdateMatrix, Roles.ROOT.name, {
    fee: [State.cancelled2],
    feeDetail: [State.cancelled2]
}), _AttrsUpdateMatrix);

// 状态允许更新矩阵
var StateTransformMatrix = (_StateTransformMatrix = {}, _defineProperty(_StateTransformMatrix, Roles.CXBCUSTOMER.name, (_Roles$CXBCUSTOMER$na = {}, _defineProperty(_Roles$CXBCUSTOMER$na, State.init, [State.unpaid, State.cancelled1]), _defineProperty(_Roles$CXBCUSTOMER$na, State.unpaid, [State.cancelled1]), _defineProperty(_Roles$CXBCUSTOMER$na, State.paid, [State.cancelled2]), _defineProperty(_Roles$CXBCUSTOMER$na, State.sendingBack, [State.end]), _Roles$CXBCUSTOMER$na)), _defineProperty(_StateTransformMatrix, Roles.CXBWORKER.name, _defineProperty({}, State.sending, [State.accepted])), _defineProperty(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.expired]), _defineProperty(_Roles$ROOT$name, State.unpaid, [State.paid, State.expired]), _defineProperty(_Roles$ROOT$name, State.paid, [State.posted]), _defineProperty(_Roles$ROOT$name, State.posted, [State.sending, State.accepted]), _defineProperty(_Roles$ROOT$name, State.sending, [State.accepted]), _defineProperty(_Roles$ROOT$name, State.accepted, [State.sendingBack]), _defineProperty(_Roles$ROOT$name, State.sendingBack, [State.end]), _defineProperty(_Roles$ROOT$name, State.cancelled2, [State.over2]), _Roles$ROOT$name)), _StateTransformMatrix);

// 检查对象是否合法
var checkValid = function checkValid(mc, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(mc.state, 'agency must have state');
    assertFn2(values(State).includes(mc.state), 'invalid state');
    assertFn2(mc.userId, 'agency must have user');
    assertFn2(mc.stationId, 'agency must have station');
    assertFn2(mc.vehicleId, 'agency must have vehicle');
    assertFn2(mc.price > 0, 'agency must have positive price');
    assertFn2(mc.cityId, 'mc must have city');
    assertFn2(mc.address, 'mc must have address');
    assertFn2(mc.fetchTime, 'mc must have fetchTime');
    // assertFn2(mc.fetchTime > Date.now(), 'fetchTime must be larger than now');
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};