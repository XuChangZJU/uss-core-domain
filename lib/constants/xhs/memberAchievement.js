'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/8/20.
 */
var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = assign(pick(CommonAction, ['create', 'update', 'remove']), {
    exchange: 101
});

var decodeAction = function decodeAction(a) {
    var T = (0, _defineProperty3.default)({}, action.exchange, '交换顺序');

    return T[a] || decodeCommonAction(a);
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};