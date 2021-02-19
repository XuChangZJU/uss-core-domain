/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STRING_OF_STATES;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    init: 0,
    done: 201
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, (0, _defineProperty3.default)(_STRING_OF_STATES, state.init, "初始化"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.done, "补偿完成"), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};