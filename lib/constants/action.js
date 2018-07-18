'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/18.
 */
var action = {
    create: 1,
    update: 2,
    remove: 3
};

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, action.create, '创建'), _defineProperty(_STRINGS, action.update, '更新数据'), _defineProperty(_STRINGS, action.remove, '删除'), _STRINGS);

    return STRINGS[a];
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};