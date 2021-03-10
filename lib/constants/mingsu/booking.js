'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2019/1/28.
 */
var _require = require('../action'),
    state = _require.state,
    decodeState = _require.decodeState,
    action = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    platform: 1,
    fromLord: 2
};

var decodeCategory = function decodeCategory(c) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, category.platform, '来自平台'), (0, _defineProperty3.default)(_STRING, category.fromLord, '房东建立'), _STRING);

    return STRING[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};