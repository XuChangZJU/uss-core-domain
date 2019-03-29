/**
 * Created by Administrator on 2017/12/7.
 */
const assert = require('assert');

const wordType = {
    DISPOSABLE: 1,
    CONSTANT: 2,
};

const category = {
    normal: 1,
    creditable: 2,
    lox: 3,
};

const decodeCategory = (c) => {
    const STRING_OF_CATEGORY = {
        [category.normal]: '正常',
        [category.creditable]: '租借用',
        [category.lox]: 'LoX用'
    };

    return STRING_OF_CATEGORY[c];
};

const event = {
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
    FP_TOGGLED: 'FP_TOGGLED',
};

const timerType = {
    'pcf8536_001': 1,           // pcf8536芯片，设置时输入单字节weekday，4字节time，读取时得到4字节time。time的实际含义见utils/peripheralUtils.js中的decodeTime函数
};

const result = {
    success: 0,
    keyWordValidateFail: 6,
    flashWritingError: 7,
    flashReadingError: 8,
    actionDisallowed: 9,
    commandUnrecognized: 10,
    paramLengthIllegal: 11,
    dataInconsistency: 12,
    notEnoughMemory: 13,
};

const decodeResult = (r) => {
    const STRING_OF_RESULT = {
        [result.success]: '已成功',
        [result.keyWordValidateFail]: '验证密码失败',
        [result.flashReadingError]: '读flash失败',
        [result.flashWritingError]: '写flash失败',
        [result.actionDisallowed]: '操作被拒绝',
        [result.commandUnrecognized]: '不能识别的命令',
        [result.paramLengthIllegal]: '参数不合法',
        [result.dataInconsistency]: '数据不一致',
        [result.notEnoughMemory]: '内存不足',
    };

    return STRING_OF_RESULT[r];
};

function compareVersion(version1, version2) {
    assert(typeof version1 === "string");
    assert(typeof version2 === "string");
    const v1 = version1.split(".");
    const v2 = version2.split(".");

    for(let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const num1 = i < v1.length ? parseInt(v1[i], 10) : 0;
        const num2 = i < v2.length ? parseInt(v2[i], 10) : 0;
        if(num1 !== num2) return num1 - num2;
    }
    return 0;
}

const action = {
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
    dfuFailure: 202,
};

const decodeAction = (a) => {
    const STRING = {
        [action.unlock]: '开门',
        [action.confirm]: '确认',
        [action.dfu]: 'DFU',
        [action.getKeyWord]: '获取钥匙原语',
        [action.confirmOutdate]: '确认过期',
        [action.clearBonds]: '清除bonds',
        [action.resetConstantKeyWord]: '重置持久性钥匙原语',
        [action.syncTime]: '同步时间',
        [action.create]: '创建',
        [action.drop]: '删除',
        [action.dfuSuccess]: 'DFU成功',
        [action.dfuFailure]: 'DFU失败',
    };
    return STRING[a];
};

module.exports = {
    wordType,
    event,
    result,
    decodeResult,
    timerType,
    category,
    decodeCategory,
    compareVersion,
    action,
    decodeAction,
};
