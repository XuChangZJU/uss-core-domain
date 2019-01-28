'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/1/28.
 */
var category = {
    house: 1,
    flatShare: 2,
    tavern: 5,
    apartment: 13,
    hotel: 15,
    spec: 99,
    room: 199
};

var decodeCategory = function decodeCategory(c) {
    var _CATEGORY_MATRIX;

    var CATEGORY_MATRIX = (_CATEGORY_MATRIX = {}, _defineProperty(_CATEGORY_MATRIX, category.house, '整租'), _defineProperty(_CATEGORY_MATRIX, category.flatShare, '合租'), _defineProperty(_CATEGORY_MATRIX, category.tavern, '民宿'), _defineProperty(_CATEGORY_MATRIX, category.apartment, '公寓'), _defineProperty(_CATEGORY_MATRIX, category.hotel, '酒店'), _defineProperty(_CATEGORY_MATRIX, category.spec, '规格'), _defineProperty(_CATEGORY_MATRIX, category.room, '单间'), _CATEGORY_MATRIX);
    return CATEGORY_MATRIX[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory
};