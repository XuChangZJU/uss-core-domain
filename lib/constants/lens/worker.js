'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var state = {
    active: 301,
    inactive: 401
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.active, '生效中'), _defineProperty(_S, state.inactive, '已完成'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    complete: 310
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.complete, '完成');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.complete, [state.active, state.inactive]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction
};