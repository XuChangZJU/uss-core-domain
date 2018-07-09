'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var state = {
    available: 10,
    expired: 1001,
    forbidden: 1002
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.available, '可用的'), _defineProperty(_STRING, state.expired, '过期的'), _defineProperty(_STRING, state.forbidden, '禁用的'), _STRING);
    return STRING[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};