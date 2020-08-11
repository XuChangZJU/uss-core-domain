const {
    action,
    decodeAction,
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
        return 'transferState';
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
};

const decodeGetMethod = (gm) => {
    const GM = {
        [getMethod.helpYourself]: '顾客自取',
        [getMethod.express]: '快递',
    };

    return GM[gm];
};



//
// const action = Object.assign({}, commonAction, {
//     solve: 301,
//     resubmit: 401,
//     finish: 501,
// });
//
// const decodeAction = (a) => {
//     const S = {
//         [action.solve]: '处理',
//         [action.resubmit]: '重新提交',
//         [action.finish]: '完成',
//     };
//
//     return S[a] || decodeCommonAction(a);
// };
//
// const STATE_TRAN_MATRIX = {
//     [action.solve]: [state.pending, state.solved],
//     [action.resubmit]: [state.solved, state.pending],
//     [action.finish]: [state.solved, state.finished],
// };
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
};