'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _AUTH_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./action'),
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX,
    commonAction = _require.action,
    transportAction = _require.transportAction,
    transportState = _require.transportState;

var _require2 = require('../constraints/action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth;

var action = (0, _assign2.default)({}, transportAction, commonAction);

var AUTH_MATRIX = (_AUTH_MATRIX = {}, (0, _defineProperty3.default)(_AUTH_MATRIX, action.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taSend, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taAccept, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taReject, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taAbort, AllowEveryoneAuth), _AUTH_MATRIX);

module.exports = {
    STATE_TRANS_MATRIX: TRANSPORT_STATE_TRANS_MATRIX,
    action: action,
    AUTH_MATRIX: AUTH_MATRIX,
    transportState: transportState
};