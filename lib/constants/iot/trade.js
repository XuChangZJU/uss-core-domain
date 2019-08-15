'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/7/30.
 */
var _require = require('../action'),
    state = _require.state,
    decodeState = _require.decodeState;

var category = {
    online: 1,
    device: 2,
    supply: 3
};

var decodeCategory = function decodeCategory(c) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, category.online, '线上商城'), _defineProperty(_S, category.device, '线下设备'), _defineProperty(_S, category.supply, '经销供货'), _S);

    return S[c];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};