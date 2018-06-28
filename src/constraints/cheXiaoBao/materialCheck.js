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
        cityId: [
            State.init, State.unpaid
        ],
        address: [
            State.init, State.unpaid
        ],
        params: [
            State.init, State.unpaid
        ],
        fetchTime: [
            State.init, State.unpaid
        ]
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
        [State.sendingBack]: [ State.end ],
    },
    [Roles.CXBWORKER.name]: {
        [State.sending]: [ State.accepted ],
    },
    [Roles.ROOT.name]: {
        [State.init]: [ State.expired],
        [State.unpaid]: [ State.paid, State.expired ],
        [State.paid]: [ State.posted ],
        [State.posted]: [State.sending, State.accepted ],
        [State.sending]: [ State.accepted ],
        [State.accepted]: [ State.sendingBack ],
        [State.sendingBack]: [ State.end ],
        [State.cancelled2]: [State.over2 ],
    },
};


// 检查对象是否合法
const checkValid = (mc, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

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
    isAvailable,
    AvailableStatesWhere,
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid,
};
