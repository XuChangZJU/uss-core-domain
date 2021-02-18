'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _grantMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = (0, _assign2.default)({
    keeper: 1001, // 店长
    worker: 1002 // 店员
}, commonRelation);

var decodeRelation = function decodeRelation(r) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, relation.keeper, '店长'), (0, _defineProperty3.default)(_STRING, relation.worker, '店员'), _STRING);

    return STRING[r] || decodeCommonRelation(r);
};

var decodeGrantRelationAction = function decodeGrantRelationAction(r, grant) {
    var _STRING_GRANT, _STRING_CONFIRM;

    var STRING_GRANT = (_STRING_GRANT = {}, (0, _defineProperty3.default)(_STRING_GRANT, relation.keeper, '邀请店长'), (0, _defineProperty3.default)(_STRING_GRANT, relation.worker, '邀请店员'), _STRING_GRANT);
    var STRING_CONFIRM = (_STRING_CONFIRM = {}, (0, _defineProperty3.default)(_STRING_CONFIRM, relation.keeper, '邀请您成为店长'), (0, _defineProperty3.default)(_STRING_CONFIRM, relation.worker, '邀请您成为店员'), _STRING_CONFIRM);

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

var action = (0, _assign2.default)({}, commonAction);

var decodeAction = function decodeAction(a) {
    var STRINGS = {};

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

var grantMatrix = (_grantMatrix = {}, (0, _defineProperty3.default)(_grantMatrix, relation.owner, [relation.keeper, relation.worker]), (0, _defineProperty3.default)(_grantMatrix, relation.keeper, [relation.worker]), _grantMatrix);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    decodeGrantRelationAction: decodeGrantRelationAction,
    action: action,
    decodeAction: decodeAction,
    grantMatrix: grantMatrix
};