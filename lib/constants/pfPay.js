'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pick = require('lodash/pick');

var _require = require('./action'),
    commonState = _require.state,
    commonAction = _require.action,
    decodeState = _require.decodeState,
    decodeAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var state = pick(commonState, ['unpaid', 'legal', 'paying', 'partialPaid']);

var action = pick(commonAction, ['payPartially', 'startToPay', 'stopPaying', 'pay']);

var STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, Object.values(action));

var origin = {
    'weChatV3Partner': 1,
    'weChatV3': 2,
    'lianlian': 5,
    'shouQianBa': 10
};

var decodeOrigin = function decodeOrigin(o) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, origin.weChatV3Partner, '微信收付通'), _defineProperty(_TEXT, origin.weChatV3, '微信支付'), _defineProperty(_TEXT, origin.lianlian, '连连'), _defineProperty(_TEXT, origin.shouQianBa, '收钱吧'), _TEXT);

    return TEXT[o];
};

var method = {
    'jsApi': 1,
    'h5': 2,
    'native': 3
};

var decodeMethod = function decodeMethod(m) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, method.jsApi, 'JSAPI'), _defineProperty(_TEXT2, method.h5, 'H5'), _defineProperty(_TEXT2, method.native, 'NATIVE'), _TEXT2);

    return TEXT[m];
};

module.exports = {
    action: action,
    state: state,
    decodeAction: decodeAction,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,

    origin: origin,
    decodeOrigin: decodeOrigin,
    method: method,
    decodeMethod: decodeMethod
};