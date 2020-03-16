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
    STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var action = Object.assign({}, commonAction, {
    transfer: 601
});

var decodeAction = function decodeAction(a) {
    var TEXT = _defineProperty({}, action.transfer, '转让');

    return TEXT[a] || decodeCommonAction(a);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};