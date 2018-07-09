'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var type = {
    owner: 1,
    gift: 2
};

var decodeType = function decodeType(t) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, type.owner, '领劵人'), _defineProperty(_STRING, type.gift, '赠送'), _STRING);

    return STRING[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};