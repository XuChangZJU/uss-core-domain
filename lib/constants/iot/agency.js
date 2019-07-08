'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/7/8.
 */
var category = {
    personal: 1,
    enterprise: 2
};

var decodeCategory = function decodeCategory(c) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, category.personal, '个人'), _defineProperty(_S, category.enterprise, '企业'), _S);

    return S[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory
};