/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

var _STRING_OF_STATES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    init: 1,
    inShopCart: 2,
    unpaid: 5,
    paid: 10,
    gettingRidOf: 20,
    sending: 30,
    sendingProblem: 40,
    confirmed: 50,
    applyingForRefunding: 60,
    refunding: 70,
    refunded: 201,
    closed: 501,
    finished: 901,
    changing: 911
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, _defineProperty(_STRING_OF_STATES, state.init, "初始"), _defineProperty(_STRING_OF_STATES, state.inShopCart, "购物车中"), _defineProperty(_STRING_OF_STATES, state.unpaid, "未支付"), _defineProperty(_STRING_OF_STATES, state.paid, "已支付"), _defineProperty(_STRING_OF_STATES, state.gettingRidOf, "备货中"), _defineProperty(_STRING_OF_STATES, state.sending, "等待收货"), _defineProperty(_STRING_OF_STATES, state.sendingProblem, "收货异常处理中"), _defineProperty(_STRING_OF_STATES, state.confirmed, "已确认"), _defineProperty(_STRING_OF_STATES, state.applyingForRefunding, "申请退款处理中"), _defineProperty(_STRING_OF_STATES, state.refunding, "退款中"), _defineProperty(_STRING_OF_STATES, state.refunded, "退款成功"), _defineProperty(_STRING_OF_STATES, state.closed, "已关闭"), _defineProperty(_STRING_OF_STATES, state.finished, "已完成"), _defineProperty(_STRING_OF_STATES, state.changing, "更换中"), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};