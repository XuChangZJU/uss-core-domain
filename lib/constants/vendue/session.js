'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var omit = require('lodash/omit');
var state = Object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401,
    pausing: 410
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.ready, '预展中'), _defineProperty(_S, state.ongoing, '进行中'), _defineProperty(_S, state.finished, '已结束'), _defineProperty(_S, state.pausing, '暂停中'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601,
    pause: 610
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.start, '开始'), _defineProperty(_S2, action.finish, '结束'), _defineProperty(_S2, action.pause, '暂停'), _S2);

    return S[a] || decodeCommonAction(a);
};

var relation = omit(Object.assign({}, commonRelation, {
    worker: 301,
    auctioneer: 302
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, _defineProperty(_R, relation.worker, '员工'), _defineProperty(_R, relation.auctioneer, '拍卖师'), _R);
    return R[r] || decodeCommonRelation(r);
};
var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.start, [[state.ready, state.pausing], state.ongoing]), _defineProperty(_STATE_TRAN_MATRIX, action.finish, [[state.ready, state.ongoing, state.pausing], state.finished]), _defineProperty(_STATE_TRAN_MATRIX, action.pause, [state.ongoing, state.pausing]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};