'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    binded: 301,
    unbinded: 302
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.binded, '已绑定'), (0, _defineProperty3.default)(_S, state.unbinded, '已解绑'), _S);
    return S[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};