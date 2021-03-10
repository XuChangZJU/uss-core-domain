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
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401,
    pausing: 410
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.ready, '预展中'), (0, _defineProperty3.default)(_S, state.ongoing, '进行中'), (0, _defineProperty3.default)(_S, state.finished, '已结束'), (0, _defineProperty3.default)(_S, state.pausing, '暂停中'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601,
    pause: 610
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.start, '开始'), (0, _defineProperty3.default)(_S2, action.finish, '结束'), (0, _defineProperty3.default)(_S2, action.pause, '暂停'), _S2);

    return S[a] || decodeCommonAction(a);
};

var relation = omit((0, _assign2.default)({}, commonRelation, {
    worker: 301,
    auctioneer: 302
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.worker, '员工'), (0, _defineProperty3.default)(_R, relation.auctioneer, '拍卖师'), _R);
    return R[r] || decodeCommonRelation(r);
};
var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.start, [[state.ready, state.pausing], state.ongoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.finish, [[state.ready, state.ongoing, state.pausing], state.finished]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.pause, [state.ongoing, state.pausing]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};