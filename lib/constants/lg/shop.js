'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    online: 1,
    offline: 11,
    disabled: 21
    // fresh: 22,
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.online, '上线中'), (0, _defineProperty3.default)(_TEXT, state.offline, '下线中'), (0, _defineProperty3.default)(_TEXT, state.disabled, '禁用中'), _TEXT);

    return TEXT[s];
};

var type = {
    microBusiness: 2401,
    selfEmployedSeller: 2500,
    selfEmployedBusiness: 4,
    company: 2,
    office: 3,
    others: 1708
};
var decodeType = function decodeType(t) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, type.microBusiness, '小微商户'), (0, _defineProperty3.default)(_TEXT2, type.selfEmployedSeller, '个人卖家'), (0, _defineProperty3.default)(_TEXT2, type.selfEmployedBusiness, '个体工商户'), (0, _defineProperty3.default)(_TEXT2, type.company, '企业'), (0, _defineProperty3.default)(_TEXT2, type.office, '党政，机关及事业单位'), (0, _defineProperty3.default)(_TEXT2, type.others, '其他'), _TEXT2);
    return TEXT[t];
};

var category = {
    offShoreDutyFree: 1,
    notOffShoreDutyFree: 2
};

var decodeCategory = function decodeCategory(t) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, (0, _defineProperty3.default)(_TEXT3, category.offShoreDutyFree, '离岛免税'), (0, _defineProperty3.default)(_TEXT3, category.notOffShoreDutyFree, '非离岛免税'), _TEXT3);
    return TEXT[t];
};
var action = (0, _assign2.default)({}, commonAction, {
    online: 301,
    offline: 401,
    disable: 501,
    able: 601
});

var decodeAction = function decodeAction(a) {
    var _TEXT4;

    var TEXT = (_TEXT4 = {}, (0, _defineProperty3.default)(_TEXT4, action.online, '上线'), (0, _defineProperty3.default)(_TEXT4, action.offline, '下线'), (0, _defineProperty3.default)(_TEXT4, action.disable, '禁用'), (0, _defineProperty3.default)(_TEXT4, action.able, '启用'), _TEXT4);

    return TEXT[a] || decodeCommonAction(a);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    seller: 1001 // 营业员
});

var decodeRelation = function decodeRelation(r) {
    var T = (0, _defineProperty3.default)({}, relation.seller, '营业员');

    return T[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.online, [state.offline, state.online]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.offline, [state.online, state.offline]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.disable, [[state.online, state.offline], state.disabled]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.able, [state.disabled, state.online]), _STATE_TRANS_MATRIX);

module.exports = {
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    category: category,
    decodeCategory: decodeCategory,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};