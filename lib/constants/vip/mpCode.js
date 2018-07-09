'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var state = {
    free: 10,
    bound: 101
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.free, '空闲的'), _defineProperty(_STRING, state.bound, '绑定的'), _STRING);

    return STRING[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};