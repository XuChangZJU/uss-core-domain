/**
 * Created by Administrator on 2019/1/28.
 */
const {
    state: CommonState,
    decodeState: decodeCommonState,
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');


const category = {
    house: 1,
    flatShare: 2,
    tavern: 5,
    apartment: 13,
    hotel: 15,
    spec: 99,
    room: 199,
};


const decodeCategory = (c) => {
    const CATEGORY_MATRIX = {
        [category.house]: '整租',
        [category.flatShare]: '合租',
        [category.tavern]: '民宿',
        [category.apartment]: '公寓',
        [category.hotel]: '酒店',
        [category.spec]: '规格',
        [category.room]: '单间',
    };
    return CATEGORY_MATRIX[c];
};

const state = Object.assign({
    uncompleted: 10001,
    online: 10011,
    offline: 10012,
    offlineByPlatform: 10101,
}, CommonState);

const decodeState = (s) => {
    const STRING = {
        [state.uncompleted]: '未完成',
        [state.online]: '已上线',
        [state.offline]: '已下线',
        [state.offlineByPlatform]: '被下线'
    };

    return decodeCommonState(s) || STRING[s];
};

const membership = {
    level0: 1,
    level1: 10,
    level2: 100,
};

const decodeMembership = (ms) => {
    const STRING = {
        [membership.level0]: '普通民宿',
        [membership.level1]: 'B级会员民宿',
        [membership.level2]: 'B级共享会员',
    };

    return STRING[ms];
};

const action = Object.assign({
    bind: 1001,
    unbind: 1002,
    changeBind: 1003,
    online: 1010,
    offline: 1011,
}, CommonAction);

const decodeAction = (a) => {
    const STRING = {
        [action.bind]: '绑定锁',
        [action.unbind]: '解绑锁',
        [action.changeBind]: '换绑锁',
        [action.online]: '上线',
        [action.offline]: '下线',
    };

    return decodeCommonAction(a) || STRING[a];
};

const relation = Object.assign({
    cleaner: 1001,          // 清洁人员
}, CommonRelation);

const decodeRelation = (r) => {
    const STRING = {
        [relation.cleaner]: '清洁人员',
    };

    return STRING[r] || decodeCommonRelation(r);
};

const spec = {
    single: 1,
    double: 2,
    bigBed: 3,
    childish: 4,
    zotheca: 5,
    distinctive: 6,
};

const decodeSpec = (s, lang) => {
    const STRING = {
        [spec.single]: '单人间',
        [spec.double]: '双人间',
        [spec.bigBed]: '大床房',
        [spec.childish]: '儿童房',
        [spec.zotheca]: '套房',
        [spec.distinctive]: '特色房',
    };
    return STRING[s];
};

const BookingInfoEnum = {
    PriceOffSeason: 1.00,                // 淡季价格
    PriceOffSeasonWeekend: 1.00,        // 淡季周末价格
    PriceHighSeason: 1.00,                  // 旺季价格
    PriceHighSeasonWeekend: 1.00,           // 旺季周末价格
    DiscountPFS: 15,                 // 淡季价格折扣
    DiscountPFSW: 15,                 // 淡季周末价格折扣
    DiscountPHS: 15,                 // 旺季价格折扣
    DiscountPHSW: 15,                 // 旺季周末价格折扣
    RefundForFree: {        // 免费提前退款（距离入住日的天数）
        none: 0,
        oneDay: 1,
        twoDays: 2,
        threeDays: 3,
        oneWeek: 7,
    },
    RefundPenalty: {        // 超过限制后的退款政策
        fifteen: 15,
        twenty: 20,
        fifty: 50,
        all: 100,
    },
    AllowRefundAfterCheckIn: true,       // 入住提前退订仍然退款（退款自商议）
    AllowRefundForHoliday: true,        // 节假日的预订仍然可提前退款
    CheckInTime:  14,                       // 入住时间
    CheckOutTime: 12,                       // 退订时间
};

module.exports = {
    category,
    decodeCategory,
    state,
    decodeState,
    membership,
    decodeMembership,
    action,
    decodeAction,
    relation,
    decodeRelation,
    BookingInfoEnum,
    spec,
    decodeSpec,
};
