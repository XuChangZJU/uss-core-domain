'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, type.soft, '软中继器'), _defineProperty(_TEXT, type.esp8266, 'wifi中继器'), _TEXT);
    return TEXT[t];
};

var state = {
    inactive: 1,
    normal: 10,
    offline: 101
};

var decodeState = function decodeState(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, state.inactive, '未激活的'), _defineProperty(_TEXT2, state.normal, '正常的'), _defineProperty(_TEXT2, state.offline, '离线的'), _TEXT2);

    return TEXT[s];
};

var action = Object.assign({}, commonAction, {
    activate: 10,
    online: 11,
    offline: 101,
    bind: 1001,
    unbind: 1002
});

var decodeAction = function decodeAction(a) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, _defineProperty(_TEXT3, action.activate, '激活'), _defineProperty(_TEXT3, action.online, '上线'), _defineProperty(_TEXT3, action.offline, '下线'), _defineProperty(_TEXT3, action.bind, '绑定'), _defineProperty(_TEXT3, action.unbind, '解绑'), _TEXT3);

    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.activate, [state.inactive, state.normal]), _defineProperty(_STATE_TRANS_MATRIX, action.online, [state.offline, state.normal]), _defineProperty(_STATE_TRANS_MATRIX, action.offline, [state.normal, state.offline]), _STATE_TRANS_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};