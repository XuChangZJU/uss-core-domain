'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var _require2 = require('./trade'),
    tradeCategory = _require2.category;

var getReportCategoryId = function getReportCategoryId(c) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, tradeCategory.OkGlassCheck, 2), _defineProperty(_S, tradeCategory.visionTrainingCheck, 3), _defineProperty(_S, tradeCategory.check, 1), _S);

    return S[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    getReportCategoryId: getReportCategoryId
};