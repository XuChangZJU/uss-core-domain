/**
 * Created by Administrator on 2019/7/30.
 */
const { state, decodeState } = require('../action');

const category = {
    online: 1,
    device: 2,
    supply: 3,

    demand: 11,
    test: 12,
};

const decodeCategory = (c) => {
    const S = {
        [category.online]: '线上商城',
        [category.device]: '线下设备',
        [category.supply]: '经销供货',

        [category.demand]: '管理员指令',
        [category.test]: '测试',
    };

    return S[c];
};

module.exports = {
    state,
    decodeState,
    category,
    decodeCategory,
};
