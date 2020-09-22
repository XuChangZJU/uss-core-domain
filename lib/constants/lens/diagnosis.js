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
    fitted: 310,
    unfitted: 301,
    expired: 511
};
var category = {
    'normal': 1,
    'OKGlasses': 2
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.normal, '普通业务'), _defineProperty(_C, category.OKGlasses, '角膜塑形镜业务'), _C);
    return C[c];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.unfitted, '价格不匹配'), _defineProperty(_S, state.fitted, '价格匹配'), _defineProperty(_S, state.expired, '已过期'), _S);

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
    seller: 1001, // 营业员
    doctor: 1002
});

var decodeRelation = function decodeRelation(r) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, relation.seller, '营业员'), _defineProperty(_T, relation.doctor, '业务扩展人员'), _T);

    return T[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.expire, [state.unfitted, state.expired]);

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