'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/1/28.
 */
var category = {
    house: 1,
    room: 2
};

var decodeCategory = function decodeCategory(c) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, category.house, '房屋'), _defineProperty(_STRING, category.room, '房间'), _STRING);

    return STRING[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory
};