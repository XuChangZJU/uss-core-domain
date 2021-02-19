'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2019/7/8.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var action = (0, _assign2.default)({}, CommonAction, {
    setAgencySkuPrice: 101
});

var decodeAction = function decodeAction(a) {
    var S = (0, _defineProperty3.default)({}, action.setAgencySkuPrice, '设置进货价格');

    return S[a] || decodeCommonAction(a);
};

var category = {
    personal: 1,
    enterprise: 2
};

var decodeCategory = function decodeCategory(c) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, category.personal, '个人'), (0, _defineProperty3.default)(_S2, category.enterprise, '企业'), _S2);

    return S[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation
};