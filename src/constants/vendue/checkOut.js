const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    transportAction,
    decodeTransportAction,
    decodeTransportState: decodeCommonTransportState,
    transportState: commonTransportState,
    state,
    decodeState,
    relation,
    decodeRelation,
    COMMON_STATE_TRAN_MATRIX,
    TRANSPORT_STATE_TRANS_MATRIX,
} = require('../action');

const action = Object.assign({
    takeAway: 32000,
}, commonAction, transportAction);
const decodeAction = (a) => {
    const DICT = {
        [action.takeAway]: '顾客自提',
    };
    return DICT[a] || decodeCommonAction(a) || decodeTransportAction(a);
};

const transportState = Object.assign({}, commonTransportState, {
    shipping: 20001,
    unpicked: 20010,
    picked: 20100,
});

const decodeTransportState = (ts) => {
    const DICT = {
        [transportState.shipping]: '暂存中',
        [transportState.unpicked]: '待提货',
        [transportAction.picked]: '已提货',
    };
    return DICT[ts] || decodeCommonTransportState(ts);
};

const STATE_TRAN_MATRIX = Object.assign(
    {
        [transportAction.taPrepare]: [transportState.shipping, transportState.tsInPreparing],
        [transportAction.taCancel]: [transportState.tsInPreparing, transportState.shipping],
        [action.takeAway]: [transportState.unpicked, transportState.picked],
    }, COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX);

const getActionStateAttr = (action) => {
    if (action > 30000) {
        return 'transportState';
    }
    return 'state';
};

const getMethod = {
    express: 1,
    bySelf: 2,
};

const decodeGetMethod = (gm) => {
    const S = {
        [getMethod.express]: '快递',
        [getMethod.bySelf]: '自提',
    };

    return S[gm];
};

module.exports = {
    getActionStateAttr,
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    transportState,
    decodeTransportState,
    STATE_TRAN_MATRIX,

    getMethod,
    decodeGetMethod,
};
