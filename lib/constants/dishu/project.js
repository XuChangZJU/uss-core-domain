'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var type = {
    rand: 1, // 随堂打卡
    work: 2, // 考勤打卡
    sign: 3 // 签到打卡
};

var decodeType = function decodeType(t) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, type.rand, '随堂打卡'), _defineProperty(_S, type.work, '考勤打卡'), _defineProperty(_S, type.sign, '签到打卡'), _S);

    return S[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};