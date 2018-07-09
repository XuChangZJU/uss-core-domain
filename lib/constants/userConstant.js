"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2016/9/9.
 */
var systemUsers = {
	root: {
		id: 1,
		mobile: "13000000000",
		nickname: "超级管理员"
	},
	coreBackend: {
		id: 2,
		mobile: "13000000001",
		nickname: "核心服务器后台进程"
	},
	coreAuditor: {
		id: 3,
		mobile: "13000000002",
		nickname: "核心服务器审计进程"
	},
	account: {
		id: 1001,
		mobile: "13000000003",
		nickname: "平台帐户"
	}
};

var userState = {
	normal: 1,
	shadow: 199,
	disabled: 999,
	dangerous: 998
};

var userStateDecoder = function userStateDecoder(state) {
	var _USER_STATE_STRING;

	var USER_STATE_STRING = (_USER_STATE_STRING = {}, _defineProperty(_USER_STATE_STRING, userState.normal, '正常的'), _defineProperty(_USER_STATE_STRING, userState.disabled, '禁用的'), _defineProperty(_USER_STATE_STRING, userState.shadow, '未激活的'), _defineProperty(_USER_STATE_STRING, userState.dangerous, '危险用户'), _USER_STATE_STRING);
	return USER_STATE_STRING[state];
};

var mobileRetrievalState = {
	agency: 1,
	unAgency: 2,
	uncertain: 3,
	unknown: 4,
	expired: 9
};

var mobileRetrievalStateDecoder = function mobileRetrievalStateDecoder(state) {
	var _MOBILERETRIEVAL_STAT;

	var MOBILERETRIEVAL_STATE_STRING = (_MOBILERETRIEVAL_STAT = {}, _defineProperty(_MOBILERETRIEVAL_STAT, mobileRetrievalState.agency, '房产中介'), _defineProperty(_MOBILERETRIEVAL_STAT, mobileRetrievalState.unAgency, '非房产中介'), _defineProperty(_MOBILERETRIEVAL_STAT, mobileRetrievalState.uncertain, '暂不确定'), _defineProperty(_MOBILERETRIEVAL_STAT, mobileRetrievalState.unknown, '尚未检测'), _defineProperty(_MOBILERETRIEVAL_STAT, mobileRetrievalState.expired, '已过期'), _MOBILERETRIEVAL_STAT);
	return MOBILERETRIEVAL_STATE_STRING[state];
};

module.exports = {
	systemUsers: systemUsers,
	userState: userState,
	mobileRetrievalState: mobileRetrievalState,
	userStateDecoder: userStateDecoder,
	mobileRetrievalStateDecoder: mobileRetrievalStateDecoder
};