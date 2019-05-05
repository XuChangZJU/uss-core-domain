/**
 * Created by Xc on 2019/4/24.
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = Object.assign({
    studyLesson: 10001
}, CommonAction);

var decodeAction = function decodeAction(a) {
    var STRING = _defineProperty({}, action.studyLesson, '学习课程');

    return STRING[a] || decodeCommonAction(a);
};

var category = {
    english: 1,
    science: 2,
    math: 3
};

var decodeCategory = function decodeCategory(c) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, category.english, '英语'), _defineProperty(_STRING2, category.science, '科学'), _defineProperty(_STRING2, category.math, '数学'), _STRING2);
    return STRING[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory
};