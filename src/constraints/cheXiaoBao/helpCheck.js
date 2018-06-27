/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State } = require('../../constants/cheXiaoBao/mcConstant');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');

const isAvailable = (agency) => {
    return (agency.state < State.init);
};

const AvailableStatesWhere = {
    $lt: State.init,
};

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.CXBCUSTOMER.name]: {
        vehicleId: [
            State.init, State.unpaid, State.paid
        ],
        mobile: [
            State.init, State.unpaid
        ],
        stationId: [
            State.init, State.unpaid
        ],
        params: [
            State.init, State.unpaid
        ],
    },
    [Roles.CXBWORKER.name]: {
        done: [
            State.accepted,
        ],
    },
    [Roles.ROOT.name]: {
        fee: [
            State.cancelled2
        ],
        feeDetail: [
            State.cancelled2
        ],
    },
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.CXBCUSTOMER.name]: {
        [State.init]: [ State.unpaid, State.cancelled1 ],
        [State.unpaid]: [ State.cancelled1 ],
        [State.paid]: [ State.cancelled2 ],
    },
    [Roles.CXBWORKER.name]: {
        [State.paid]: [ State.inServe ],
        [State.inServe]: [State.end ],
    },
    [Roles.ROOT.name]: {
        [State.init]: [ State.expired],
        [State.unpaid]: [ State.paid, State.expired ],
        [State.paid]: [ State.inServe ],
        [State.inServe]: [State.end ],
    },
};


// 检查对象是否合法
const checkValid = (helpCheck, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(helpCheck.state, 'agency must have state');
    assertFn2(values(State).includes(helpCheck.state), 'invalid state');
    assertFn2(helpCheck.userId, 'agency must have user');
    assertFn2(helpCheck.stationId, 'agency must have station');
    assertFn2(helpCheck.vehicleId, 'agency must have vehicle');
    assertFn2(helpCheck.price > 0, 'agency must have positive price');
};

module.exports = {
    isAvailable,
    AvailableStatesWhere,
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid,
};
