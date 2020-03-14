'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({}, CommonRelation, {
    self: 101
});

var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.self, '自身');
    return R[r] || decodeRelation(r);
};

var action = Object.assign({}, CommonAction, {
    link: 131
});

var decodeAction = function decodeAction(a) {
    var A = _defineProperty({}, action.link, '关联');
    return A[a] || decodeAction(a);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};