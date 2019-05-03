/**
 * Created by Xc on 2019/4/24.
 */
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = Object.assign({
    studyLesson: 10001
}, CommonAction);

var decodeAction = function decodeAction(a) {
    var STRING = _defineProperty({}, action.studyLesson, '学习课程');

    return STRING[a] || decodeCommonAction(a);
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};