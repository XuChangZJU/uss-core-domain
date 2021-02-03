const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    COMMON_STATE_TRAN_MATRIX,
 } = require('./action');

const state = pick(commonState, [
    'legal',
    'cancelled',
    'paying',
    'partialPaid',
    'refunding',
    'refunded',
    'partialRefunded',
    'refundCancel',
    'refundCancelPartially',
    'expired',
    'completed',
]);

const action = pick(commonAction, [
    'cancel',
    'pay',
    'expire',
    'complete',
    'payPartially',
    'startToPay',
    'stopPaying',
    'refund',
    'refundSuccess',
    'refundPartially',
]);

const STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, Object.values(action));

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRANS_MATRIX,
};
