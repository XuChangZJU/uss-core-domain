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

var state = object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.preparing, '准备中'), _defineProperty(_S, state.ready, '就绪'), _defineProperty(_S, state.ongoing, '进行中'), _defineProperty(_S, state.finished, '已结束'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.ready, '就绪'), _defineProperty(_S2, action.start, '开始'), _defineProperty(_S2, action.finish, '结束'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.ready, [state.preparing, state.ready]), _defineProperty(_STATE_TRAN_MATRIX, action.start, [state.ready, state.ongoing]), _defineProperty(_STATE_TRAN_MATRIX, action.finish, [state.ongoing, state.finished]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};