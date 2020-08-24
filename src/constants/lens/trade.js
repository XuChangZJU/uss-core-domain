const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    relation,
    decodeRelation
} = require('../action');

const transportState = {
    wdd: 10003,
    dqj: 10004,
    yqj: 10005,
    yfh: 10010,
};

const getActionStateAttr = (action) => {
    if (action > 10000) {
        return 'transportState';
    }

    return state;
};

const decodeTransportState = (ts) => {
    const TS = {
        [transportState.wdd]: '未到店',
        [transportState.dqj]: '待取件（到店）',
        [transportState.yfh]: '已发货',        // 快递已发出
        [transportState.yqj]: '已取件',
    };
    return TS[ts];
};

const getMethod = {
    helpYourself: 1,
    express: 2,
    atOnce: 3,
};

const decodeGetMethod = (gm) => {
    const GM = {
        [getMethod.helpYourself]: '顾客自取',
        [getMethod.express]: '快递',
        [getMethod.atOnce]: '当场立取',
    };

    return GM[gm];
};




const action = Object.assign({}, commonAction, {
    confirmArriveAtShop: 10001,
    confirmGet: 10002,
    send: 10003,
    confirmPick: 10004,
    updateFeedback: 9000,
    // getAndSendMessage: 1004
});

const decodeAction = (a) => {
    const S = {
        [action.confirmArriveAtShop]: '确认到店',
        [action.confirmGet]: '确认收货',
        [action.send]: '发快递',
        [action.updateFeedback]: '更新评价',
        [action.confirmPick]: '确认取货',
        // [action.getAndSendMessage]: '确认取走并发推送'
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.confirmArriveAtShop]: [transportState.wdd, transportState.dqj],
    [action.confirmGet]: [transportState.yfh, transportState.yqj],
    [action.confirmPick]:  [transportState.dqj, transportState.yqj],
    [action.send]: [transportState.wdd, transportState.yfh],
};
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    getMethod,
    decodeGetMethod,
    transportState,
    decodeTransportState,
    getActionStateAttr,
    STATE_TRAN_MATRIX,
};