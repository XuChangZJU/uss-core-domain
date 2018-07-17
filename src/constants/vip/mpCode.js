/**
 * Created by Administrator on 2018/7/9.
 */
const state = {
    free: 10,
    bound: 101,
};

const entity = {
    platform: "platform",
    shop: "shop",
    vip: "vip",
    manager: "manager"
};

const decodeState = (s) => {
    const STRING = {
        [state.free]: '空闲的',
        [state.bound]: '绑定的',
    };

    return STRING[s];
};

const decodeEntity = (s) => {
    const STRING = {
        [entity.platform]: '平台',
        [entity.shop]: '门店',
        [entity.vip]: '会员',
        [entity.manager]: '管理员',
    };

    return STRING[s];
};

module.exports = {
    state,
    decodeState,
    entity,
    decodeEntity
};
