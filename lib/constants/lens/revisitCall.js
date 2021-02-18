'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    active: 301,
    expired: 401
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.active, '活跃的'), (0, _defineProperty3.default)(_S, state.expired, '已过期'), _S);
    return S[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};