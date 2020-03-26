'use strict';

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

module.exports = {
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
    action: CommonAction,
    decodeAction: decodeCommonAction
};