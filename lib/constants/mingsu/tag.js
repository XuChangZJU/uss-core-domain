'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2019/1/28.
 */
var category = {
    house: 1,
    room: 2
};

var decodeCategory = function decodeCategory(c) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, category.house, '房屋'), (0, _defineProperty3.default)(_STRING, category.room, '房间'), _STRING);

    return STRING[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory
};