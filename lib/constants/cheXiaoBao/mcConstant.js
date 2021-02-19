/**
 * Created by Administrator on 2018/6/21.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    unpaid: 10, // 未支持
    paid: 20, // 已支付
    posted: 30, // 已投递（下了快递单）
    sending: 40, // 材料寄送中
    accepted: 100, // 已接收
    sendingBack: 110, // 已发回
    end: 400, // 接收完成

    cancelled2: 1003, // 支付后放弃
    over2: 1005, // 支付后放弃并已结清
    over3: 1007, // 失败已结算（暂时还未用上）
    cancelled1: 1010, // 未支付放弃

    init: 10000, // 初始
    expired: 10001 // 未支付超时

};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.unpaid, '未支付'), (0, _defineProperty3.default)(_STRINGS, state.paid, '已支付'), (0, _defineProperty3.default)(_STRINGS, state.posted, '已投递'), (0, _defineProperty3.default)(_STRINGS, state.sending, '寄送中'), (0, _defineProperty3.default)(_STRINGS, state.accepted, '检查中'), (0, _defineProperty3.default)(_STRINGS, state.sendingBack, '寄还中'), (0, _defineProperty3.default)(_STRINGS, state.end, '已完成'), (0, _defineProperty3.default)(_STRINGS, state.cancelled2, '待退款'), (0, _defineProperty3.default)(_STRINGS, state.over2, '已退款'), (0, _defineProperty3.default)(_STRINGS, state.over3, '已结束'), (0, _defineProperty3.default)(_STRINGS, state.cancelled1, '已取消'), (0, _defineProperty3.default)(_STRINGS, state.init, '初始'), (0, _defineProperty3.default)(_STRINGS, state.expired, '已超时'), _STRINGS);

    return STRINGS[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};