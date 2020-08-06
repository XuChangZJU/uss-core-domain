'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var type = {
    refund: 1,
    exchange: 2,
    fix: 3
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.refund, '退货'), _defineProperty(_T, type.exchange, '换货'), _defineProperty(_T, type.fix, '修理'), _T);

    return T[t];
};
var state = Object.assign({}, commonState, {
    pending: 301,
    solved: 401,
    finished: 501
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.pending, '待处理'), _defineProperty(_S, state.solved, '已处理'), _defineProperty(_S, state.finished, '已完成'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    solve: 301,
    resubmit: 401,
    finish: 501
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.solve, '处理'), _defineProperty(_S2, action.resubmit, '重新提交'), _defineProperty(_S2, action.finish, '完成'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.solve, [state.pending, state.solved]), _defineProperty(_STATE_TRAN_MATRIX, action.resubmit, [state.solved, state.pending]), _defineProperty(_STATE_TRAN_MATRIX, action.finish, [state.solved, state.finished]), _STATE_TRAN_MATRIX);
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};