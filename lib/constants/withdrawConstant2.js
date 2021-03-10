/**
 * Created by Administrator on 2016/11/1.
 */
"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./action'),
    state = _require.state,
    decodeState = _require.decodeState;

var origin = {
    alipay: "alipay",
    bank: "bank"
};

function decodeOrigin(s) {
    var _originDecoder;

    var originDecoder = (_originDecoder = {}, (0, _defineProperty3.default)(_originDecoder, origin.alipay, "支付宝"), (0, _defineProperty3.default)(_originDecoder, origin.bank, "银行"), _originDecoder);
    return originDecoder[s];
}

module.exports = {
    state: state,
    origin: origin,
    decodeOrigin: decodeOrigin,
    decodeState: decodeState
};