'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/8/31.
 */
var state = {
    unpaid: 10,
    legal: 20,
    expired: 30,
    aborted: 40,
    cancelled: 50
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.unpaid, '未支付的'), _defineProperty(_STRINGS, state.legal, '生效的'), _defineProperty(_STRINGS, state.expired, '过期的'), _defineProperty(_STRINGS, state.aborted, '中止的'), _defineProperty(_STRINGS, state.cancelled, '取消的'), _STRINGS);
};

module.exports = {
    state: state,
    decodeState: decodeState
};