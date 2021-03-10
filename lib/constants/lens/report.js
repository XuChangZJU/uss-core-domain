'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var _require2 = require('./trade'),
    tradeCategory = _require2.category;

var getReportCategoryId = function getReportCategoryId(c) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, tradeCategory.OkGlassCheck, 2), (0, _defineProperty3.default)(_S, tradeCategory.visionTrainingCheck, 3), (0, _defineProperty3.default)(_S, tradeCategory.check, 1), _S);

    return S[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    getReportCategoryId: getReportCategoryId
};