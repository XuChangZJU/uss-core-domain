'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2021/1/7.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = (0, _assign2.default)({}, commonAction, {
    online: 101,
    offline: 111
});

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, action.online, '上架'), (0, _defineProperty3.default)(_TEXT, action.offline, '下架'), _TEXT);

    return TEXT[a] || decodeCommonAction(a);
};

var state = {
    online: 1,
    offline: 11
};

var decodeState = function decodeState(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, state.online, '已上架'), (0, _defineProperty3.default)(_TEXT2, state.offline, '已下架'), _TEXT2);

    return TEXT[s];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.online, [state.offline, state.online]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.offline, [state.online, state.offline]), _STATE_TRANS_MATRIX);

var tag = ['离岛免税品', '离岛免税日用品', '非离岛免税品'];

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,
    tag: tag
};