'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var _require2 = require('./trade'),
    category = _require2.category,
    decodeCategory = _require2.decodeCategory;

var state = {
    success: 501
};

var decodeState = function decodeState(s) {
    var S = (0, _defineProperty3.default)({}, state.success, '成功');
    return S[s];
};

var action = (0, _assign2.default)({}, commonAction);

var decodeAction = function decodeAction(a) {
    return decodeCommonAction(a);
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};