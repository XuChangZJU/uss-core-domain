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
    decodeTransportState = _require.decodeTransportState,
    decodeTransportAction = _require.decodeTransportAction,
    transportAction = _require.transportAction,
    transportState = _require.transportState;

var ErrorCode = require('../constants/errorCode');

var _require2 = require('../constraints/action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth;

var action = (0, _assign2.default)({}, transportAction, commonAction);

var AUTH_MATRIX = (_AUTH_MATRIX = {}, (0, _defineProperty3.default)(_AUTH_MATRIX, action.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taSend, {
    auths: [{
        "#data": [{
            check: function check(_ref) {
                var row = _ref.row;

                if (![transportState.tsInPreparing].includes(row.transportState)) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u7269\u6D41\u72B6\u6001\u4E0D\u652F\u6301' + decodeTransportAction(action) + '\u64CD\u4F5C', {
                        name: 'express',
                        operation: 'update',
                        data: row
                    });
                };
                return true;
            }
        }]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taAccept, {
    auths: [{
        "#data": [{
            check: function check(_ref2) {
                var row = _ref2.row;

                if (![transportState.tsSending].includes(row.transportState)) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u7269\u6D41\u72B6\u6001\u4E0D\u652F\u6301' + decodeTransportAction(action) + '\u64CD\u4F5C', {
                        name: 'express',
                        operation: 'update',
                        data: row
                    });
                };
                return true;
            }
        }]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.taReject, {
    auths: [{
        "#data": [{
            check: function check(_ref3) {
                var row = _ref3.row;

                if (![transportState.tsSending].includes(row.transportState)) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u7269\u6D41\u72B6\u6001\u4E0D\u652F\u6301' + decodeTransportAction(action) + '\u64CD\u4F5C', {
                        name: 'express',
                        operation: 'update',
                        data: row
                    });
                };
                return true;
            }
        }]
    }]
}), _AUTH_MATRIX);

module.exports = {
    STATE_TRANS_MATRIX: TRANSPORT_STATE_TRANS_MATRIX,
    action: action,
    AUTH_MATRIX: AUTH_MATRIX,
    transportState: transportState
};