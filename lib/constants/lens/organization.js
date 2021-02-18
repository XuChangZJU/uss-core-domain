'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STRINGS_OF_ORIGINS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var omit = require('lodash/omit');

var _require2 = require('./common'),
    commonAction = _require2.action,
    decodeCommonAction = _require2.decodeAction,
    state = _require2.state,
    decodeState = _require2.decodeState,
    COMMON_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var action = (0, _assign2.default)({}, commonAction, {
    eternaliseQrCode: 2001,
    bind: 1001
});

var category = (0, _assign2.default)({}, {
    hospital: 1,
    clinic: 2,
    shop: 3,
    others: 4
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.hospital, "医院"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.clinic, "诊所"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.shop, '门店'), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.others, '其他'), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, action.bind, '绑定'), (0, _defineProperty3.default)(_TEXT, action.eternaliseQrCode, '二维码变为永久'), _TEXT);
    return TEXT[a] || decodeCommonAction(a);
};

var relation = omit((0, _assign2.default)({}, commonRelation, {
    doctor: 401,
    keeper: 501
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, relation.doctor, '医生'), (0, _defineProperty3.default)(_S, relation.keeper, '店长'), _S);

    return S[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRANS_MATRIX, (0, _defineProperty3.default)({}, action.bind, [state.init, state.online]));

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