'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var type = {
    refund: 1,
    exchange: 2,
    fix: 3
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.refund, '退货'), (0, _defineProperty3.default)(_T, type.exchange, '换货'), (0, _defineProperty3.default)(_T, type.fix, '修理'), _T);

    return T[t];
};
var state = (0, _assign2.default)({}, commonState, {
    pending: 301,
    accepted: 401,
    refused: 410,
    finished: 501
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.pending, '待处理'), (0, _defineProperty3.default)(_S, state.accepted, '已同意'), (0, _defineProperty3.default)(_S, state.refused, '已拒绝'), (0, _defineProperty3.default)(_S, state.finished, '已完成'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    accept: 301,
    refuse: 310,
    resubmit: 401,
    reply: 501,
    finish: 510
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.accept, '同意'), (0, _defineProperty3.default)(_S2, action.refuse, '拒绝'), (0, _defineProperty3.default)(_S2, action.resubmit, '重新提交'), (0, _defineProperty3.default)(_S2, action.reply, '回复'), (0, _defineProperty3.default)(_S2, action.finish, '完成'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.accept, [state.pending, state.accepted]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.refuse, [state.pending, state.refused]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.resubmit, [state.refused, state.pending]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.finish, [state.accepted, state.finished]), _STATE_TRAN_MATRIX);
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    type: type,
    decodeType: decodeType,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};