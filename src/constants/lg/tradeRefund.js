
const {
    action,
    decodeAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign(
    {}, commonState,
    {
        waitingForAccept: 301,
    }
)

const decodeState = (s) => {
    const S = {
        [state.waitingForAccept]: '待商家确认退款'
    }
    return decodeCommonState(s) || S[s];
}

const STATE_TRANS_MATRIX = {
    [action.refund]: [state.waitingForAccept, state.refunding],
    [action.cancel]: [state.waitingForAccept, state.cancelled],
}
module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};


