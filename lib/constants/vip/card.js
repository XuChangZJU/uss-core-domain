'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/9.
 */
var state = {
    available: 10,
    expired: 1001,
    forbidden: 1002,
    dropBySelf: 1003,
    dropByShop: 1004
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.available, '可用的'), (0, _defineProperty3.default)(_STRING, state.expired, '过期的'), (0, _defineProperty3.default)(_STRING, state.forbidden, '禁用的'), (0, _defineProperty3.default)(_STRING, state.dropBySelf, '自丢弃的'), (0, _defineProperty3.default)(_STRING, state.dropByShop, '店方删除的'), _STRING);
    return STRING[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};