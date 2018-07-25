'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({
    manager: 1002 // 管理员
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var STRING = _defineProperty({}, relation.manager, '管理员');

    return STRING[t] || decodeCommonRelation(t);
};

var action = Object.assign({}, commonAction);

var decodeAction = function decodeAction(a) {
    var STRINGS = {};

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};