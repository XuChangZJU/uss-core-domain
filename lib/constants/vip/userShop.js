'use strict';

var _grantMatrix;

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
    keeper: 1001, // 店长
    worker: 1002 // 店员
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, relation.keeper, '店长'), _defineProperty(_STRING, relation.worker, '店员'), _STRING);

    return STRING[t] || decodeCommonRelation(t);
};

var action = Object.assign({}, commonAction);

var decodeAction = function decodeAction(a) {
    var STRINGS = {};

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

var grantMatrix = (_grantMatrix = {}, _defineProperty(_grantMatrix, relation.owner, [relation.keeper, relation.worker]), _defineProperty(_grantMatrix, relation.keeper, [relation.worker]), _grantMatrix);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    grantMatrix: grantMatrix
};