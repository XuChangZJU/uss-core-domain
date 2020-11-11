'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var type = {
    'in': 1,
    'out': 2
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.in, '入账'), _defineProperty(_T, type.out, '出账'), _T);
    return T[t];
};
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};