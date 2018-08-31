/**
 * Created by Administrator on 2018/8/31.
 * 本文件定义是公共有支付对象的状态变化矩阵
 */

const { Roles } = require('../constants/roleConstant2');
const { state: State } = require('../constants/action');

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.init]: [State.paid, State.cancelled],
        [State.unpaid]: [ State.paid, State.cancelled],
        [State.paid]: [ State.expired, State.aborted],
    },
};

module.exports = {
    StateTransformMatrix,
};
