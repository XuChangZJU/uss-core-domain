'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    thesis: 1, // 论文
    patent: 2, // 专利
    copyright: 3, // 软著
    fund: 4 // 基金
};

var decodeCategory = function decodeCategory(c) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, category.rand, '论文'), _defineProperty(_T, category.work, '专利'), _defineProperty(_T, category.sign, '软著'), _defineProperty(_T, category.patrol, '基金'), _T);

    return T[c];
};

var action = pick(CommonAction, ['create','update','remove']);

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    action: action,
    decodeAction: decodeAction
};
