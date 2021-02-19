'use strict';

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    refunding: 10001,
    refunded: 10201,
    cancelled: 10899,
    abnormal: 11001
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.refunding, "退款中"), (0, _defineProperty3.default)(_TEXT, state.refunded, "退款完成"), (0, _defineProperty3.default)(_TEXT, state.cancelled, "已取消"), (0, _defineProperty3.default)(_TEXT, state.abnormal, "退款异常"), _TEXT);

    return TEXT[s];
};

var action = {
    refundSuccess: 10201,
    refundManually: 10202,
    refundFailure: 11001,
    cancel: 10899
};

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, action.refundSuccess, '退款成功'), (0, _defineProperty3.default)(_TEXT2, action.refundFailure, '退款失败'), (0, _defineProperty3.default)(_TEXT2, action.refundManually, '手动退款完成'), (0, _defineProperty3.default)(_TEXT2, action.cancel, '退款异常'), _TEXT2);

    return TEXT[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.refundSuccess, [state.refunding, state.refunded]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.refundFailure, [state.refunding, state.abnormal]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.cancel, [state.refunding, state.cancelled]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.refundManually, [state.abnormal, state.refunded]), _STATE_TRANS_MATRIX);

var channel = {
    // 微信电商收付通部分
    original: 1,
    balance: 2,
    otherBalance: 3,
    otherBankCard: 4
};

var decodeChannel = function decodeChannel(c) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, (0, _defineProperty3.default)(_TEXT3, channel.original, '原路退回'), (0, _defineProperty3.default)(_TEXT3, channel.balance, '退到余额'), (0, _defineProperty3.default)(_TEXT3, channel.otherBalance, '退到其他余额帐户'), (0, _defineProperty3.default)(_TEXT3, channel.otherBankCard, '退到其他银行帐户'), _TEXT3);

    return TEXT[c];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,

    channel: channel,
    decodeChannel: decodeChannel
};