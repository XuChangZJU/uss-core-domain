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
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, relation.owner, '本人'), (0, _defineProperty3.default)(_S, relation.parent, '父/母'), (0, _defineProperty3.default)(_S, relation.mate, '配偶'), (0, _defineProperty3.default)(_S, relation.eldership, '长辈'), (0, _defineProperty3.default)(_S, relation.sibling, '兄弟姐妹'), (0, _defineProperty3.default)(_S, relation.friend, '朋友'), (0, _defineProperty3.default)(_S, relation.children, '子女'), (0, _defineProperty3.default)(_S, relation.grandchildren, '晚辈'), (0, _defineProperty3.default)(_S, relation.patient, '患者'), (0, _defineProperty3.default)(_S, relation.partner, '相关者'), _S);

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
    action: commonAction,
    decodeAction: decodeCommonAction
};