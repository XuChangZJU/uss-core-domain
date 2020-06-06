'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    // preparing: 301,
    ready: 310,
    ongoing: 311,
    sold: 501,
    unsold: 511
    // pausing: 520,
    // cancelled: 610,
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.ready, '就绪'), _defineProperty(_S, state.ongoing, '拍卖中'), _defineProperty(_S, state.sold, '成交'), _defineProperty(_S, state.unsold, '流拍'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    sold: 601,
    unsold: 610,
    resold: 611,
    pause: 620,
    cancel: 621
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.ready, '就绪'), _defineProperty(_S2, action.start, '开拍'), _defineProperty(_S2, action.sold, '成交'), _defineProperty(_S2, action.unsold, '流拍'), _defineProperty(_S2, action.pause, '暂停'), _defineProperty(_S2, action.cancel, '撤销'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.ready, [state.preparing, state.ready]), _defineProperty(_STATE_TRAN_MATRIX, action.start, [[state.ready, state.unsold, state.pausing], state.ongoing]), _defineProperty(_STATE_TRAN_MATRIX, action.sold, [state.ongoing, state.sold]), _defineProperty(_STATE_TRAN_MATRIX, action.unsold, [state.ongoing, state.unsold]), _defineProperty(_STATE_TRAN_MATRIX, action.pause, [state.ongoing, state.pausing]), _defineProperty(_STATE_TRAN_MATRIX, action.cancel, [[state.preparing, state.ready, state.ongoing, state.pausing], state.cancelled]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};