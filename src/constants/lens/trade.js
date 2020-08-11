const {
    action,
    decodeAction,
    state,
    decodeState,
} = require('../action');

const transportState = {
    yqj: 1,
    dqj: 2,
    tdywc: 3,
    yth: 4,
    yzf: 5,
    dfl: 6,
    tddcksh: 7,
    dzdjh: 8,
    dqhcl: 9,
}
const decodeTransportState = (ts) => {
    const TS = {
        [transportState.yqj]: '已取件',
        [transportState.dqj]: '待取件',
        [transportState.tdywc]: '退单已完成',
        [transportState.yth]: '已退货',
        [transportState.yzf]: '已作废',
        [transportState.dfl]: '待发料',
        [transportState.tddcksh]: '退单待仓库审核',
        [transportState.dzdjh]: '定做待缴回',
        [transportState.dqhcl]: '待缺货处理',
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
};