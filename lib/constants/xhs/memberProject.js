'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/9/277.
 */

var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = assign(pick(CommonAction, ['create', 'update', 'remove']), {
    exchange: 101
});

var decodeAction = function decodeAction(a) {
    var T = _defineProperty({}, action.exchange, '交换顺序');

    return T[a] || decodeCommonAction(a);
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};