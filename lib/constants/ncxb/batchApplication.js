'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.init, '初始'), (0, _defineProperty3.default)(_STRING, state.unpaid, '待支付'), (0, _defineProperty3.default)(_STRING, state.legal, '已支付'), (0, _defineProperty3.default)(_STRING, state.ready, '生产中'), (0, _defineProperty3.default)(_STRING, state.end, '已完成'), (0, _defineProperty3.default)(_STRING, state.expired, '已过期'), (0, _defineProperty3.default)(_STRING, state.reserved, '后台生成'), _STRING);

    return STRING[s];
};

var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.LOGGEDIN, (0, _defineProperty3.default)({}, state.init, [state.unpaid])), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, state.init, [state.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.unpaid, [state.legal, state.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.legal, [state.ready]), (0, _defineProperty3.default)(_Roles$ROOT$name, state.ready, [state.end]), _Roles$ROOT$name)), _StateTransformMatrix);

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix
};