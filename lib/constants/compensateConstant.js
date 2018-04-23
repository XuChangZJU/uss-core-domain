/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

var _STRING_OF_STATES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    init: 0,
    done: 201
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, _defineProperty(_STRING_OF_STATES, state.init, "初始化"), _defineProperty(_STRING_OF_STATES, state.done, "补偿完成"), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};