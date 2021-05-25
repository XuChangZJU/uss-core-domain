'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var action = (0, _assign2.default)({}, commonAction, {
    sendMessage: 311
});

var decodeAction = function decodeAction(r) {
    var S = (0, _defineProperty3.default)({}, action.sendMessage, '发消息');

    return S[r] || decodeCommonRelation(r);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    parent: 111,
    eldership: 112,
    mate: 121,
    sibling: 122,
    friend: 123,
    children: 131,
    grandchildren: 132,
    patient: 141,
    partner: 151
});

var decodeRelation = function decodeRelation(r) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, relation.owner, '本人'), (0, _defineProperty3.default)(_S2, relation.parent, '父/母'), (0, _defineProperty3.default)(_S2, relation.mate, '配偶'), (0, _defineProperty3.default)(_S2, relation.eldership, '长辈'), (0, _defineProperty3.default)(_S2, relation.sibling, '兄弟姐妹'), (0, _defineProperty3.default)(_S2, relation.friend, '朋友'), (0, _defineProperty3.default)(_S2, relation.children, '子女'), (0, _defineProperty3.default)(_S2, relation.grandchildren, '晚辈'), (0, _defineProperty3.default)(_S2, relation.patient, '患者'), (0, _defineProperty3.default)(_S2, relation.partner, '相关者'), _S2);

    return S[r] || decodeCommonRelation(r);
};

var tag = {
    VIP: 501,
    regularCostomer: 601,
    hospitalInsider: 701
};

var decodeTag = function decodeTag(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, tag.VIP, 'VIP顾客'), (0, _defineProperty3.default)(_T, tag.regularCostomer, '熟客'), (0, _defineProperty3.default)(_T, tag.hospitalInsider, '医院内部人士'), _T);
};
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    tag: tag,
    decodeTag: decodeTag,
    action: action,
    decodeAction: decodeAction
};