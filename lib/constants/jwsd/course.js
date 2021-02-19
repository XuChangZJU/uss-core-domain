/**
 * Created by Xc on 2019/4/24.
 */
"use strict";

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = (0, _assign2.default)({
    studyLesson: 10001
}, CommonAction);

var decodeAction = function decodeAction(a) {
    var STRING = (0, _defineProperty3.default)({}, action.studyLesson, '学习课程');

    return STRING[a] || decodeCommonAction(a);
};

var category = {
    english: 1,
    science: 2,
    math: 3
};

var decodeCategory = function decodeCategory(c) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, category.english, '英语'), (0, _defineProperty3.default)(_STRING2, category.science, '科学'), (0, _defineProperty3.default)(_STRING2, category.math, '数学'), _STRING2);
    return STRING[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory
};