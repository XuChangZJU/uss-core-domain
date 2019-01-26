/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";

var _STRING_OF_STATES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    unpaid: 1,
    paying: 3,
    partialPaid: 5,
    paid: 10,
    toBeRefunded: 91,
    refunding: 99,
    refunded: 201,
    partialRefunded: 202,
    closed: 501,
    outDated: 888,
    finished: 999
};

var origin = {
    weChat: "weChat",
    weChatPro: "weChatPro"
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, _defineProperty(_STRING_OF_STATES, state.unpaid, '待支付'), _defineProperty(_STRING_OF_STATES, state.paying, '支付中'), _defineProperty(_STRING_OF_STATES, state.partialPaid, '部分支付'), _defineProperty(_STRING_OF_STATES, state.paid, '支付成功'), _defineProperty(_STRING_OF_STATES, state.toBeRefunded, '退款中'), _defineProperty(_STRING_OF_STATES, state.refunding, '退款中'), _defineProperty(_STRING_OF_STATES, state.refunded, '退款成功'), _defineProperty(_STRING_OF_STATES, state.partialRefunded, '部分退款成功'), _defineProperty(_STRING_OF_STATES, state.closed, '已关闭'), _defineProperty(_STRING_OF_STATES, state.outDated, '已过期'), _defineProperty(_STRING_OF_STATES, state.finished, '已完成'), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

var type = {
    coupon: 6, // 平台红包
    weChatProOrder: 13, //  微信商城订单
    buyServiceOfPlatform: 14, // 用户购买平台服务
    bonus: 18, // 推广奖金
    goods: 20, // 货款
    settlement: 22, // 与提供平台服务的商家结算
    couponRefund: 30, // 红包退款
    refund: 101 // 退款
};

var decodeType = function decodeType(t) {
    var _STRING_OF_TYPES;

    var STRING_OF_TYPES = (_STRING_OF_TYPES = {}, _defineProperty(_STRING_OF_TYPES, type.coupon, "红包"), _defineProperty(_STRING_OF_TYPES, type.weChatProOrder, "商城订单"), _defineProperty(_STRING_OF_TYPES, type.buyServiceOfPlatform, '订单'), _defineProperty(_STRING_OF_TYPES, type.bonus, '奖金'), _defineProperty(_STRING_OF_TYPES, type.goods, '货款'), _defineProperty(_STRING_OF_TYPES, type.settlement, '结算款'), _defineProperty(_STRING_OF_TYPES, type.couponRefund, '红包退款'), _defineProperty(_STRING_OF_TYPES, type.refund, '退款'), _STRING_OF_TYPES);
    return STRING_OF_TYPES[t];
};

var getOrderTypesByPlf = function getOrderTypesByPlf(platform) {
    switch (platform) {
        case origin.weChat:
            return [];
        case origin.weChatPro:
            return [type.weChatProOrder];
    }
};

module.exports = {
    state: state,
    type: type,
    decodeState: decodeState,
    decodeType: decodeType,
    getOrderTypesByPlf: getOrderTypesByPlf
};