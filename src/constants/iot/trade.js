/**
 * Created by Administrator on 2019/7/30.
 */
const { state, decodeState } = require('../action');

const category = {
    online: 1,
    device: 2,
    supply: 3,
};

const decodeCategory = (c) => {
    const S = {
        [category.online]: '线上商城',
        [category.device]: '线下设备',
        [category.supply]: '经销供货',
    };

    return S[c];
};

module.exports = {
    state,
    decodeState,
    category,
    decodeCategory,
};
