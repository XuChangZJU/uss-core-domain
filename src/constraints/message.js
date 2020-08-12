/**
 * Created by Administrator on 2018/4/17.
 */
/*const values = require('lodash/values');
const { state: State, origin: Origin, weight: Weight } = require('../constants/message');
const { Roles } = require('../constants/roleConstant2');

const { checkConditionThrowString } = require('../utils/checkValidUtils');

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.init]: [State.sending, State.fatal, State.success, State.failure],
        [State.sending]: [ State.failure, State.success, State.fatal ],
        [State.failure]: [ State.sending],
    },
};


// 检查对象是否合法
const checkValid = (message, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(message.typeId, 'message must have type');
    assertFn2(message.userId, 'message must have user');
    assertFn2(message.state, 'message must have state');
};


module.exports = {
    StateTransformMatrix,
    checkValid,
};*/
