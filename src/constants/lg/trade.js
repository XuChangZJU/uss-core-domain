
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    decodeTransportAction,
    TRANSPORT_STATE_TRANS_MATRIX,
    transportAction: commonTransportAction,
    transportState: commonTransportState,
    decodeTransportState: decodeCommonTransportState,
    COMMON_STATE_TRAN_MATRIX,
} = require('../action');

const transportState = Object.assign(
    {}, commonTransportState, {
        unsend: 10001,
        arrived: 10003,
    }
);
const decodeTransportState = (ts) => {
    const TEXT = {
        [transportState.unsend]: '待取货',
        [transportState.arrived]: '已取货',
    };
    return TEXT[ts] || decodeCommonTransportState(ts);
};
const action = Object.assign({}, commonAction,
    commonTransportAction, {
        tradeSend: 10011,
        tradeAccept: 10021,
        tradeReject: 10022,
        tradeAbort: 10101,


        confirmArrive: 31000,
    }
);

const decodeAction = (a) => {
    const TEXT = {
        [action.confirmArrive]: '确认提货',
    };

    return TEXT[a] || decodeCommonAction(a) || decodeTransportAction(a);
};


const STATE_TRANS_MATRIX = Object.assign(
    {}, COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX, {
        [action.confirmArrive]: [transportState.unsend, transportState.arrived],
    }
);

const getMethod = {
    helpYourself: 1,
    express: 2,
};

const decodeGetMethod = (gm) => {
    const GM = {
        [getMethod.helpYourself]: '顾客自取',
        [getMethod.express]: '快递',
    };

    return GM[gm];
};

module.exports = {
    transportState,
    decodeTransportState,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
    getMethod,
    decodeGetMethod,
};

