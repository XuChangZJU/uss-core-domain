'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/1/28.
 */
var _require = require('../ble/houseConstant'),
    category = _require.category,
    decodeCategory = _require.decodeCategory;

var membership = {
    level0: 1,
    level1: 10,
    level2: 100
};

var decodeMembership = function decodeMembership(ms) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, membership.level0, '普通民宿'), _defineProperty(_STRING, membership.level1, 'B级会员民宿'), _defineProperty(_STRING, membership.level2, 'B级共享会员'), _STRING);

    return STRING[ms];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    membership: membership,
    decodeMembership: decodeMembership
};