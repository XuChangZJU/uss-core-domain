'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/3/14.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var type = {
    soft: 1,
    esp8266: 2
};

var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, type.soft, '软中继器'), (0, _defineProperty3.default)(_TEXT, type.esp8266, 'wifi中继器'), _TEXT);
    return TEXT[t];
};

var state = {
    inactive: 1,
    normal: 10,
    offline: 101
};

var decodeState = function decodeState(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, state.inactive, '未激活的'), (0, _defineProperty3.default)(_TEXT2, state.normal, '正常的'), (0, _defineProperty3.default)(_TEXT2, state.offline, '离线的'), _TEXT2);

    return TEXT[s];
};

var action = (0, _assign2.default)({}, commonAction, {
    activate: 101,
    online: 111,
    offline: 121,
    bind: 1001,
    unbind: 1002,
    updateUuid: 1003
});

var decodeAction = function decodeAction(a) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, (0, _defineProperty3.default)(_TEXT3, action.activate, '激活'), (0, _defineProperty3.default)(_TEXT3, action.online, '上线'), (0, _defineProperty3.default)(_TEXT3, action.offline, '下线'), (0, _defineProperty3.default)(_TEXT3, action.bind, '关联设备'), (0, _defineProperty3.default)(_TEXT3, action.unbind, '解联设备'), (0, _defineProperty3.default)(_TEXT3, action.updateUuid, '绑定二维码'), _TEXT3);

    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.activate, [state.inactive, state.normal]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.online, [state.offline, state.normal]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.offline, [state.normal, state.offline]), _STATE_TRANS_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};