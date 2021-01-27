'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/7.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = Object.assign({}, commonAction, {
    online: 101,
    offline: 111
});

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, action.online, '上架'), _defineProperty(_TEXT, action.offline, '下架'), _TEXT);

    return TEXT[a] || decodeCommonAction(a);
};

var state = {
    online: 1,
    offline: 11
};

var decodeState = function decodeState(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, state.online, '已上架'), _defineProperty(_TEXT2, state.offline, '已下架'), _TEXT2);

    return TEXT[s];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.online, [state.offline, state.online]), _defineProperty(_STATE_TRANS_MATRIX, action.offline, [state.online, state.offline]), _STATE_TRANS_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};