/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";

var _STRINGS_OF_STATES, _RefundAllowedWindow, _RefundWeightOfOrigin, _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = {
    app: 1, // 直接唤起sdk支付
    jsApi: 2, // 在内部环境下的支付（小程序，公众号）
    native: 3 // 扫码支付
};

var decodeType = function decodeType(t) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, type.app, '唤起APP支付'), _defineProperty(_STRINGS, type.jsApi, '内部环境下支付'), _defineProperty(_STRINGS, type.native, '扫码支付'), _STRINGS);

    return STRINGS[t];
};

var state = {
    init: 1,
    paying: 3,
    paid: 10,
    refunding: 99,
    refunded: 201,
    partialRefunded: 202,
    closed: 501,
    finished: 999,
    unexisted: 1099 // 为了兼容外部订单号不存在的情况
};

var STRINGS_OF_STATES = (_STRINGS_OF_STATES = {}, _defineProperty(_STRINGS_OF_STATES, state.init, "未支付"), _defineProperty(_STRINGS_OF_STATES, state.paying, "正在支付"), _defineProperty(_STRINGS_OF_STATES, state.paid, "支付完成"), _defineProperty(_STRINGS_OF_STATES, state.refunding, "正在退款"), _defineProperty(_STRINGS_OF_STATES, state.partialRefunded, "部分退款"), _defineProperty(_STRINGS_OF_STATES, state.refunded, "已退款"), _defineProperty(_STRINGS_OF_STATES, state.closed, "已关闭"), _defineProperty(_STRINGS_OF_STATES, state.finished, "已结束"), _defineProperty(_STRINGS_OF_STATES, state.unexisted, '不存在'), _STRINGS_OF_STATES);

function decodeState(s) {
    return STRINGS_OF_STATES[s];
}

var origin = {
    alipay: "alipay",
    account: "account",
    weChat: "weChat",
    weChatV3: 'weChatV3',

    shouQianBa: 'shouQianBa',
    lianLian: 'lianLian'
};

/**
 * 允许退款的窗口长度，一个pay成功后如果超过这个窗口，则不允许被退款（相应的order成为archieve状态）
 * @type {{}}
 */
var RefundAllowedWindow = (_RefundAllowedWindow = {}, _defineProperty(_RefundAllowedWindow, origin.alipay, 3600 * 1000), _defineProperty(_RefundAllowedWindow, origin.weChat, 3600 * 1000), _defineProperty(_RefundAllowedWindow, origin.account, 24 * 3600 * 1000), _RefundAllowedWindow);

/**
 * 不同origin在退款时的优先级。优先级越高的越优先被退款
 * @type {{}}
 */
var RefundWeightOfOrigins = (_RefundWeightOfOrigin = {}, _defineProperty(_RefundWeightOfOrigin, origin.alipay, 999), _defineProperty(_RefundWeightOfOrigin, origin.weChat, 999), _defineProperty(_RefundWeightOfOrigin, origin.account, 100), _RefundWeightOfOrigin);

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, origin.alipay, "支付宝"), _defineProperty(_STRINGS_OF_ORIGINS, origin.account, "余额"), _defineProperty(_STRINGS_OF_ORIGINS, origin.weChat, "微信"), _defineProperty(_STRINGS_OF_ORIGINS, origin.weChatV3, "微信支付V3"), _defineProperty(_STRINGS_OF_ORIGINS, origin.shouQianBa, "收钱吧"), _defineProperty(_STRINGS_OF_ORIGINS, origin.lianLian, '连连支付'), _STRINGS_OF_ORIGINS);

function decodeOrigin(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    origin: origin,
    decodeOrigin: decodeOrigin,
    RefundWeightOfOrigins: RefundWeightOfOrigins,
    RefundAllowedWindow: RefundAllowedWindow
};