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

var omit = require('lodash/omit');
var state = (0, _assign2.default)({}, commonState, {
    online: 501,
    offline: 511
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.online, '使用中'), (0, _defineProperty3.default)(_S, state.offline, '已停用'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    enable: 501,
    disable: 511
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.enable, '启用'), (0, _defineProperty3.default)(_S2, action.disable, '禁用'), _S2);

    return S[a] || decodeCommonAction(a);
};
var relation = omit((0, _assign2.default)({}, commonRelation, {
    worker: 401,
    auctioneer: 402,
    stockKeeper: 403,
    settler: 404,
    stuff: 405,
    freeGranter: 406
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.worker, '员工'), (0, _defineProperty3.default)(_R, relation.auctioneer, '拍卖师'), (0, _defineProperty3.default)(_R, relation.stockKeeper, '库管员'), (0, _defineProperty3.default)(_R, relation.settler, '结算员'), (0, _defineProperty3.default)(_R, relation.stuff, '业务员'), (0, _defineProperty3.default)(_R, relation.freeGranter, '免保授权人'), _R);
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.enable, [state.offline, state.online]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};