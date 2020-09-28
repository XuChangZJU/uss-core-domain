'use strict';

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var _require2 = require('./common'),
    commonAction = _require2.action,
    decodeCommonAction = _require2.decodeAction,
    state = _require2.state,
    decodeState = _require2.decodeState,
    COMMON_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var action = Object.assign({}, commonAction, {
    eternaliseQrCode: 2001,
    bind: 1001
});

var category = Object.assign({}, {
    hospital: 1,
    clinic: 2,
    shop: 3,
    others: 4
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, category.hospital, "医院"), _defineProperty(_STRINGS_OF_ORIGINS, category.clinic, "诊所"), _defineProperty(_STRINGS_OF_ORIGINS, category.shop, '门店'), _defineProperty(_STRINGS_OF_ORIGINS, category.others, '其他'), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, action.bind, '绑定'), _defineProperty(_TEXT, action.eternaliseQrCode, '二维码变为永久'), _TEXT);
    return TEXT[a] || decodeCommonAction(a);
};

var relation = Object.assign({}, commonRelation, {
    // worker: 301,
    doctor: 401
});

var decodeRelation = function decodeRelation(r) {
    var S = _defineProperty({}, relation.doctor, '医生');

    return S[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = Object.assign({}, COMMON_STATE_TRANS_MATRIX, _defineProperty({}, action.bind, [state.init, state.online]));

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};