'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var S = (_S = {}, (0, _defineProperty3.default)(_S, category.checkIn, '打卡'), (0, _defineProperty3.default)(_S, category.takeOff, '请假'), (0, _defineProperty3.default)(_S, category.makeUp, '补打'), (0, _defineProperty3.default)(_S, category.absence, '缺席'), _S);

    return S[c];
};

var result = {
    success: 1,
    suspicious: 11,
    rejected: 21,
    uncertain: 101
};

var decodeResult = function decodeResult(r) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, result.success, '成功'), (0, _defineProperty3.default)(_S2, result.suspicious, '可疑'), (0, _defineProperty3.default)(_S2, result.rejected, '被拒'), (0, _defineProperty3.default)(_S2, result.uncertain, '验证中'), _S2);

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