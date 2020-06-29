
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

const cardStatus = {
	empty: 0,               // 未验证
	verifying1: 1,           // 验证中（程序正在验证）
	verifying2: 2,           // 验证中（程序正在验证）
	verifying3: 3,           // 验证中（程序正在验证）
	uncertain1: 10,         // 姓名证件号验证未确定
	uncertain2: 20,         //  身份证图像识别未确定
	uncertain3: 30,         // 两者皆未确定

	illegal: 60,           // 姓名证件号码未通过（图像未上传）
	illegal2: 65,               // 姓名证件号码未通过（图像已上传）
	illegal3: 67,               // 姓名证件号码未通过（已存在该证件号码）
	imageAcceptable: 70,     // 姓名证件号码验证已通过（图像未上传）
	imageReceived: 80,      // 姓名证件号码验证已通过(图像已上传)
	imageIllegal: 90,       // 姓名证件号码验证已通过(图像验证失败)
	legal: 100              // 两者皆通过
};

const decoder = {
	[cardStatus.empty]: "未验证",
	[cardStatus.verifying1]: "验证身份信息中",
	[cardStatus.verifying2]: "验证身份图像信息中",
	[cardStatus.verifying3]: "验证身份信息中（图像已上传）",
	[cardStatus.uncertain1]: "姓名证件号码未确定",
	[cardStatus.uncertain2]: "身份证图像识别未确定",
	[cardStatus.uncertain3]: "证件号码与图像均未确定",
	[cardStatus.illegal]: "实名认证未获通过",
	[cardStatus.illegal2]: "实名认证未获通过（图像已上传）",
	[cardStatus.illegal3]: "该实名信息已被使用",
	[cardStatus.imageAcceptable]: "实名认证已通过（图像未上传）",
	[cardStatus.imageReceived]: "身份证图像已上传",
	[cardStatus.imageIllegal]: "身份证图像验证失败",
	[cardStatus.legal]: "实名认证已通过"
};

function decodeCardStatus(status) {
	return decoder[status];
}

module.exports = {
	type,
	decodeType,
	cardStatus,
	decodeCardStatus,
};
