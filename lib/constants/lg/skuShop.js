'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/7.
 */
var state = {
    online: 1,
    offline: 11,
    disabled: 21,
    fresh: 22
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.online, '上线中'), _defineProperty(_TEXT, state.offline, '下线中'), _defineProperty(_TEXT, state.disabled, '禁用中'), _defineProperty(_TEXT, state.fresh, '未审核'), _TEXT);

    return TEXT[s];
};

var action = {
    online: 1,
    offline: 11,
    disable: 21
};

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.online, '上线'), _defineProperty(_TEXT2, action.offline, '下线'), _defineProperty(_TEXT2, action.disable, '禁用'), _TEXT2);

    return TEXT[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.online, [[state.fresh, state.offline, state.disabled], state.online]), _defineProperty(_STATE_TRANS_MATRIX, action.offline, [state.online, state.offline]), _defineProperty(_STATE_TRANS_MATRIX, action.disable, [[state.online, state.offline], state.disabled]), _STATE_TRANS_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};