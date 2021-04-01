'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _AUTH_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');

var _require = require('../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../constraints/action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth;

var _require3 = require('./action'),
    commonState = _require3.state,
    commonAction = _require3.action,
    decodeState = _require3.decodeState,
    decodeAction = _require3.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require3.COMMON_STATE_TRAN_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid', 'cancelled']);

var action = pick(commonAction, ['payPartially', 'startToPay', 'pay', 'create', 'cancel']);

var STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, (0, _values2.default)(action));

var origin = {
    'weChatV3Partner': 1,
    'weChatV3': 2,
    'lianlian': 5,
    'shouQianBa': 10
};

var decodeOrigin = function decodeOrigin(o) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, origin.weChatV3Partner, '微信收付通'), (0, _defineProperty3.default)(_TEXT, origin.weChatV3, '微信支付'), (0, _defineProperty3.default)(_TEXT, origin.lianlian, '连连'), (0, _defineProperty3.default)(_TEXT, origin.shouQianBa, '收钱吧'), _TEXT);

    return TEXT[o];
};

var method = {
    'jsApi': 1,
    'h5': 2,
    'native': 3
};

var decodeMethod = function decodeMethod(m) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, method.jsApi, 'JSAPI'), (0, _defineProperty3.default)(_TEXT2, method.h5, 'H5'), (0, _defineProperty3.default)(_TEXT2, method.native, 'NATIVE'), _TEXT2);

    return TEXT[m];
};

var AUTH_MATRIX = (_AUTH_MATRIX = {}, (0, _defineProperty3.default)(_AUTH_MATRIX, action.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_AUTH_MATRIX, action.pay, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.cancel, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.startToPay, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), (0, _defineProperty3.default)(_AUTH_MATRIX, action.payPartially, {
    auths: [{
        "#role": [Roles.ROOT.name]
    }]
}), _AUTH_MATRIX);

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,
    AUTH_MATRIX: AUTH_MATRIX,

    origin: origin,
    decodeOrigin: decodeOrigin,
    method: method,
    decodeMethod: decodeMethod
};