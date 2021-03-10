
/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STRINGS_OF_ORIGINS, _decoder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var type = {
	idCard: 1,
	passport: 2,
	hkCard: 3,
	amCard: 4,
	twCard: 4,
	birth: 5,
	soldier: 6
};

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.idCard, "身份证"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.passport, "护照"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.hkCard, "香港居民回乡证"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.amCard, "澳门居民回乡证"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.twCard, "台湾居民回乡证"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.birth, "出生证"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, type.soldier, "军人证"), _STRINGS_OF_ORIGINS);

function decodeType(o) {
	return STRINGS_OF_ORIGINS[o];
}

var cardStatus = {
	empty: 0, // 未验证
	verifying1: 1, // 验证中（程序正在验证）
	verifying2: 2, // 验证中（程序正在验证）
	verifying3: 3, // 验证中（程序正在验证）
	uncertain1: 10, // 姓名证件号验证未确定
	uncertain2: 20, //  身份证图像识别未确定
	uncertain3: 30, // 两者皆未确定

	illegal: 60, // 姓名证件号码未通过（图像未上传）
	illegal2: 65, // 姓名证件号码未通过（图像已上传）
	illegal3: 67, // 姓名证件号码未通过（已存在该证件号码）
	imageAcceptable: 70, // 姓名证件号码验证已通过（图像未上传）
	imageReceived: 80, // 姓名证件号码验证已通过(图像已上传)
	imageIllegal: 90, // 姓名证件号码验证已通过(图像验证失败)
	legal: 100 // 两者皆通过
};

var decoder = (_decoder = {}, (0, _defineProperty3.default)(_decoder, cardStatus.empty, "未验证"), (0, _defineProperty3.default)(_decoder, cardStatus.verifying1, "验证身份信息中"), (0, _defineProperty3.default)(_decoder, cardStatus.verifying2, "验证身份图像信息中"), (0, _defineProperty3.default)(_decoder, cardStatus.verifying3, "验证身份信息中（图像已上传）"), (0, _defineProperty3.default)(_decoder, cardStatus.uncertain1, "姓名证件号码未确定"), (0, _defineProperty3.default)(_decoder, cardStatus.uncertain2, "身份证图像识别未确定"), (0, _defineProperty3.default)(_decoder, cardStatus.uncertain3, "证件号码与图像均未确定"), (0, _defineProperty3.default)(_decoder, cardStatus.illegal, "实名认证未获通过"), (0, _defineProperty3.default)(_decoder, cardStatus.illegal2, "实名认证未获通过（图像已上传）"), (0, _defineProperty3.default)(_decoder, cardStatus.illegal3, "该实名信息已被使用"), (0, _defineProperty3.default)(_decoder, cardStatus.imageAcceptable, "实名认证已通过（图像未上传）"), (0, _defineProperty3.default)(_decoder, cardStatus.imageReceived, "身份证图像已上传"), (0, _defineProperty3.default)(_decoder, cardStatus.imageIllegal, "身份证图像验证失败"), (0, _defineProperty3.default)(_decoder, cardStatus.legal, "实名认证已通过"), _decoder);

function decodeCardStatus(status) {
	return decoder[status];
}

module.exports = {
	type: type,
	decodeType: decodeType,
	cardStatus: cardStatus,
	decodeCardStatus: decodeCardStatus
};