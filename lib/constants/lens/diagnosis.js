'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    fitted: 310,
    unfitted: 301,
    expired: 511
});
var category = {
    'normal': 1,
    'OKGlasses': 2,
    'check': 3
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, category.normal, '普通业务'), (0, _defineProperty3.default)(_C, category.OKGlasses, '角膜塑形镜业务'), (0, _defineProperty3.default)(_C, category.check, '检查'), _C);
    return C[c];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.unfitted, '价格不匹配'), (0, _defineProperty3.default)(_S, state.fitted, '价格匹配'), (0, _defineProperty3.default)(_S, state.expired, '已过期'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    expire: 320

});

var decodeAction = function decodeAction(a) {
    var S = (0, _defineProperty3.default)({}, action.expire, '过期');

    return S[a] || decodeCommonAction(a);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    seller: 1001, // 营业员
    doctor: 401,
    VIP: 501,
    regularCostomer: 601,
    hospitalInsider: 701,
    others: 801
});

var decodeRelation = function decodeRelation(r) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, relation.seller, '营业员'), (0, _defineProperty3.default)(_T, relation.doctor, '验光医生'), (0, _defineProperty3.default)(_T, relation.VIP, 'VIP顾客'), (0, _defineProperty3.default)(_T, relation.regularCostomer, '熟客'), (0, _defineProperty3.default)(_T, relation.hospitalInsider, '医院内部人士'), (0, _defineProperty3.default)(_T, relation.others, '其他'), _T);
    return T[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (0, _defineProperty3.default)({}, action.expire, [state.unfitted, state.expired]);

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