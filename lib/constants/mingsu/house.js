'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/1/28.
 */
var _require = require('../action'),
    CommonState = _require.state,
    decodeCommonState = _require.decodeState,
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var category = {
    house: 1,
    flatShare: 2,
    tavern: 5,
    apartment: 13,
    hotel: 15,
    spec: 99,
    room: 199
};

var decodeCategory = function decodeCategory(c) {
    var _CATEGORY_MATRIX;

    var CATEGORY_MATRIX = (_CATEGORY_MATRIX = {}, _defineProperty(_CATEGORY_MATRIX, category.house, '整租'), _defineProperty(_CATEGORY_MATRIX, category.flatShare, '合租'), _defineProperty(_CATEGORY_MATRIX, category.tavern, '民宿'), _defineProperty(_CATEGORY_MATRIX, category.apartment, '公寓'), _defineProperty(_CATEGORY_MATRIX, category.hotel, '酒店'), _defineProperty(_CATEGORY_MATRIX, category.spec, '规格'), _defineProperty(_CATEGORY_MATRIX, category.room, '单间'), _CATEGORY_MATRIX);
    return CATEGORY_MATRIX[c];
};

var state = Object.assign({
    uncompleted: 10001,
    online: 10011,
    offline: 10012,
    offlineByPlatform: 10101
}, CommonState);

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.uncompleted, '未完成'), _defineProperty(_STRING, state.online, '已上线'), _defineProperty(_STRING, state.offline, '已下线'), _defineProperty(_STRING, state.offlineByPlatform, '被下线'), _STRING);

    return decodeCommonState(s) || STRING[s];
};

var membership = {
    level0: 1,
    level1: 10,
    level2: 100
};

var decodeMembership = function decodeMembership(ms) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, membership.level0, '普通民宿'), _defineProperty(_STRING2, membership.level1, 'B级会员民宿'), _defineProperty(_STRING2, membership.level2, 'B级共享会员'), _STRING2);

    return STRING[ms];
};

var action = Object.assign({
    bind: 1001,
    unbind: 1002,
    changeBind: 1003,
    online: 1010,
    offline: 1011
}, CommonAction);

var decodeAction = function decodeAction(a) {
    var _STRING3;

    var STRING = (_STRING3 = {}, _defineProperty(_STRING3, action.bind, '绑定锁'), _defineProperty(_STRING3, action.unbind, '解绑锁'), _defineProperty(_STRING3, action.changeBind, '换绑锁'), _defineProperty(_STRING3, action.online, '上线'), _defineProperty(_STRING3, action.offline, '下线'), _STRING3);

    return decodeCommonAction(a) || STRING[a];
};

var relation = Object.assign({
    cleaner: 1001 // 清洁人员
}, CommonRelation);

var decodeRelation = function decodeRelation(r) {
    var STRING = _defineProperty({}, relation.cleaner, '清洁人员');

    return STRING[r] || decodeCommonRelation(r);
};

var spec = {
    single: '单人间',
    double: '双人间',
    bigBed: '大床房',
    childish: '儿童房',
    zotheca: '套房',
    distinctive: '特色房'
};

var BookingInfoEnum = {
    PriceOffSeason: 1.00, // 淡季价格
    PriceOffSeasonWeekend: 1.00, // 淡季周末价格
    PriceHighSeason: 1.00, // 旺季价格
    PriceHighSeasonWeekend: 1.00, // 旺季周末价格
    DiscountPFS: 15, // 淡季价格折扣
    DiscountPFSW: 15, // 淡季周末价格折扣
    DiscountPHS: 15, // 旺季价格折扣
    DiscountPHSW: 15, // 旺季周末价格折扣
    RefundForFree: { // 免费提前退款（距离入住日的天数）
        none: 0,
        oneDay: 1,
        twoDays: 2,
        threeDays: 3,
        oneWeek: 7
    },
    RefundPenalty: { // 超过限制后的退款政策
        fifteen: 15,
        twenty: 20,
        fifty: 50,
        all: 100
    },
    AllowRefundAfterCheckIn: true, // 入住提前退订仍然退款（退款自商议）
    AllowRefundForHoliday: true, // 节假日的预订仍然可提前退款
    CheckInTime: 14, // 入住时间
    CheckOutTime: 12 // 退订时间
};

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState,
    membership: membership,
    decodeMembership: decodeMembership,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    BookingInfoEnum: BookingInfoEnum,
    spec: spec
};