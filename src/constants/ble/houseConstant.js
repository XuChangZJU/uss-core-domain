/**
 * Created by Administrator on 2019/1/28.
 */
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

const state = {
    uncompleted: 1,
    online: 11,
    offline: 12,
    offlineByPlatform: 101,
};

const decodeState = (s) => {
    const STRING = {
        [state.uncompleted]: '未完成',
        [state.online]: '已上线',
        [state.offline]: '已下线',
        [state.offlineByPlatform]: '被下线'
    };

    return STRING[s];
}

module.exports = {
    category,
    decodeCategory,
    state,
    decodeState,
};
