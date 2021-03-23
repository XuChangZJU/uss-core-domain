
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
    }
);
const decodeTransportState = (ts) => {
    const TEXT = {
    };
    return TEXT[ts] || decodeCommonTransportState(ts);
};
const action = Object.assign({}, commonAction,
    commonTransportAction,
);

const decodeAction = (a) => {
    const TEXT = {
        [action.sendExpress]: '发快递',
        [action.confirmArrive]: '确认提货',
    };

    return TEXT[a] || decodeCommonAction(a) || decodeTransportAction(a);
};


const STATE_TRANS_MATRIX = Object.assign(
    {}, COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX, {
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

