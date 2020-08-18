'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511
};
var category = _defineProperty({
    'makeGlasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'consumables': 4,
    'visionTraining': 5,
    'makeGlassesRecheck': 6,
    'OKGlassesRecheck': 7
}, 'visionTraining', 8);
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.makeGlasses, 1), _defineProperty(_C, category.OKGlasses, 2), _defineProperty(_C, category.DoneGlasses, 3), _defineProperty(_C, category.consumables, 4), _defineProperty(_C, category.visionTraining, 5), _defineProperty(_C, category.makeGlassesRecheck, 6), _defineProperty(_C, category.OKGlassesRecheck, 7), _defineProperty(_C, category.visionTraining, 8), _C);
    return C[c];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.noTrade, '无交易'), _defineProperty(_S, state.hasTrade, '有交易'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    expire: 320
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.expire, '过期');

    return S[a] || decodeCommonAction(a);
};

var relation = Object.assign({}, commonRelation, {
    seller: 1001 // 营业员
});

var decodeRelation = function decodeRelation(r) {
    var T = _defineProperty({}, relation.seller, '营业员');

    return T[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.expire, [state.noTrade, state.expired]);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};