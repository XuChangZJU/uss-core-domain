'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    transportAction = _require.transportAction,
    decodeCommonAction = _require.decodeAction,
    decodeTransportAction = _require.decodeTransportAction,
    decodeTransportState = _require.decodeTransportState,
    state = _require.state,
    decodeCommonState = _require.decodeState;

var action = (0, _assign2.default)({}, commonAction, transportAction);

var decodeAction = function decodeAction(a) {

    return decodeCommonAction(a) || decodeTransportAction(a);
};

var decodeState = function decodeState(s) {

    return decodeCommonState(s) || decodeTransportState(s);
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState
};