/**
 * Created by Xc on 2020/2/20.
 */
const {
    action,
    decodeAction,
} = require('../action');

const category = {
    start: 1,
    off: 2,
}
const decodeCategory = (c) => {
    const C = {
        [category.start]: '上班',
        [category.off]: '下班',
    }
    return C[c];
}
const state = {
    normal: 1,
    add: 2,
}
const decodeState = (s) => {
    const S = {
        [state.normal]: '正常打卡',
        [category.add]: '补卡',
    }
    return S[s];
}


module.exports = {
    action,
    decodeAction,
    category,
    decodeCategory,
};
