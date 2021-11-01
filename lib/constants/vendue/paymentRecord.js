'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    'out': 2,
    'internal': 3,
    'others': 4
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.in, '入账'), (0, _defineProperty3.default)(_T, type.out, '出账'), (0, _defineProperty3.default)(_T, type.internal, '抵扣'), (0, _defineProperty3.default)(_T, type.others, '其他'), _T);
    return T[t];
};

var property = {
    'settlement': 1,
    'record': 2
};

var decodeProperty = function decodeProperty(p) {
    var _P;

    var P = (_P = {}, (0, _defineProperty3.default)(_P, property.settlement, '款项'), (0, _defineProperty3.default)(_P, property.record, '记录'), _P);
    return T[t];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    property: property,
    decodeProperty: decodeProperty,
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};