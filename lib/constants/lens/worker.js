'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({}, CommonRelation, {});

var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.owner, '自身');
    return R[r] || decodeCommonRelation(r);
};

module.exports = {
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
    action: CommonAction,
    decodeAction: decodeCommonAction
};