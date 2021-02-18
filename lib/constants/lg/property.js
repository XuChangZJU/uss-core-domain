'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2021/1/8.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var type = {
    enumerable: 1,
    assignable: 2
};

var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, type.enumerable, '枚举的'), (0, _defineProperty3.default)(_TEXT, type.assignable, '赋值的'), _TEXT);

    return TEXT[t];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType
};