'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var _require2 = require('./common'),
    commonAction = _require2.action,
    decodeCommonAction = _require2.decodeAction,
    state = _require2.state,
    decodeState = _require2.decodeState,
    COMMON_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var action = Object.assign({}, commonAction, {
    bind: 1001
});

var decodeAction = function decodeAction(a) {
    var TEXT = _defineProperty({}, action.bind, '绑定');
    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = Object.assign({}, COMMON_STATE_TRANS_MATRIX, _defineProperty({}, action.bind, [state.init, state.online]));

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};