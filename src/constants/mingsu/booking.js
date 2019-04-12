/**
 * Created by Administrator on 2019/1/28.
 */
const {
    state,
    decodeState,
    action,
    decodeAction,
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
    action,
    decodeAction,
    state,
    decodeState,
    category,
    decodeCategory,
};
