'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/9/29.
 */
var Roles = require('./role');

var state = {
    init: 1,
    send: 10
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.init, '请求中'), _defineProperty(_STRING, state.send, '已发送'), _STRING);

    return STRING[s];
};

var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, _defineProperty({}, state.init, [state.send]));

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix
};