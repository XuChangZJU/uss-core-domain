
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
} = require('../action');

const transportState = {
    unsend: 10001,
    sending: 10002,
    arrived: 10003,
};
const decodeTransportState = (a) => {
    const TEXT = {
        [transportState.unsend]: '未发货',
        [transportState.sending]: '待收货',
        [transportState.arrived]: '已收货',
    };

    return TEXT[a] || decodeCommonAction(a);
};
const action = Object.assign({}, commonAction,
    {
        sendExpress: 10001,
        confirmArrive: 10002,
    }
);

const decodeAction = (a) => {
    const TEXT = {
        [action.sendExpress]: '发快递',
        [action.confirmArrive]: '确认收货',
    };

    return TEXT[a] || decodeCommonAction(a);
};


const STATE_TRANS_MATRIX = {
    [action.send]: [transportState.unsend, transportState.sending],
    [action.confirmArrive]: [transportState.sending, transportState.arrived],
};

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

