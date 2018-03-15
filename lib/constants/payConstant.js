/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";
const state = {
    init: 0,
    paying: 3,
    paid: 10,
    refunding: 99,
    partialRefunded: 101,
    refunded: 201,
    closed: 501,
    finished: 999,
};

const STRINGS_OF_STATES = {
    [state.paying]: "正在支付",
    [state.paid]: "支付完成",
    [state.refunding]: "正在退款",
    [state.partialRefunded]: "部分退款",
    [state.refunded]: "已退款",
    [state.closed]: "已关闭",
    [state.finished]: "已结束",
};

function decodeState(s) {
    return STRINGS_OF_STATES[s];
}

const origin = {
    alipay: "alipay",
    account: "account",
    weChat: "weChat",
};

/**
 * 允许退款的窗口长度，一个pay成功后如果超过这个窗口，则不允许被退款（相应的order成为archieve状态）
 * @type {{}}
 */
const RefundAllowedWindow = {
    [origin.alipay]: 3600 * 1000,       // todo 这个值没有测试过，如果在1小时内就不能退款的话，这里会失败导致整个系统完蛋！！！
    [origin.account]: 24 * 3600 * 1000,
};

/**
 * 不同origin在退款时的优先级。优先级越高的越优先被退款
 * @type {{}}
 */
const RefundWeightOfOrigins = {
    [origin.alipay]: 100,
    [origin.account]: 999,
};

const STRINGS_OF_ORIGINS = {
    [origin.alipay]: "支付宝",
    [origin.account]: "余额",
    [origin.weChat]: "微信",
};

function decodeOrigin(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    state,
    decodeState,
    origin,
    decodeOrigin,
    RefundWeightOfOrigins,
    RefundAllowedWindow,
};
