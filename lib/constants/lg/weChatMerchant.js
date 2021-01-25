'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    approved: 11,
    disabled: 21,
    fresh: 22
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.approved, '审核已通过'), _defineProperty(_TEXT, state.disabled, '禁用中'), _defineProperty(_TEXT, state.fresh, '未审核'), _TEXT);
    return TEXT[s];
};

var action = Object.assign({}, commonAction, {
    able: 401,
    disable: 501,
    approve: 601
});

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.able, '许用'), _defineProperty(_TEXT2, action.disable, '禁用'), _defineProperty(_TEXT2, action.approve, '通过审核'), _TEXT2);

    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.able, [state.disabled, state.approved]), _defineProperty(_STATE_TRANS_MATRIX, action.approve, [state.fresh, state.approved]), _defineProperty(_STATE_TRANS_MATRIX, action.disable, [state.approved, state.disabled]), _STATE_TRANS_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};