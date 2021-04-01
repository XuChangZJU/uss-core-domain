'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _AUTH_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeState = _require.decodeState,
    decodeAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid', 'refunding', 'refunded', 'partialRefunded', 'cancelled', 'expired', 'completed']);

var action = pick(commonAction, ['cancel', 'pay', 'expire', 'complete', 'payPartially', 'startToPay', 'refund', 'refundSuccess', 'refundPartially']);

var STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, (0, _values2.default)(action));

var AUTH_MATRIX = (_AUTH_MATRIX = {}, (0, _defineProperty3.default)(_AUTH_MATRIX, action.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.pay, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.cancel, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.expire, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.complete, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.payPartially, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.startToPay, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refund, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refundSuccess, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.refundPartially, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), _AUTH_MATRIX);

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,
    AUTH_MATRIX: AUTH_MATRIX
};