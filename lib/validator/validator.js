/**
 * Created by Xc on 2018/12/23.
 */
'use strict';

function isMobile(text) {
    return text && typeof text === "string" && /^1[3|4|5|6|7|8|9]\d{9}$/.test(text);
}

function isPassword(text) {
    return text && typeof text === "string" && /^[a-zA-Z0-9!.@]{8,16}$/.test(text);
}

function isCaptcha(text) {
    return text && typeof text === "string" && /^\d{4}$/.test(text);
}

function isIdCardNumber(text) {
    return typeof text === "string" && text.length === 18 && /^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(text);
}

function isPassportNumber(text) {
    // 护照
    // 规则： 14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等
    // 样本： 141234567, G12345678, P1234567
    return typeof text === 'string' && /^([a-zA-z]|[0-9]){5,17}$/.test(text);
}

function isHkCardNumber(text) {
    // 港澳居民来往内地通行证
    // 规则： H/M + 10位或6位数字
    // 样本： H1234567890
    return typeof text === 'string' && /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(text);
}

function isAmCardNumber(text) {
    return typeof text === 'string' && /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(text);
}

function isTwCardNumber(text) {
    // 台湾居民来往大陆通行证
    // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
    // 样本： 12345678 或 1234567890B
    return typeof text === 'string' && /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(text);
}

function isBirthNumber(text) {
    return typeof text === 'string' && /^[a-zA-Z0-9]{5,21}$/.test(text);
}

function isSoldierNumber(text) {
    // 军官证
    // 规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
    // 样本： 军字第2001988号, 士字第P011816X号
    return typeof text === 'string' && /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/.test(text);
}

// todo untested
function isUrl(str) {
    // return ((str) &&  (typeof str === "string") && !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g));
    var regex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    return typeof str === "string" && regex.test(str);
}

function isNickname(str) {
    return str && typeof str === "string" && str.trim().length > 0 && str.length < 16;
}

function isSizedCaptcha(text, size) {
    return typeof text === 'string' && text.length === size && !isNan(parseInt(text, 10));
}

function isDigital(digital) {
    return (/^\d{6,12}$/.test(digital)
    );
}

function isPhone(phone) {
    // return /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(phone);
    return (/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(phone)
    );
}

module.exports = {
    isMobile: isMobile,
    isCaptcha: isCaptcha,
    isPassword: isPassword,
    isIdCardNumber: isIdCardNumber,
    isPassportNumber: isPassportNumber,
    isHkCardNumber: isHkCardNumber,
    isAmCardNumber: isAmCardNumber,
    isTwCardNumber: isTwCardNumber,
    isBirthNumber: isBirthNumber,
    isSoldierNumber: isSoldierNumber,
    isUrl: isUrl,
    isNickname: isNickname,
    isDigital: isDigital,
    isSizedCaptcha: isSizedCaptcha,
    isPhone: isPhone
};