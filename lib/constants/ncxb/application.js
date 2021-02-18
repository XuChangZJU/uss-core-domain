'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.init, '请求中'), (0, _defineProperty3.default)(_STRING, state.send, '已发送'), _STRING);

    return STRING[s];
};

var StateTransformMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, (0, _defineProperty3.default)({}, state.init, [state.send]));

module.exports = {
    state: state,
    decodeState: decodeState,
    StateTransformMatrix: StateTransformMatrix
};