'use strict';

var pick = require('lodash/pick');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeState = _require.decodeState,
    decodeAction = _require.decodeAction,
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid']);

var action = pick(commonAction, ['payPartially', 'startToPay', 'stopPaying']);

var STATE_TRAN_MATRIX = pick(TRANSPORT_STATE_TRANS_MATRIX, Object.keys(action));

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};