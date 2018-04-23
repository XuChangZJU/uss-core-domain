"use strict";

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/3/4.
 */
var state = {
    normal: 1,
    forbidden: 101
};

/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

var origin = {
    order: "order",
    pay: "pay",
    payClosed: "payClosed",
    withdraw: "withdraw",
    withdrawFailure: "withdrawFailure",
    orderRefund: "orderRefund",
    payRefund: "payRefund",
    compensate: 'compensate'
};

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, origin.order, "订单收款"), _defineProperty(_STRINGS_OF_ORIGINS, origin.pay, "订单付款"), _defineProperty(_STRINGS_OF_ORIGINS, origin.payClosed, "订单取消"), _defineProperty(_STRINGS_OF_ORIGINS, origin.withdraw, "提现"), _defineProperty(_STRINGS_OF_ORIGINS, origin.withdrawFailure, "提现失败"), _defineProperty(_STRINGS_OF_ORIGINS, origin.orderRefund, "订单退款"), _defineProperty(_STRINGS_OF_ORIGINS, origin.payRefund, "支付退款"), _defineProperty(_STRINGS_OF_ORIGINS, origin.compensate, '补偿退款'), _STRINGS_OF_ORIGINS);

var relation = {
    order: 'order',
    pay: 'pay',
    refund: 'refund',
    withdraw: 'withdraw',
    compensate: 'compensate'
};

function decodeOrigin(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    origin: origin,
    decodeOrigin: decodeOrigin,
    relation: relation,
    state: state
};