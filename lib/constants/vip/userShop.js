'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var type = {
    owner: 1, // 创始人
    partner: 2, // 合伙人
    manager: 3, // 管理员

    keeper: 11, // 店长
    worker: 12 // 店员
};

var decodeType = function decodeType(t) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, type.owner, '创始人'), _defineProperty(_STRING, type.partner, '合伙人'), _defineProperty(_STRING, type.manager, '管理员'), _defineProperty(_STRING, type.keeper, !'店长'), _defineProperty(_STRING, type.worker, '店员'), _STRING);

    return STRING[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};