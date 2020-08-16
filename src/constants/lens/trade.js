const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
} = require('../action');

const transportState = {
    dfl: 10001,
    dzdjh: 10002,
    dqhcl: 10003,
    dqj: 10004,
    yqj: 10005,
    tdywc: 10006,
    yth: 10007,
    yzf: 10008,
    tddcksh: 10009,
};

const getActionStateAttr = (action) => {
    if (action > 10000) {
        return 'transportState';
    }

    return state;
};

const decodeTransportState = (ts) => {
    const TS = {
        [transportState.dfl]: '待发料',
        [transportState.dzdjh]: '定做待缴回',
        [transportState.dqhcl]: '待缺货处理',
        [transportState.dqj]: '待取件',
        [transportState.yqj]: '已取件',
        [transportState.tdywc]: '退单已完成',
        [transportState.yth]: '已退货',
        [transportState.yzf]: '已作废',
        [transportState.tddcksh]: '退单待仓库审核',
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
    getAndSendMessage: 1004
});

const decodeAction = (a) => {
    const S = {
        // [action.confirmArriveAtShop]: '确认到店',
        [action.confirmGet]: '确认收货',
        [action.send]: '发快递',
        // [action.getAndSendMessage]: '确认取走并发推送'
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    // [action.confirmArriveAtShop]: [[transportState.dfl, transportState.dzdjh, transportState.dqhcl], transportState.dqj],
    [action.confirmGet]: [[transportState.dfl, transportState.dzdjh, transportState.dqhcl, transportState.dqj], transportState.yqj],
    [action.send]: [[transportState.dfl, transportState.dzdjh, transportState.dqhcl], transportState.dqj],
};
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    getMethod,
    decodeGetMethod,
    transportState,
    decodeTransportState,
    getActionStateAttr,
    STATE_TRAN_MATRIX,
};