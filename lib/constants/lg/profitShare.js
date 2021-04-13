'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var origin = {
    platform: 1,
    paymentSupplier: 2,
    shop: 10,
    seller: 11,
    onlineGuide: 21,
    offlineGuide: 22,
    user: 101,
    organization: 102
};

var decodeOrigin = function decodeOrigin(o) {
    var _DICT;

    var DICT = (_DICT = {}, (0, _defineProperty3.default)(_DICT, origin.platform, '平台'), (0, _defineProperty3.default)(_DICT, origin.paymentSupplier, '支付渠道商'), (0, _defineProperty3.default)(_DICT, origin.shop, '店铺'), (0, _defineProperty3.default)(_DICT, origin.seller, '营业员'), (0, _defineProperty3.default)(_DICT, origin.onlineGuide, '线上导流'), (0, _defineProperty3.default)(_DICT, origin.offlineGuide, '线下导流'), (0, _defineProperty3.default)(_DICT, origin.user, '固定用户'), (0, _defineProperty3.default)(_DICT, origin.organization, '固定机构'), _DICT);

    return DICT[o];
};

var method = {
    fixed: 1,
    upperbound: 2
};

var decodeMethod = function decodeMethod(m) {
    var _DICT2;

    var DICT = (_DICT2 = {}, (0, _defineProperty3.default)(_DICT2, method.fixed, '固定比例'), (0, _defineProperty3.default)(_DICT2, method.upperbound, '上限'), _DICT2);
};

var state = {
    unshare: 1001,
    sharing: 1002,
    shared: 1003
};

var decodeState = function decodeState(s) {
    var _DICT3;

    var DICT = (_DICT3 = {}, (0, _defineProperty3.default)(_DICT3, state.unshare, '未分润'), (0, _defineProperty3.default)(_DICT3, state.sharing, '分润中'), (0, _defineProperty3.default)(_DICT3, state.sharing, '已分润'), _DICT3);

    return DICT[s];
};

var action = {
    share: 1002,
    shareManually: 1003,
    shareSuccess: 1004
};

var decodeAction = function decodeAction(a) {
    var _DICT4;

    var DICT = (_DICT4 = {}, (0, _defineProperty3.default)(_DICT4, action.share, '分润'), (0, _defineProperty3.default)(_DICT4, action.shareManually, '手动分润'), (0, _defineProperty3.default)(_DICT4, action.shareSuccess, '分润成功'), _DICT4);

    return DICT[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.share, [state.unshare, state.sharing]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.shareManually, [state.unshare, state.shared]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.shareSuccess, [state.sharing, state.shared]), _STATE_TRANS_MATRIX);

module.exports = {
    origin: origin,
    decodeOrigin: decodeOrigin,
    method: method,
    decodeMethod: decodeMethod,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};