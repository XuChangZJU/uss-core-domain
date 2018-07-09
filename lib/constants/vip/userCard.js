'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var type = {
    owner: 1,
    borrow: 2
};

var decodeType = function decodeType(t) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, type.owner, '持卡人'), _defineProperty(_STRING, type.borrow, '借用人'), _STRING);

    return STRING[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};