'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
var action = {
    create: 1,
    update: 2,
    remove: 3,
    grant: 11,
    revoke: 12
};

// 全局抽象的关系 0-1000
var relation = {
    owner: 1
};

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, action.create, '创建'), _defineProperty(_STRINGS, action.update, '更新数据'), _defineProperty(_STRINGS, action.remove, '删除'), _defineProperty(_STRINGS, action.grant, '授予'), _defineProperty(_STRINGS, action.revoke, '回收'), _STRINGS);

    return STRINGS[a];
};

var decodeRelation = function decodeRelation(r) {
    var STRINGS = _defineProperty({}, relation.owner, '所有者');
    return STRINGS[r];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,

    relation: relation,
    decodeRelation: decodeRelation
};