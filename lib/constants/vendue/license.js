"use strict";

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = Object.assign({}, {
    noInsurance: 1,
    rewardBenifit: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, type.noInsurance, "免保"), _defineProperty(_STRINGS_OF_ORIGINS, type.rewardBenifit, "佣金优惠"), _STRINGS_OF_ORIGINS);

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type: type,
    decodeType: decodeType
};