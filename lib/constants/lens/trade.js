'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var transportState = {
    dfl: 10001,
    dzdjh: 10002,
    dqhcl: 10003,
    dqj: 10004,
    yqj: 10005,
    tdywc: 10006,
    yth: 10007,
    yzf: 10008,
    tddcksh: 10009
};

var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 10000) {
        return 'transferState';
    }

    return state;
};

var decodeTransportState = function decodeTransportState(ts) {
    var _TS;

    var TS = (_TS = {}, _defineProperty(_TS, transportState.dfl, '待发料'), _defineProperty(_TS, transportState.dzdjh, '定做待缴回'), _defineProperty(_TS, transportState.dqhcl, '待缺货处理'), _defineProperty(_TS, transportState.dqj, '待取件'), _defineProperty(_TS, transportState.yqj, '已取件'), _defineProperty(_TS, transportState.tdywc, '退单已完成'), _defineProperty(_TS, transportState.yth, '已退货'), _defineProperty(_TS, transportState.yzf, '已作废'), _defineProperty(_TS, transportState.tddcksh, '退单待仓库审核'), _TS);
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
    decodeGetMethod: decodeGetMethod,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    getActionStateAttr: getActionStateAttr
};