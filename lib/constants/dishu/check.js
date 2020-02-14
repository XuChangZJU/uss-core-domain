'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    checkIn: 1,
    takeOff: 21,
    makeUp: 31,
    absence: 101
};

var decodeCategory = function decodeCategory(c) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, category.checkIn, '打卡'), _defineProperty(_S, category.takeOff, '请假'), _defineProperty(_S, category.makeUp, '补打'), _defineProperty(_S, category.absence, '缺席'), _S);

    return S[c];
};

var result = {
    success: 1,
    suspicious: 11,
    rejected: 21
};

var decodeResult = function decodeResult(r) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, result.success, '成功的'), _defineProperty(_S2, result.suspicious, '可疑的'), _defineProperty(_S2, result.rejected, '拒绝的'), _S2);

    return S[r];
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    result: result,
    decodeResult: decodeResult,
    action: action,
    decodeAction: decodeAction
};