'use strict';

var pick = require('lodash/pick');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeState = _require.decodeState,
    decodeAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid', 'refunding', 'refunded', 'partialRefunded', 'refundCancel', 'refundCancelPartially', 'expired', 'completed']);

var action = pick(commonAction, ['cancel', 'pay', 'expire', 'complete', 'payPartially', 'startToPay', 'stopPaying', 'refund', 'refundSuccess', 'refundPartially']);

var STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, Object.values(action));

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};