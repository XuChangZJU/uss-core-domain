/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";

const state = {
    unpaid: 1,
    paying: 3,
    partialPaid: 5,
    paid: 10,
    toBeRefunded: 91,
    refunding: 99,
    refunded: 201,
    closed: 501,
    outDated: 888,
    finished: 999
};

const origin = {
    weChat: "weChat",
    weChatPro: "weChatPro"
};

const STRING_OF_STATES = {
    [state.unpaid]: '待支付',
    [state.paying]: '支付中',
    [state.partialPaid]: '部分支付',
    [state.paid]: '支付成功',
    [state.toBeRefunded]: '退款中', // 这个状态是开始退款的状态，为了实现合并退款
    [state.refunding]: '退款中',
    [state.refunded]: '退款成功',
    [state.closed]: '已关闭',
    [state.outDated]: '已过期', //  红包order特有
    [state.finished]: '已完成'

};

const decodeState = s => {
    return STRING_OF_STATES[s];
};

const type = {
    coupon: 6, // 平台红包
    weChatProOrder: 13, //  微信商城订单
    bonus: 18, // 推广奖金
    good: 20 // 货款
};

const decodeType = t => {
    const STRING_OF_TYPES = {
        [type.coupon]: "红包",
        [type.weChatProOrder]: "订单",
        [type.bonus]: '奖金',
        [type.good]: '货款'
    };
    return STRING_OF_TYPES[t];
};

const getOrderTypesByPlf = platform => {
    switch (platform) {
        case origin.weChat:
            return [];
        case origin.weChatPro:
            return [type.weChatProOrder];
    }
};

module.exports = {
    state,
    type,
    decodeState,
    decodeType,
    getOrderTypesByPlf
};