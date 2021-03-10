"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STRINGS_OF_ORIGINS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.order, "订单收款"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.pay, "订单付款"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.payClosed, "订单取消"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.withdraw, "提现"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.withdrawFailure, "提现失败"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.orderRefund, "订单退款"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.payRefund, "支付退款"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, origin.compensate, '补偿退款'), _STRINGS_OF_ORIGINS);

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