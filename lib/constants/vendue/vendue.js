"use strict";

var _STRINGS_OF_ORIGINS, _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401
    // pausing: 410,
    // aborted: 411,
});
var category = Object.assign({}, {
    synchronous: 1,
    delayed: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, category.synchronous, "同步拍"), _defineProperty(_STRINGS_OF_ORIGINS, category.delayed, "延时拍"), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.preparing, '准备中'), _defineProperty(_S, state.ready, '预展中'), _defineProperty(_S, state.ongoing, '进行中'), _defineProperty(_S, state.finished, '已结束'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601
    // pause: 610,
    // stop: 611,
});
var relation = Object.assign({}, commonRelation, {
    guardian: 101,
    worker: 102,
    administrator: 110
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, _defineProperty(_R, relation.guardian, '守护者'), _defineProperty(_R, relation.worker, '员工'), _defineProperty(_R, relation.administrator, '管理员'), _R);
    return R[r] || decodeCommonRelation(r);
};
var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.ready, '发布'), _defineProperty(_S2, action.start, '开始'), _defineProperty(_S2, action.finish, '结束'), _S2);

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
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,
    category: category,
    decodeCategory: decodeCategory
};