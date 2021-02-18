/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var available = {
    available: 1, // 在售
    few: 2, // 货源紧张
    willOff: 3, // 将下架

    unavailable: 200, // 不可售
    off: 201, // 下架
    forbidden: 202, // 禁售
    lack: 203 // 缺货
};

var decodeAvailable = function decodeAvailable(a) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, available.available, '在售'), (0, _defineProperty3.default)(_STRING, available.few, '货源紧张'), (0, _defineProperty3.default)(_STRING, available.willOff, '将下架'), (0, _defineProperty3.default)(_STRING, available.unavailable, '不可售'), (0, _defineProperty3.default)(_STRING, available.off, '下架'), (0, _defineProperty3.default)(_STRING, available.forbidden, '禁售'), (0, _defineProperty3.default)(_STRING, available.lack, '缺货'), _STRING);

    return STRING[a];
};

module.exports = {
    available: available,
    decodeAvailable: decodeAvailable
};