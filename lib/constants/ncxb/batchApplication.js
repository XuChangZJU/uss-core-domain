'use strict';

var _Roles$ROOT$name, _StateTransformMatrix;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/10/21.
 */
var assert = require('assert');
var assign = require('lodash/assign');
var Roles = require('./role');

var _require = require('../action'),
    CommonState = _require.state;

var state = assign({
    // init
    // unpaid
    // legal
    ready: 10001,
    end: 10101,
    reserved: 11001
}, CommonState);

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.init, '初始'), _defineProperty(_STRING, state.unpaid, '待支付'), _defineProperty(_STRING, state.legal, '已支付'), _defineProperty(_STRING, state.ready, '生产中'), _defineProperty(_STRING, state.end, '已完成'), _defineProperty(_STRING, state.expired, '已过期'), _defineProperty(_STRING, state.reserved, '后台生成'), _STRING);

    return STRING[s];
};

var StateTransformMatrix = (_StateTransformMatrix = {}, _defineProperty(_StateTransformMatrix, Roles.LOGGEDIN, _defineProperty({}, state.init, [state.unpaid])), _defineProperty(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, state.init, [state.expired]), _defineProperty(_Roles$ROOT$name, state.unpaid, [state.legal, state.expired]), _defineProperty(_Roles$ROOT$name, state.legal, [state.ready]), _defineProperty(_Roles$ROOT$name, state.ready, [state.end]), _Roles$ROOT$name)), _StateTransformMatrix);

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix
};