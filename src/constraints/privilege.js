/**
 * Created by Administrator on 2018/8/31.
 */
const values = require('lodash/values');
const { state: State } = require('../constants/privilege');
const { Roles } = require('../constants/roleConstant2');

const { checkConditionThrowString } = require('../utils/checkValidUtils');


// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.ROOT.name]: {
        startsAt: [
            State.unpaid
        ],
        endsAt: [
            State.unpaid,
            State.legal,
        ],
        price: [
            State.unpaid
        ],
    },
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.unpaid]: [ State.paid, State.cancelled],
        [State.paid]: [ State.expired, State.aborted],
    },
};


// 检查对象是否合法
const checkValid = (privilege, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(privilege.state, 'privilege must have state');
    assertFn2(values(State).includes(privilege.state), 'invalid state');
    if (privilege.beginsAt) {
        assertFn2(privilege.endsAt, 'privilege must have or not have beginsAt and endsAt concurrently');
        assertFn2(privilege.endsAt > privilege.beginsAt, 'endsAt must be large than beginsAt');
    }
};

module.exports = {
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid,
};

