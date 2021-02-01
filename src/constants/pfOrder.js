const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    TRANSPORT_STATE_TRANS_MATRIX,
 } = require('./action');

const state = pick(commonState, [
    'legal',
    'cancelled',
    'paying',
    'partialPaid',
    'refunding',
    'refunded',
    'partialRefunded',
    'expired',
    'completed',
]);

const action = pick(commonAction, [
    'cancel',
    'pay',
    'expire',
    'complete',
    'payPartially',
    'stopPaying',
    'refund',
    'refundSuccess',
    'refundPartially',
]);

const STATE_TRANS_MATRIX = pick(TRANSPORT_STATE_TRANS_MATRIX, Object.keys(action));

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRANS_MATRIX,
};
