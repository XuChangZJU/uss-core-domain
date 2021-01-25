'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    online: 1,
    offline: 11,
    disabled: 21,
    fresh: 22
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.online, '上线中'), _defineProperty(_TEXT, state.offline, '下线中'), _defineProperty(_TEXT, state.disabled, '禁用中'), _defineProperty(_TEXT, state.fresh, '未审核'), _TEXT);

    return TEXT[s];
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
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, type.microBusiness, '小微商户'), _defineProperty(_TEXT2, type.selfEmployedSeller, '个人卖家'), _defineProperty(_TEXT2, type.selfEmployedBusiness, '个体工商户'), _defineProperty(_TEXT2, type.company, '企业'), _defineProperty(_TEXT2, type.office, '党政，机关及事业单位'), _defineProperty(_TEXT2, type.others, '其他'), _TEXT2);
    return TEXT[t];
};

var action = Object.assign({}, commonAction, {
    online: 301,
    offline: 401,
    disable: 501
});

var decodeAction = function decodeAction(a) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, _defineProperty(_TEXT3, action.online, '上线'), _defineProperty(_TEXT3, action.offline, '下线'), _defineProperty(_TEXT3, action.disable, '禁用'), _TEXT3);

    return TEXT[a] || decodeCommonAction(a);
};

var relation = Object.assign({}, commonRelation, {
    seller: 1001 // 营业员
});

var decodeRelation = function decodeRelation(r) {
    var T = _defineProperty({}, relation.seller, '营业员');

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