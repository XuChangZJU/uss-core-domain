/**
 * Created by Administrator on 2019/1/28.
 */
const {
    state,
    decodeState,
} = require('../action');

const category = {
    platform: 1,
    fromLord: 2,
};

const decodeCategory = (c) => {
    const STRING = {
        [category.platform]: '来自平台',
        [category.fromLord]: '房东建立',
    };

    return STRING[c];
}

module.exports = {
    state,
    decodeState,
    category,
    decodeCategory,
};
