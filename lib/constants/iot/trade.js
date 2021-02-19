'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2019/7/30.
 */
var _require = require('../action'),
    state = _require.state,
    decodeState = _require.decodeState;

var category = {
    online: 1,
    device: 2,
    supply: 3,

    demand: 11,
    test: 12
};

var decodeCategory = function decodeCategory(c) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, category.online, '线上商城'), (0, _defineProperty3.default)(_S, category.device, '线下设备'), (0, _defineProperty3.default)(_S, category.supply, '经销供货'), (0, _defineProperty3.default)(_S, category.demand, '管理员指令'), (0, _defineProperty3.default)(_S, category.test, '测试'), _S);

    return S[c];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};