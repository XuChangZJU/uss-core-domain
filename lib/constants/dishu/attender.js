'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = (0, _assign2.default)({}, CommonRelation, {
    self: 101,
    ascendant: 111,
    sibling: 121,
    descendant: 131,
    friend: 141,
    colleague: 142
});

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, relation.self, '本人'), (0, _defineProperty3.default)(_S, relation.ascendant, '长辈'), (0, _defineProperty3.default)(_S, relation.sibling, '兄弟姐妹'), (0, _defineProperty3.default)(_S, relation.descendant, '晚辈'), (0, _defineProperty3.default)(_S, relation.friend, '朋友'), (0, _defineProperty3.default)(_S, relation.colleague, '同事'), (0, _defineProperty3.default)(_S, relation.child, '子女'), _S);

    return S[r] || decodeCommonRelation(r);
};

var action = (0, _assign2.default)({}, CommonAction, {
    check: 181
});

var decodeAction = function decodeAction(a) {
    var S = (0, _defineProperty3.default)({}, action.check, '签到');

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};