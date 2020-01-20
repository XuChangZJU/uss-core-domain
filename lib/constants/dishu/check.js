'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */

var category = {
    checkInBySelf: 1,
    checkInByOthers: 2,
    takeOffBySelf: 21,
    takeOffByOthers: 22
};

var decodeCategory = function decodeCategory(c) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, category.checkInBySelf, '本人打卡'), _defineProperty(_S, category.checkInByOthers, '他人代打'), _defineProperty(_S, category.takeOffBySelf, '本人请假'), _defineProperty(_S, category.takeOffByOthers, '他人请假'), _S);

    return S[c];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory
};