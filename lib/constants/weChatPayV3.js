'use strict';

var _oTbaTMatrix, _obCtMatrix, _SHARE_STATE_TRANS_MA, _SHARE_RETURN_STATE_T;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/12/27.
 * 本文件用于按微信支付V3的手册来定义一系列常量
 */
// 1、电商收付通部分

// 主体类型：https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter7_1_1.shtml
var organizationType = {
    '小微商户': '2401',
    '个人卖家': '2500',
    '个体工商户': '4',
    '企业': '2',
    '党政、机关及事业单位': '3',
    '其它组织': '1708'
};

var idDocType = {
    '身份证': 'IDENTIFICATION_TYPE_MAINLAND_IDCARD',
    '护照': 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT',
    '中国香港-来往内地通行证': 'IDENTIFICATION_TYPE_HONGKONG',
    '中国澳门-来往内地通行证': 'IDENTIFICATION_TYPE_MACAO',
    '中国台湾-来往内地通行证': 'IDENTIFICATION_TYPE_TAIWAN'
};

var bankAccountType = {
    '对公帐户': '74',
    '对私帐户': '75'
};

var oTbaTMatrix = (_oTbaTMatrix = {}, _defineProperty(_oTbaTMatrix, organizationType['小微商户'], [bankAccountType['对私商户']]), _defineProperty(_oTbaTMatrix, organizationType['个人卖家'], [bankAccountType['对私商户']]), _defineProperty(_oTbaTMatrix, organizationType['个体工商户'], [bankAccountType['对公商户'], bankAccountType['对私商户']]), _defineProperty(_oTbaTMatrix, organizationType['企业'], [bankAccountType['对公商户']]), _defineProperty(_oTbaTMatrix, organizationType['党政、机关及事业单位'], [bankAccountType['对公商户']]), _defineProperty(_oTbaTMatrix, organizationType['其它组织'], [bankAccountType['对公商户']]), _oTbaTMatrix);

var contactType = {
    '经营者、法人': '65',
    '负责人': '66'
};

var obCtMatrix = (_obCtMatrix = {}, _defineProperty(_obCtMatrix, organizationType['小微商户'], [contactType['经营者、法人']]), _defineProperty(_obCtMatrix, organizationType['个人卖家'], [contactType['经营者、法人']]), _defineProperty(_obCtMatrix, organizationType['个体工商户'], [contactType['经营者、法人'], contactType['负责人']]), _defineProperty(_obCtMatrix, organizationType['企业'], [contactType['经营者、法人'], contactType['负责人']]), _defineProperty(_obCtMatrix, organizationType['党政、机关及事业单位'], [contactType['经营者、法人'], contactType['负责人']]), _defineProperty(_obCtMatrix, organizationType['其它组织'], [contactType['经营者、法人'], contactType['负责人']]), _obCtMatrix);

///////////////////////////////////////////////////////////////////////////////////////////////////
// 分润状态定义
///////////////////////////////////////////////////////////////////////////////////////////////////
var shareState = {
    unshared: 1001,
    sharing: 1011,
    shared: 1021,
    partialReturned: 1031,
    returned: 1032,
    failed: 1050
};

var decodeShareState = function decodeShareState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, shareState.unshared, '未分配的'), _defineProperty(_TEXT, shareState.sharing, '分配中'), _defineProperty(_TEXT, shareState.shared, '分配完成'), _defineProperty(_TEXT, shareState.partialReturned, '部分回退'), _defineProperty(_TEXT, shareState.returned, '已回退'), _TEXT);

    return TEXT[s];
};

var shareAction = {
    share: 1011,
    shareCompleted: 1021,
    shareFailed: 1050,
    returnPartially: 1031,
    return: 1032.
};

var decodeShareAction = function decodeShareAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, shareAction.share, '分配'), _defineProperty(_TEXT2, shareAction.shareCompleted, '分配完成'), _defineProperty(_TEXT2, shareAction.shareFailed, '分配失败'), _defineProperty(_TEXT2, shareAction.returnPartially, '部分回退'), _defineProperty(_TEXT2, shareAction.return, '回退'), _TEXT2);

    return TEXT[a];
};

var SHARE_STATE_TRANS_MATRIX = (_SHARE_STATE_TRANS_MA = {}, _defineProperty(_SHARE_STATE_TRANS_MA, shareAction.share, [shareState.unshared, shareState.sharing]), _defineProperty(_SHARE_STATE_TRANS_MA, shareAction.shareCompleted, [shareState.sharing, shareState.shared]), _defineProperty(_SHARE_STATE_TRANS_MA, shareAction.shareFailed, [shareState.sharing, shareState.failed]), _defineProperty(_SHARE_STATE_TRANS_MA, shareAction.returnPartially, [[shareState.shared, shareState.partialReturned], shareState.partialReturned]), _defineProperty(_SHARE_STATE_TRANS_MA, shareAction.return, [[shareState.shared, shareState.partialReturned], shareState.returned]), _SHARE_STATE_TRANS_MA);

var shareReturnState = {
    returning: 2011,
    returned: 2021,
    failed: 2051
};

var decodeShareReturnState = function decodeShareReturnState(srs) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, _defineProperty(_TEXT3, shareReturnState.returning, '退还中'), _defineProperty(_TEXT3, shareReturnState.returned, '已退还'), _defineProperty(_TEXT3, shareReturnState.failed, '退还失败'), _TEXT3);

    return TEXT[srs];
};

var shareReturnAction = {
    returnCompleted: 2021,
    returnFailed: 2051
};

var decodeShareReturnAction = function decodeShareReturnAction(sra) {
    var _TEXT4;

    var TEXT = (_TEXT4 = {}, _defineProperty(_TEXT4, shareReturnAction.returnCompleted, '退还成功'), _defineProperty(_TEXT4, shareReturnAction.returnFailed, '退还失败'), _TEXT4);

    return TEXT[sra];
};

var SHARE_RETURN_STATE_TRANS_MATRIX = (_SHARE_RETURN_STATE_T = {}, _defineProperty(_SHARE_RETURN_STATE_T, shareReturnAction.returnCompleted, [shareReturnState.returning, shareReturnState.returned]), _defineProperty(_SHARE_RETURN_STATE_T, shareReturnAction.returnFailed, [shareReturnState.returning, shareReturnState.failed]), _SHARE_RETURN_STATE_T);

var shareAccountType = {
    merchant: 1,
    personal: 2
};

var decodeShareAccountType = function decodeShareAccountType(sat) {
    var _TEXT5;

    var TEXT = (_TEXT5 = {}, _defineProperty(_TEXT5, shareAccountType.merchant, '商户'), _defineProperty(_TEXT5, shareAccountType.personal, '个人'), _TEXT5);

    return TEXT[sat];
};

module.exports = {
    organizationType: organizationType,
    idDocType: idDocType,
    bankAccountType: bankAccountType,
    oTbaTMatrix: oTbaTMatrix,
    contactType: contactType,
    obCtMatrix: obCtMatrix,
    shareState: shareState,
    decodeShareState: decodeShareState,
    shareAction: shareAction,
    decodeShareAction: decodeShareAction,
    SHARE_STATE_TRANS_MATRIX: SHARE_STATE_TRANS_MATRIX,
    shareReturnState: shareReturnState,
    decodeShareReturnState: decodeShareReturnState,
    shareReturnAction: shareReturnAction,
    decodeShareReturnAction: decodeShareReturnAction,
    SHARE_RETURN_STATE_TRANS_MATRIX: SHARE_RETURN_STATE_TRANS_MATRIX,
    shareAccountType: shareAccountType,
    decodeShareAccountType: decodeShareAccountType
};