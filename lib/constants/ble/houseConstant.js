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

var state = {
    uncompleted: 1,
    online: 11,
    offline: 12,
    offlineByPlatform: 101
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.uncompleted, '未完成'), _defineProperty(_STRING, state.online, '已上线'), _defineProperty(_STRING, state.offline, '已下线'), _defineProperty(_STRING, state.offlineByPlatform, '被下线'), _STRING);

    return STRING[s];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState
};