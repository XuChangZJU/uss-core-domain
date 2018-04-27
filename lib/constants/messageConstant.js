/**
 * Created by Administrator on 2016/8/31.
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var weight = {
    tiny: 10,
    low: 10,
    medium: 20,
    high: 60,
    top: 90
};

var origin = {
    jPush: "jPush",
    weChat: "weChat"
};

var state = {
    init: 0,
    sending: 1,
    success: 2,
    failure: 3,
    fatal: 127
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.init, '初始'), _defineProperty(_STRINGS, state.sending, '发送中'), _defineProperty(_STRINGS, state.success, '发送成功'), _defineProperty(_STRINGS, state.failure, '发送失败'), _defineProperty(_STRINGS, state.fatal, '彻底失败'), _STRINGS);
};

module.exports = {
    weight: weight,
    state: state,
    decodeState: decodeState,
    origin: origin
};