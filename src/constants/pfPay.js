const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    TRANSPORT_STATE_TRANS_MATRIX,
 } = require('./action');

const state = pick(commonState, [
    'unpaid',
    'legal',
    'paying',
    'partialPaid',
]);

const action = pick(commonAction, [
    'payPartially',
    'startToPay',
    'stopPaying',
]);

const STATE_TRAN_MATRIX = pick(TRANSPORT_STATE_TRANS_MATRIX, Object.keys(action));

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRAN_MATRIX,
};
