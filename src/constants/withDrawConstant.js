/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";
const { state, decodeState } = require('./action');

const origin = {
    alipay: "alipay",
    bank: "bank",
};

function decodeOrigin(s) {
    const originDecoder = {
        [origin.alipay]: "支付宝",
        [origin.bank]: "银行",
    };
    return originDecoder[s];
}

module.exports = {
    state,
    origin,
    decodeOrigin,
    decodeState,
};
