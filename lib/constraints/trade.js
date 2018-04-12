/**
 * Created by Administrator on 2018/3/31.
 */
const { state: State } = require('../constants/tradeConstant');
const Roles = require('../constants/roleConstant');

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.BUYER]: {
        params: [State.init, State.inShopCart],
        addressId: [State.init, State.unpaid, State.inShopCart, State.paid],
        number: [State.init, State.inShopCart],
        remark: [State.init, State.unpaid, State.inShopCart, State.paid],
        evaluate: [State.confirmed, State.finished],
        comment: [State.confirmed, State.finished]
    },
    [Roles.SELLER]: {
        transit: [State.gettingRidOf, State.sending],
        transitNo: [State.gettingRidOf, State.sending]
    }
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.BUYER]: {
        [State.init]: [State.inShopCart, State.unpaid, State.closed],
        [State.inShopCart]: [State.unpaid, State.closed],
        [State.inShopCart]: [State.closed],
        [State.sending]: [State.confirmed, State.applyingForRefunding, State.changing]
    },
    [Roles.SELLER]: {
        [State.paid]: [State.gettingRidOf],
        [State.gettingRidOf]: [State.sending],
        [State.applyingForRefunding]: [State.refunding],
        [State.changing]: [State.gettingRidOf]
    }
};

module.exports = {
    AttrsUpdateMatrix,
    StateTransformMatrix
};