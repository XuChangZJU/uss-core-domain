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
        // enter: 10002,
        // show: 10003,
        prepare: 10005,
        cancelPrepare: 10105,
        ship: 10006,
        cancelShip: 10106,
        receive: 10007,
        takeAway: 100008,
    }
);
const decodeAction = (a) => {
    const A = {
        // [action.enter]: '入库',
        [action.prepare]: '请求发货',
        [action.cancelPrepare]: '取消请求',
        [action.ship]: '发货',
        [action.cancelShip]: '取消发货',
        [action.receive]: '收货',
        [action.takeAway]: '顾客提走',
    };
    return A[a] || decodeCommonAction(a);
};

const transportState = {
    /* unrecieved: 10001,
    stored: 10002,
    inPreview: 10003, */
    keeping: 10004,
    preparing: 10005,
    shipped: 10006,
    received: 10007,
};

const decodeTransportState = (s) => {
    const S = {
        /* [transportState.unrecieved]: '未到库',
        [transportState.stored]: '库存',
        [transportState.inPreview]: '预展中', */
        [transportState.keeping]: '暂存中',
        [transportState.preparing]: '待发货', 
        [transportState.shipped]: '已发货',
        [transportState.received]: '已收货',
    };

    return S[s];
};
const STATE_TRAN_MATRIX = Object.assign(
    {}, COMMON_STATE_TRAN_MATRIX, {
        [action.prepare]: [transportState.keeping, transportState.preparing],
        [action.cancelPrepare]: [transportState.preparing, transportState.keeping],
        [action.ship]: [transportState.preparing, transportState.shipped],
        [action.cancelShip]: [transportState.shipped, transportState.preparing],
        [action.receive]: [transportState.shipped, transportState.received],
        [action.takeAway]: [transportState.keeping, transportState.received],
    }
);
const getActionStateAttr = (action) => {
    if (action > 20000) {
        return 'billState';
    }
    if (action > 10000) {
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
