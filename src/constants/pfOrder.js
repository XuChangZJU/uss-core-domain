const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    TRANSPORT_STATE_TRANS_MATRIX,
 } = require('./action');

const state = pick(commonState, [
    'init',
    'unpaid',
    'legal',
    'legal2',
    'abandoned',
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
    'confirmToPay',
    'cancel',
    'pay',
    'expire',
    'makePaid',
    'complete',
    'makeAbandoned',
    'payPartially',
    'startToPay',
    'stopPaying',
    'refund',
    'refundSuccess',
    'refundPartially',
]);

const STATE_TRAN_MATRIX = pick(TRANSPORT_STATE_TRANS_MATRIX, Object.keys(action));

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRAN_MATRIX,
};
