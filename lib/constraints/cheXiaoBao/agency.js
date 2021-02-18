'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _AttrsUpdateMatrix, _Roles$CXBCUSTOMER$na, _Roles$CXBWORKER$name, _Roles$ROOT$name, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/agencyConstant'),
    State = _require.state,
    Type = _require.type;

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
    vehicleId: [State.init, State.unpaid, State.paid, State.wfd1],
    fetchId: [State.init, State.unpaid],
    revertId: [State.init, State.unpaid],
    fetchTime: [State.init, State.unpaid],
    params: [State.init, State.unpaid]
}), (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.CXBWORKER.name, {
    done: [State.served]
}), (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.ROOT.name, {
    fee: [State.failed1, State.cancelled2],
    feeDetail: [State.failed1, State.cancelled2]
}), _AttrsUpdateMatrix);

// 状态允许更新矩阵
var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.CXBCUSTOMER.name, (_Roles$CXBCUSTOMER$na = {}, (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.init, [State.unpaid, State.cancelled1]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.unpaid, [State.cancelled1]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.paid, [State.cancelled2]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.matching1, [State.cancelled2]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.wfd1, [State.cancelled2]), (0, _defineProperty3.default)(_Roles$CXBCUSTOMER$na, State.wfr, [State.end]), _Roles$CXBCUSTOMER$na)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.CXBWORKER.name, (_Roles$CXBWORKER$name = {}, (0, _defineProperty3.default)(_Roles$CXBWORKER$name, State.wfs, [State.served, State.serveEnd]), (0, _defineProperty3.default)(_Roles$CXBWORKER$name, State.served, [State.serveEnd]), _Roles$CXBWORKER$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.init, [State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.unpaid, [State.paid, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.paid, [State.matching1, State.failed1]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.matching1, [State.wfd1, State.failed1, State.paid]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.wfd1, [State.da1, State.matching1]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.da1, [State.onWay1]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.onWay1, [State.wfs]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.serveEnd, [State.matching2, State.emergent]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.emergent, [State.end2]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.matching2, [State.wfd2, State.serveEnd, State.emergent]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.wfd2, [State.da2, State.matching2]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.da2, [State.onWay2]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.onWay2, [State.wfr]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.failed1, [State.over3]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.cancelled2, [State.over2]), _Roles$ROOT$name)), _StateTransformMatrix);

// 检查对象是否合法
var checkValid = function checkValid(agency, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(agency.type, 'agency must have type');
    assertFn2(agency.state, 'agency must have state');
    assertFn2(values(Type).includes(agency.type), 'invalid type');
    assertFn2(values(State).includes(agency.state), 'invalid state');
    assertFn2(agency.userId, 'agency must have user');
    assertFn2(agency.stationId, 'agency must have station');
    assertFn2(agency.vehicleId, 'agency must have vehicle');
    assertFn2(agency.fetchId, 'agency must have fetch');
    assertFn2(agency.revertId, 'agency must have revert');
    assertFn2(agency.fetchTime, 'agency must have fetchTime');
    assertFn2(agency.revertTime, 'agency must have revertTime');
    assertFn2(agency.revertTime > agency.fetchTime, 'revertTime must be larger than fetchTime');
    if (agency.type === Type.check) {
        // 年检的预约时间必须在上午
        var hour = new Date(agency.fetchTime).getHours();
        assertFn2(hour >= 8 && hour <= 12, 'fetchTime must be between 8 and 12');
    }
    assertFn2(agency.price > 0, 'agency must have positive price');
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};