'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var type = {
    standard: 1,
    nonstandard: 2
};
var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, type.standard, '标准货物'), (0, _defineProperty3.default)(_TEXT, type.nonstandard, '非标货物'), _TEXT);
};
module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType
};