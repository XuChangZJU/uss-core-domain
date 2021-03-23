'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var state = {
    active: 1,
    expired: 2
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.active, '生效中'), (0, _defineProperty3.default)(_TEXT, state.expired, '已过期'), _TEXT);

    return TEXT[s];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState
};