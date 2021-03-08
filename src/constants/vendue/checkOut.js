const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    COMMON_STATE_TRAN_MATRIX,
} = require('../action');

const action = Object.assign(
    {}, commonAction, {
        send: 10002,
    }
)
const decodeAction = (a) => {
    const A = {
        [action.send]: '发货',
    };
    return A[a] || decodeCommonAction(a);
};

const transportState = {
    unsettled: 10001,
    inPreparing: 10002,
    shipped: 10003,
};

const decodeTransportState = (s) => {
    const S = {
        [transportState.unsettled]: '未结算',
        [transportState.inPreparing]: '未发货',
        [transportState.shipped]: '已发货',
    };

    return S[s];
};
const STATE_TRAN_MATRIX = Object.assign(
    {}, COMMON_STATE_TRAN_MATRIX, {
        [action.send]: [transportState.inPreparing, transportState.shipped],
    }
)
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    transportState,
    decodeTransportState,
    STATE_TRAN_MATRIX,
};
