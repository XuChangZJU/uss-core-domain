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

module.exports = {
    action,
    decodeAction,
    category,
    decodeCategory,
};
