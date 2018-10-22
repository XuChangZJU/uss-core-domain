'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var decodeGrantRelationAction = function decodeGrantRelationAction(r, grant) {
    var _STRING_GRANT, _STRING_CONFIRM;

    var STRING_GRANT = (_STRING_GRANT = {}, _defineProperty(_STRING_GRANT, relation.owner, '转让店铺'), _defineProperty(_STRING_GRANT, relation.grantee, '邀请店员'), _STRING_GRANT);
    var STRING_CONFIRM = (_STRING_CONFIRM = {}, _defineProperty(_STRING_CONFIRM, relation.owner, '转让给您一间店铺'), _defineProperty(_STRING_CONFIRM, relation.grantee, '邀请您成为店员'), _STRING_CONFIRM);

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

var grantMatrix = _defineProperty({}, relation.owner, [relation.grantee]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    decodeGrantRelationAction: decodeGrantRelationAction,
    action: action,
    decodeAction: decodeAction,
    grantMatrix: grantMatrix
};