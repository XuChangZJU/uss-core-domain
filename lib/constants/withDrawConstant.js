/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";

var _STRINGS_OF_STATES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var origin = {
    alipay: "alipay"
};

var originDecoder = _defineProperty({}, origin.alipay, "支付宝");

var state = {
    init: 1,
    withdrawing: 3,
    withdrawn: 10,
    failed: 501
};

var STRINGS_OF_STATES = (_STRINGS_OF_STATES = {}, _defineProperty(_STRINGS_OF_STATES, state.init, "未开始"), _defineProperty(_STRINGS_OF_STATES, state.withdrawing, "提现中"), _defineProperty(_STRINGS_OF_STATES, state.withdrawn, "已提现成功"), _defineProperty(_STRINGS_OF_STATES, state.failed, "提现失败"), _STRINGS_OF_STATES);

function decodeState(state) {
    return STRINGS_OF_STATES[state];
}

function decodeOrigin(s) {
    return originDecoder[s];
}

module.exports = {
    state: state,
    origin: origin,
    decodeOrigin: decodeOrigin,
    decodeState: decodeState
};