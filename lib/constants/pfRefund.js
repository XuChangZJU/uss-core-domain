'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX, _AUTH_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeCommonState = _require.decodeState,
    decodeCommonAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var _require2 = require('../constraints/action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth;

var state = assign(pick(commonState, ['create']), {
    refunding: 10001,
    refunded: 10201,
    cancelled: 10899,
    abnormal: 11001
});

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.refunding, "退款中"), (0, _defineProperty3.default)(_TEXT, state.refunded, "退款完成"), (0, _defineProperty3.default)(_TEXT, state.cancelled, "已取消"), (0, _defineProperty3.default)(_TEXT, state.abnormal, "退款异常"), _TEXT);

    return TEXT[s] || decodeCommonState(s);
};

var action = assign(pick(commonState, ['create']), {
    refundSuccess: 10201,
    refundManually: 10202,
    refundFailure: 11001,
    cancel: 10899
});

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, action.refundSuccess, '退款成功'), (0, _defineProperty3.default)(_TEXT2, action.refundFailure, '退款失败'), (0, _defineProperty3.default)(_TEXT2, action.refundManually, '手动退款完成'), (0, _defineProperty3.default)(_TEXT2, action.cancel, '退款异常'), _TEXT2);

    return TEXT[a] || decodeCommonAction(a);
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

var AUTH_MATRIX = (_AUTH_MATRIX = {}, (0, _defineProperty3.default)(_AUTH_MATRIX, action.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refundSuccess, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.cancel, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refundManually, { // 这个目前应该没用
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refundFailure, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), _AUTH_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,
    AUTH_MATRIX: AUTH_MATRIX,

    channel: channel,
    decodeChannel: decodeChannel
};