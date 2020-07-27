'use strict';

var currency = {
    CNY: 1,
    USD: 2,
    EUR: 3,
    JPY: 4,
    HKD: 5,
    GBP: 6,
    AUD: 7,
    NZD: 8,
    SGD: 9,
    CHF: 10,
    CAD: 11,
    MYR: 12,
    RUB: 13,
    ZAR: 14,
    KRW: 15,
    AED: 16,
    SAR: 17,
    HUF: 18,
    PLN: 19,
    DKK: 20,
    SEK: 21,
    NOK: 22,
    TRY: 23,
    MXN: 24,
    THB: 25
};

var decodeCurrency = function decodeCurrency(a) {
    var STRINGS = {
        'CNY': '人民币',
        'USD': '美元',
        'EUR': '欧元',
        'JPY': '日元',
        'HKD': '港币',
        'GBP': '英镑',
        'AUD': '澳元',
        'NZD': '新西兰元',
        'SGD': '新加坡元',
        'CHF': '瑞士法郎',
        'CAD': '加拿大元',
        'MYR': '马来西亚林吉特',
        'RUB': '俄罗斯卢布',
        'ZAR': '南非兰特',
        'KRW': '韩元',
        'AED': '阿联酋迪拉姆',
        'SAR': '沙特里亚尔',
        'HUF': '匈牙利福林',
        'PLN': '波兰兹罗提',
        'DKK': '丹麦克朗',
        'SEK': '瑞典克朗',
        'NOK': '挪威克朗',
        'TRY': '新土耳其里拉',
        'MXN': '墨西哥元',
        'THB': '泰铢'
    };
    return STRINGS[a];
};
module.exports = {
    currency: currency,
    decodeCurrency: decodeCurrency
};