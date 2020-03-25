'use strict';

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

<<<<<<< HEAD
var relation = Object.assign({}, CommonRelation, {});

var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.owner, '自身');
    return R[r] || decodeCommonRelation(r);
};

var action = Object.assign({}, CommonAction, {
    link: 131
});

var decodeAction = function decodeAction(a) {
    var A = _defineProperty({}, action.link, '关联');
    return A[a] || decodeCommonAction(a);
};

=======
>>>>>>> 832a0e92d623a082d0b93f66618be26efb8388ad
module.exports = {
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
    action: CommonAction,
    decodeAction: decodeCommonAction
};