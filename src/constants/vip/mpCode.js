/**
 * Created by Administrator on 2018/7/9.
 */
const state = {
    fresh: 1,
    free: 10,
    bound: 101,
};

const entity = {
    shop: 1,
    useCard: 2,
};

const decodeState = (s) => {
    const STRING = {
        [state.fresh]: '新鲜的',
        [state.free]: '空闲的',
        [state.bound]: '绑定的',
    };

    return STRING[s];
};

const decodeEntity = (s) => {
    const STRING = {
        [entity.shop]: '门店',
        [entity.useCard]: '会员卡使用',
    };

    return STRING[s];
};

module.exports = {
    state,
    decodeState,
    entity,
    decodeEntity
};
