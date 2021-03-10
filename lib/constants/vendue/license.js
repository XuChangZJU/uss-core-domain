"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _STRINGS_OF_ORIGINS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var type = (0, _assign2.default)({}, {
    // noInsurance: 1,
    rewardBenifit: 2,
    depositBenifit: 1
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.rewardBenifit, "佣金优惠"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.depositBenifit, "保证金优惠"), _STRINGS_OF_ORIGINS);

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation
};