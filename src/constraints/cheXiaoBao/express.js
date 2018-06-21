/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State } = require('../../constants/cheXiaoBao/expressConstant');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');


// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.ROOT.name]: {
        price: [
            State.unposted
        ],
        from: [
            State.unposted
        ],
        to: [
            State.unposted
        ],
        name: [
            State.unposted
        ],
        number: [
            State.unposted
        ],
    },
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.unposted]: [ State.posted],
        [State.posted]: [ State.sending, State.end],
        [State.sending]: [ State.end ],
    },
};


// 检查对象是否合法
const checkValid = (express, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(express.state, 'express must have state');
    assertFn2(values(State).includes(express.state), 'invalid state');
    assertFn2(express.type, 'express must have type');
    assertFn2(express.from, 'express must have from');
    assertFn2(express.to, 'express must have to');
    assertFn2(express.materialCheckId, 'express must have materialCheckId');
};

module.exports = {
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid,
};
