'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = commonRelation;

var decodeRelation = function decodeRelation(r) {
    var STRING = (0, _defineProperty3.default)({}, relation.grantee, '获权使用');

    return STRING[r] || decodeCommonRelation(r);
};

var decodeGrantRelationAction = function decodeGrantRelationAction(r, grant) {
    var STRING_GRANT = (0, _defineProperty3.default)({}, relation.grantee, '分享会员卡');
    var STRING_CONFIRM = (0, _defineProperty3.default)({}, relation.grantee, '分享给您一张会员卡');

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

var action = (0, _assign2.default)({
    produceAmount: 1001,
    produceScore: 1002,
    produceTimes: 1003,

    consumeAmount: 2001,
    consumeScore: 2002,
    consumeTimes: 2003,

    // createCard: 5001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, action.produceAmount, '余额充值'), (0, _defineProperty3.default)(_STRINGS, action.produceScore, '积分充值'), (0, _defineProperty3.default)(_STRINGS, action.produceTimes, '次数充值'), (0, _defineProperty3.default)(_STRINGS, action.consumeAmount, '消费余额'), (0, _defineProperty3.default)(_STRINGS, action.consumeScore, '消费积分'), (0, _defineProperty3.default)(_STRINGS, action.consumeTimes, '消费次数'), (0, _defineProperty3.default)(_STRINGS, action.expires, '过期'), (0, _defineProperty3.default)(_STRINGS, action.forbid, '禁用'), (0, _defineProperty3.default)(_STRINGS, action.dropBySelf, '自丢弃'), (0, _defineProperty3.default)(_STRINGS, action.dropByShop, '店家删除'), _STRINGS);

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

var grantMatrix = (0, _defineProperty3.default)({}, relation.owner, [relation.grantee]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    decodeGrantRelationAction: decodeGrantRelationAction,
    action: action,
    decodeAction: decodeAction,
    grantMatrix: grantMatrix
};