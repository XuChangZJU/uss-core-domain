'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    intelligentResponse: 501,
    inDialogue: 502,
    finished: 503
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.intelligentResponse, '智能回复中'), (0, _defineProperty3.default)(_S, state.inDialogue, '对话中'), (0, _defineProperty3.default)(_S, state.finished, '对话结束'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    toManualService: 1401,
    finish: 1402
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.toManualService, '转人工服务'), (0, _defineProperty3.default)(_A, action.finish, '结束'), _A);
    return A[a] || decodeCommonAction(a);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    customer: 401,
    service: 402
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.customer, '客户'), (0, _defineProperty3.default)(_R, relation.service, '客服'), _R);
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.toManualService, [state.intelligentResponse, state.inDialogue]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.finish, [state.inDialogue, state.finished]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeCommonRelation: decodeCommonRelation,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};