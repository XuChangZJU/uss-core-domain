'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeAction = _require.decodeAction;

var type = {
    company: 1
};

var decodeType = function decodeType(t) {
    var DICT = (0, _defineProperty3.default)({}, type.company, '获客机构');
    return DICT[t];
};

var action = pick(CommonAction, ['create', 'update', 'remove']);

module.exports = {
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction
};