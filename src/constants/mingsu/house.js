/**
 * Created by Administrator on 2019/1/28.
 */
const {
    state: CommonState,
    decodeState: decodeCommonState,
    action: CommonAction,
    decodeAction: decodeCommonAction,
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
}

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

module.exports = {
    category,
    decodeCategory,
    state,
    decodeState,
    membership,
    decodeMembership,
    action,
    decodeAction,
};
