'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var transferState = {
    yqj: 1,
    dqj: 2,
    tdywc: 3,
    yth: 4,
    yzf: 5,
    dfl: 6,
    tddcksh: 7,
    dzdjh: 8,
    dqhcl: 9
};
var decodeTransferState = function decodeTransferState(ts) {
    var _TS;

    var TS = (_TS = {}, _defineProperty(_TS, transferState.yqj, '已取件'), _defineProperty(_TS, transferState.dqj, '待取件'), _defineProperty(_TS, transferState.tdywc, '退单已完成'), _defineProperty(_TS, transferState.yth, '已退货'), _defineProperty(_TS, transferState.yzf, '已作废'), _defineProperty(_TS, transferState.dfl, '待发料'), _defineProperty(_TS, transferState.tddcksh, '退单待仓库审核'), _defineProperty(_TS, transferState.dzdjh, '定做待缴回'), _defineProperty(_TS, transferState.dqhcl, '待缺货处理'), _TS);
    return TS[ts];
};

var getMethod = {
    helpYourself: 1,
    express: 2
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _GM;

    var GM = (_GM = {}, _defineProperty(_GM, getMethod.helpYourself, '顾客自取'), _defineProperty(_GM, getMethod.express, '快递'), _GM);

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
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    getMethod: getMethod,
    decodeGetMethod: decodeGetMethod
};