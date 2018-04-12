/**
 * Created by Administrator on 2018/3/31.
 */
const { state: State } = require('../constants/tradeConstant');
const { Roles } = require('../constants/roleConstant2');

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.BUYER.name]: {
        params: [State.init, State.inShopCart],
        addressId: [State.init, State.unpaid, State.inShopCart, State.paid],
        number: [State.init, State.inShopCart],
        remark: [State.init, State.unpaid, State.inShopCart, State.paid],
        evaluate: [State.confirmed, State.finished],
        comment: [State.confirmed, State.finished]
    },
    [Roles.SELLER.name]: {
        transit: [State.gettingRidOf, State.sending],
        transitNo: [State.gettingRidOf, State.sending]
    }
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.BUYER.name]: {
        [State.init]: [State.inShopCart, State.unpaid, State.closed],
        [State.inShopCart]: [State.unpaid, State.closed],
        [State.inShopCart]: [State.closed],
        [State.sending]: [State.confirmed, State.applyingForRefunding, State.changing]
    },
    [Roles.SELLER.name]: {
        [State.paid]: [State.gettingRidOf],
        [State.gettingRidOf]: [State.sending],
        [State.applyingForRefunding]: [State.refunding],
        [State.changing]: [State.gettingRidOf]
    }
};

// 检查对象是否合法
const checkValid = (trade, assertFn) => {
    assertFn(trade.price > 0, 'trade must have price');
    assertFn(trade.transitCost >= 0, 'trade must have transitCost');
    assertFn(trade.number > 0, 'trade must have number');
};

module.exports = {
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid
};