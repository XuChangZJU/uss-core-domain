/**
 * Created by Administrator on 2016/8/31.
 */
"use strict";

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.sending, '发送中'), (0, _defineProperty3.default)(_STRINGS, state.success, '发送成功'), (0, _defineProperty3.default)(_STRINGS, state.failure, '发送失败'), _STRINGS);
    return STRINGS[s];
};

module.exports = {
    weight: weight,
    state: state,
    decodeState: decodeState,
    channel: channel
};