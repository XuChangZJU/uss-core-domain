
/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = {
	idCard: 1,
	passport: 2,
	hkCard: 3,
	amCard: 4,
	twCard: 4,
	birth: 5,
	soldier: 6
};

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, type.idCard, "身份证"), _defineProperty(_STRINGS_OF_ORIGINS, type.passport, "护照"), _defineProperty(_STRINGS_OF_ORIGINS, type.hkCard, "香港居民回乡证"), _defineProperty(_STRINGS_OF_ORIGINS, type.amCard, "澳门居民回乡证"), _defineProperty(_STRINGS_OF_ORIGINS, type.twCard, "台湾居民回乡证"), _defineProperty(_STRINGS_OF_ORIGINS, type.birth, "出生证"), _defineProperty(_STRINGS_OF_ORIGINS, type.soldier, "军人证"), _STRINGS_OF_ORIGINS);

function decodeType(o) {
	return STRINGS_OF_ORIGINS[o];
}

module.exports = {
	type: type,
	decodeType: decodeType
};