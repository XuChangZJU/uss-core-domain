/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State, type: Type } = require('../../constants/cheXiaoBao/agencyConstant');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');

const isAvailable = agency => {
    return agency.state < State.cancelled1;
};

const AvailableStatesWhere = {
    $lt: State.cancelled1
};

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.CXBCUSTOMER.name]: {
        vehicleId: [State.init, State.unpaid, State.paid, State.wfd1],
        fetchId: [State.init],
        revertId: [State.init]
    }
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.CXBCUSTOMER.name]: {
        [State.init]: [State.unpaid, State.cancelled1],
        [State.unpaid]: [State.cancelled1],
        [State.paid]: [State.cancelled2],
        [State.wfd1]: [State.cancelled1],
        [State.wfr]: [State.end]
    },
    [Roles.CXBWORKER.name]: {
        [State.wfs]: [State.served, State.serveEnd],
        [State.served]: [State.serveEnd]
    },
    [Roles.ROOT.name]: {
        [State.unpaid]: [State.paid, State.expired],
        [State.paid]: [State.wfd1, State.failed1],
        [State.wfd1]: [State.da1, State.recall],
        [State.da1]: [State.onWay1],
        [State.onWay1]: [State.wfs],
        [State.serveEnd]: [State.wfd2, State.emergent],
        [State.emergent]: [State.end2],
        [State.wfd2]: [State.da2],
        [State.da2]: [State.onWay2],
        [State.onWay2]: [State.wfr]
    }
};

// 检查对象是否合法
const checkValid = (agency, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(agency.type, 'agency must have user');
    assertFn2(agency.state, 'agency must have state');
    assertFn2(values(Type).includes(agency.type), 'invalid type');
    assertFn2(values(State).includes(agency.state), 'invalid state');
    assertFn2(agency.userId, 'agency must have user');
    assertFn2(agency.stationId, 'agency must have station');
    assertFn2(agency.vehicleId, 'agency must have vehicle');
    assertFn2(agency.fetchId, 'agency must have fetch');
    assertFn2(agency.revertId, 'agency must have revert');
    assertFn2(agency.price > 0, 'agency must have positive price');
};

module.exports = {
    isAvailable,
    AvailableStatesWhere,
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid
};