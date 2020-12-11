'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var S = _defineProperty({}, state.success, '成功');
    return S[s];
};

var action = Object.assign({}, commonAction);

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