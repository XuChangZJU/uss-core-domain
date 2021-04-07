'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    online: 201,
    offline: 202
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.online, '使用中'), (0, _defineProperty3.default)(_S, state.offline, '已停用'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    enable: 1101,
    disable: 1102
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.enable, '启用'), (0, _defineProperty3.default)(_A, action.disable, '禁用'), _A);
    return A[a] || decodeCommonAction(a);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    // owner
    service: 101,
    preSaleService: 102,
    postSaleService: 103,
    technician: 104
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.service, '客服'), (0, _defineProperty3.default)(_R, relation.preSaleService, '售前客服'), (0, _defineProperty3.default)(_R, relation.postSaleService, '售后客服'), (0, _defineProperty3.default)(_R, relation.technician, '技术人员'), _R);
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.enable, [state.offline, state.online]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRANS_MATRIX);
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};