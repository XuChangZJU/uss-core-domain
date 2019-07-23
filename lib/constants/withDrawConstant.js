/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./action'),
    state = _require.state,
    decodeState = _require.decodeState;

var origin = {
    alipay: "alipay",
    bank: "bank"
};

function decodeOrigin(s) {
    var _originDecoder;

    var originDecoder = (_originDecoder = {}, _defineProperty(_originDecoder, origin.alipay, "支付宝"), _defineProperty(_originDecoder, origin.bank, "银行"), _originDecoder);
    return originDecoder[s];
}

module.exports = {
    state: state,
    origin: origin,
    decodeOrigin: decodeOrigin,
    decodeState: decodeState
};