/**
 * Created by Administrator on 2018/7/9.
 */
const state = {
    available: 10,
    expired: 1001,
    forbidden: 1002,
};

const decodeState = (s) => {
    const STRING = {
        [state.available]: '可用的',
        [state.expired]: '过期的',
        [state.forbidden]: '禁用的',
    };
    return STRING[s];
};

module.exports = {
    state,
    decodeState,
};
