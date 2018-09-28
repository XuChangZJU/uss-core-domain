/**
 * Created by Administrator on 2018/7/9.
 */
const state = {
    fresh: 1,
    free: 10,
    reserved: 50,
    bound: 101,
};

const entity = {
    shop: 1,
    vehicle: 2,
};

const decodeState = (s) => {
    const STRING = {
        [state.fresh]: '新鲜的',
        [state.free]: '空闲的',
        [state.reserved]: '保留的',
        [state.bound]: '绑定的',
    };

    return STRING[s];
};

const decodeEntity = (s) => {
    const STRING = {
        [entity.shop]: '加盟店',
        [entity.vehicle]: '车辆',
    };

    return STRING[s];
};

module.exports = {
    state,
    decodeState,
    entity,
    decodeEntity
};
