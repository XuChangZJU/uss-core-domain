'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeState = _require.decodeState,
    decodeAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid', 'refunding', 'refunded', 'partialRefunded', 'refundCancel', 'refundCancelPartially', 'expired', 'completed']);

var action = pick(commonAction, ['cancel', 'pay', 'expire', 'complete', 'payPartially', 'startToPay', 'stopPaying', 'refund', 'refundSuccess', 'refundPartially']);

var STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, (0, _values2.default)(action));

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};