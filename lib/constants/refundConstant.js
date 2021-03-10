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
    refunding2: 98,
    refunding: 99,
    refunded: 201,
    uncertain: 899,
    failed: 999,
    unexisted: 1099 // 这个是为了统一化处理外部返回结果
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, (0, _defineProperty3.default)(_STRING_OF_STATES, state.init, "初始化"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.refunding, "退款中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.refunding2, "渠道退款中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.refunded, "退款完成"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.uncertain, "未知"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.failed, "退款失败"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.unexisted, '退款不存在'), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};