
/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

const type = {
	idCard: 1,
	passport: 2,
	hkCard: 3,
	amCard: 4,
	twCard: 4,
	birth: 5,
	soldier: 6,
};


const STRINGS_OF_ORIGINS = {
	[type.idCard]: "身份证",
	[type.passport]: "护照",
	[type.hkCard]: "香港居民回乡证",
	[type.amCard]: "澳门居民回乡证",
	[type.twCard]: "台湾居民回乡证",
	[type.birth]: "出生证",
	[type.soldier]: "军人证",
};

function decodeType(o) {
	return STRINGS_OF_ORIGINS[o];
}

module.exports = {
	type,
	decodeType,
};
