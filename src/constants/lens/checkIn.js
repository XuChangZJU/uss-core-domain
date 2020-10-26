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
    late: 3,
    earlyLeave: 4,
    different: 8
}
const decodeState = (s) => {
    const S = {
        [state.normal]: '正常打卡',
        [state.add]: '补卡',
        [state.late]: '迟到',
        [state.earlyLeave]: '早退',
        [state.different]: '打卡门店与排班门店不同'
    }
    return S[s];
}


module.exports = {
    action,
    decodeAction,
    category,
    decodeCategory,
    state,
    decodeState,
};
