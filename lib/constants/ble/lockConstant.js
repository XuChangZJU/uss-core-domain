'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2017/12/7.
 */
var assert = require('assert');

var wordType = {
    DISPOSABLE: 1,
    CONSTANT: 2
};

var category = {
    normal: 1,
    creditable: 2,
    lox: 3
};

var decodeCategory = function decodeCategory(c) {
    var _STRING_OF_CATEGORY;

    var STRING_OF_CATEGORY = (_STRING_OF_CATEGORY = {}, (0, _defineProperty3.default)(_STRING_OF_CATEGORY, category.normal, '正常'), (0, _defineProperty3.default)(_STRING_OF_CATEGORY, category.creditable, '租借用'), (0, _defineProperty3.default)(_STRING_OF_CATEGORY, category.lox, 'LoX用'), _STRING_OF_CATEGORY);

    return STRING_OF_CATEGORY[c];
};

var event = {
    PERIPHERAL_SCANNED: "PERIPHERAL_SCANNED",
    LOCK_LOCKED: "LOCK_LOCKED",
    LOCK_UNLOCKED: "LOCK_UNLOCKED",
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED",
    DOOR_OPENED: "DOOR_OPENED",
    DOOR_CLOSED: "DOOR_CLOSED",
    VERSION_GOT: "VERSION_GOT",
    PERIPHERAL_READY: "PERIPHERAL_READY",
    LOCK_WORD_GOT: "LOCK_WORD_GOT",
    KEY_WORD_VERIFIED: "KEY_WORD_VERIFIED",
    ENCRYPT_WORD_SET: "ENCRYPT_WORD_SET",
    ENCRYPT_WORD_CLEARED: "ENCRYPT_WORD_CLEARED",
    CONSTANT_WORD_RESET: "CONSTANT_WORD_RESET",
    BOND_CLEARED: "BOND_CLEARED",

    CONFIG_SET: 'CONFIG_SET',

    DFU_DATA_POPULATED: "DFU_DATA_POPULATED",

    DIGITAL_GOT: 'DIGITAL_GOT',
    DIGITAL_ADDED: 'DIGITAL_ADDED',
    DIGITAL_REMOVED: 'DIGITAL_REMOVED',
    DIGITAL_SET: 'DIGITAL_SET',
    DIGITAL_CLEARED: 'DIGITAL_CLEARED',
    DIGITAL_USED_LOG_GOT: 'DIGITAL_USED_LOG_GOT',
    DIGITAL_REPORT_USE_HISTORY_SUCCESS: 'DIGITAL_REPORT_USE_HISTORY_SUCCESS',

    MD_ADMIN_CHECKED: 'MD_ADMIN_CHECKED',
    MD_ADMIN_SET: 'MD_ADMIN_SET',
    MD_DISABLED: 'MD_DISABLED',
    MD_DISABLED_GOT: 'MD_DISABLED_GOT',
    MD_USE_HISTORY_GOT: 'MD_USE_HISTORY_GOT',
    MD_ADMIN_LOGGEDIN: 'MD_ADMIN_LOGGEDIN',

    TIME_GOT: 'TIME_GOT',
    TIME_SET: 'TIME_SET',

    FP_COUNT_GOT: 'FP_COUNT_GOT',
    FPS_GOT: 'FPS_GOT',
    FP_DELETED: 'FP_DELETED',
    FPS_CLEARED: 'FPS_CLEARED',
    FP_REGISTERED: 'FP_REGISTERED',
    FP_CMD_TERMINATED: 'FP_CMD_TERMINATED',
    FP_VERIFIED: 'FP_VERIFIED',
    FP_HISTORY_GOT: 'FP_HISTORY_GOT',
    FP_TOGGLED: 'FP_TOGGLED'
};

var timerType = {
    'pcf8536_001': 1 // pcf8536芯片，设置时输入单字节weekday，4字节time，读取时得到4字节time。time的实际含义见utils/peripheralUtils.js中的decodeTime函数
};

var result = {
    success: 0,
    keyWordValidateFail: 6,
    flashWritingError: 7,
    flashReadingError: 8,
    actionDisallowed: 9,
    commandUnrecognized: 10,
    paramLengthIllegal: 11,
    dataInconsistency: 12,
    notEnoughMemory: 13
};

var decodeResult = function decodeResult(r) {
    var _STRING_OF_RESULT;

    var STRING_OF_RESULT = (_STRING_OF_RESULT = {}, (0, _defineProperty3.default)(_STRING_OF_RESULT, result.success, '已成功'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.keyWordValidateFail, '验证密码失败'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.flashReadingError, '读flash失败'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.flashWritingError, '写flash失败'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.actionDisallowed, '操作被拒绝'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.commandUnrecognized, '不能识别的命令'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.paramLengthIllegal, '参数不合法'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.dataInconsistency, '数据不一致'), (0, _defineProperty3.default)(_STRING_OF_RESULT, result.notEnoughMemory, '内存不足'), _STRING_OF_RESULT);

    return STRING_OF_RESULT[r];
};

function compareVersion(version1, version2) {
    assert(typeof version1 === "string");
    assert(typeof version2 === "string");
    var v1 = version1.split(".");
    var v2 = version2.split(".");

    for (var i = 0; i < Math.max(v1.length, v2.length); i++) {
        var num1 = i < v1.length ? parseInt(v1[i], 10) : 0;
        var num2 = i < v2.length ? parseInt(v2[i], 10) : 0;
        if (num1 !== num2) return num1 - num2;
    }
    return 0;
}

var action = {
    unlock: 1,
    confirm: 2,
    dfu: 3,
    getKeyWord: 4,
    confirmOutdate: 5,
    clearBonds: 6,
    resetConstantKeyWord: 7,
    syncTime: 8,

    create: 101,
    drop: 102,

    dfuSuccess: 201,
    dfuFailure: 202
};

var decodeAction = function decodeAction(a) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, action.unlock, '开门'), (0, _defineProperty3.default)(_STRING, action.confirm, '确认'), (0, _defineProperty3.default)(_STRING, action.dfu, 'DFU'), (0, _defineProperty3.default)(_STRING, action.getKeyWord, '获取钥匙原语'), (0, _defineProperty3.default)(_STRING, action.confirmOutdate, '确认过期'), (0, _defineProperty3.default)(_STRING, action.clearBonds, '清除bonds'), (0, _defineProperty3.default)(_STRING, action.resetConstantKeyWord, '重置持久性钥匙原语'), (0, _defineProperty3.default)(_STRING, action.syncTime, '同步时间'), (0, _defineProperty3.default)(_STRING, action.create, '创建'), (0, _defineProperty3.default)(_STRING, action.drop, '删除'), (0, _defineProperty3.default)(_STRING, action.dfuSuccess, 'DFU成功'), (0, _defineProperty3.default)(_STRING, action.dfuFailure, 'DFU失败'), _STRING);
    return STRING[a];
};

module.exports = {
    wordType: wordType,
    event: event,
    result: result,
    decodeResult: decodeResult,
    timerType: timerType,
    category: category,
    decodeCategory: decodeCategory,
    compareVersion: compareVersion,
    action: action,
    decodeAction: decodeAction
};