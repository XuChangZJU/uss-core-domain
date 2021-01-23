'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/7.
 */
var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = {
    online: 1,
    offline: 11,
    disabled: 21,
    fresh: 22
};
var type = {
    microBusiness: 1,
    selfEmployedSeller: 2,
    selfEmployedBusiness: 3,
    company: 4,
    office: 5,
    others: 6
};
var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.microBusiness, '小微商户'), _defineProperty(_T, type.selfEmployedSeller, '个人卖家'), _defineProperty(_T, type.selfEmployedBusiness, '个体工商户'), _defineProperty(_T, type.company, '企业'), _defineProperty(_T, type.office, '党政，机关及事业单位'), _defineProperty(_T, type.others, '其他'), _T);
};
var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.online, '上线中'), _defineProperty(_TEXT, state.offline, '下线中'), _defineProperty(_TEXT, state.disabled, '禁用中'), _defineProperty(_TEXT, state.fresh, '未审核'), _TEXT);

    return TEXT[s];
};

var action = {
    online: 1,
    offline: 11,
    disable: 21
};

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.online, '上线'), _defineProperty(_TEXT2, action.offline, '下线'), _defineProperty(_TEXT2, action.disable, '禁用'), _TEXT2);

    return TEXT[a];
};

var relation = Object.assign({}, commonRelation, {
    seller: 1001, // 营业员
    master: 1011 // 管理员
});

var decodeRelation = function decodeRelation(r) {
    var _T2;

    var T = (_T2 = {}, _defineProperty(_T2, relation.seller, '营业员'), _defineProperty(_T2, relation.master, '管理员'), _T2);

    return T[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.online, [[state.fresh, state.offline, state.disabled], state.online]), _defineProperty(_STATE_TRANS_MATRIX, action.offline, [state.online, state.offline]), _defineProperty(_STATE_TRANS_MATRIX, action.disable, [[state.online, state.offline], state.disabled]), _STATE_TRANS_MATRIX);

module.exports = {
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};