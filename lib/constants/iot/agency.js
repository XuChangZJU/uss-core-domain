'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/7/8.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = Object.assign({}, CommonAction, {
    setAgencySkuPrice: 101
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.setAgencySkuPrice, '设置进货价格');

    return S[a] || decodeCommonAction(a);
};

var category = {
    personal: 1,
    enterprise: 2
};

var decodeCategory = function decodeCategory(c) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, category.personal, '个人'), _defineProperty(_S2, category.enterprise, '企业'), _S2);

    return S[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    action: action,
    decodeAction: decodeAction
};