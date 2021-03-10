'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/8/20.
 */
var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var category = {
    thesis: 1, // 论文
    patent: 2, // 专利
    copyright: 3, // 软著
    fund: 4 // 基金
};

var decodeCategory = function decodeCategory(c) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, category.thesis, '论文'), (0, _defineProperty3.default)(_T, category.patent, '专利'), (0, _defineProperty3.default)(_T, category.copyright, '软著'), (0, _defineProperty3.default)(_T, category.fund, '基金'), _T);

    return T[c];
};

var action = pick(CommonAction, ['create', 'update', 'remove']);

var decodeAction = function decodeAction(a) {
    return decodeCommonAction(a);
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    action: action,
    decodeAction: decodeAction
};