const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
    transportState,
    transportAction,
    decodeTransportState,
    decodeTransportAction,
    TRANSPORT_STATE_TRANS_MATRIX,
    COMMON_STATE_TRAN_MATRIX,
} = require('../action');

const action = Object.assign({}, commonAction, transportAction);
const decodeAction = (a) => {
    return decodeTransportAction(a) || decodeCommonAction(a);
}

const state = Object.assign({}, commonState, transportState);

const decodeState = (s) => {
    return decodeTransportState(s) || decodeCommonState(s);
}

const STATE_TRANS_MATRIX = Object.assign(
    {}, TRANSPORT_STATE_TRANS_MATRIX, COMMON_STATE_TRAN_MATRIX,
)

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
}