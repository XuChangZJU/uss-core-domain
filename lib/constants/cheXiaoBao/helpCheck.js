'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/6/27.
 */
var state = {
    unpaid: 10, // 未支持
    paid: 20, // 已支付
    arrived: 30, // 已到达
    inServe: 50, // 开始年检
    end: 400, // 年检完成

    cancelled2: 1003, // 支付后放弃
    over2: 1005, // 支付后放弃并已结清
    cancelled1: 1010, // 未支付放弃

    init: 10000, // 初始
    expired: 10001 // 未支付超时

};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.unpaid, '未支付'), (0, _defineProperty3.default)(_STRINGS, state.paid, '已支付'), (0, _defineProperty3.default)(_STRINGS, state.inServe, '年检中'), (0, _defineProperty3.default)(_STRINGS, state.arrived, '已到达'), (0, _defineProperty3.default)(_STRINGS, state.end, '已完成'), (0, _defineProperty3.default)(_STRINGS, state.cancelled2, '待退款'), (0, _defineProperty3.default)(_STRINGS, state.over2, '已退款'), (0, _defineProperty3.default)(_STRINGS, state.cancelled1, '已取消'), (0, _defineProperty3.default)(_STRINGS, state.init, '初始'), (0, _defineProperty3.default)(_STRINGS, state.expired, '已超时'), _STRINGS);

    return STRINGS[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};