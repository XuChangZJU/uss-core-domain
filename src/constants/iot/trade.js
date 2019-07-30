/**
 * Created by Administrator on 2019/7/30.
 */
const { state, decodeState } = require('../action');

const category = {
    online: 1,
    device: 2,
};

const decodeCategory = (c) => {
    const S = {
        [category.online]: '线上商城',
        [category.device]: '线下设备',
    };

    return S[c];
};

module.exports = {
    state,
    decodeState,
    category,
    decodeCategory,
};
