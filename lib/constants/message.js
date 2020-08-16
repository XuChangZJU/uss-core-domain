/**
 * Created by Administrator on 2016/8/31.
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var weight = {
    high: 'high',
    medium: 'medium',
    low: 'low',
    data: 'data' // 同步数据型
};

var channel = {
    jPush: "jPush", // 极光
    jim: 'jim', // 极光IM
    public: "public", // 公众号
    mp: 'mp', // 小程序
    gsm: 'gsm' // 短信
};

var state = {
    sending: 10001,
    success: 10002,
    failure: 10003
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.sending, '发送中'), _defineProperty(_STRINGS, state.success, '发送成功'), _defineProperty(_STRINGS, state.failure, '发送失败'), _STRINGS);
};

module.exports = {
    weight: weight,
    state: state,
    decodeState: decodeState,
    channel: channel
};