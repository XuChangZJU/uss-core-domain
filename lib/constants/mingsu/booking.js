'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/1/28.
 */
var _require = require('../action'),
    state = _require.state,
    decodeState = _require.decodeState,
    action = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    platform: 1,
    fromLord: 2
};

var decodeCategory = function decodeCategory(c) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, category.platform, '来自平台'), _defineProperty(_STRING, category.fromLord, '房东建立'), _STRING);

    return STRING[c];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};