/**
 * Created by Administrator on 2018/7/9.
 */
const state = {
    free: 10,
    bound: 101,
};

const decodeState = (s) => {
    const STRING = {
        [state.free]: '空闲的',
        [state.bound]: '绑定的',
    };

    return STRING[s];
};

module.exports = {
    state,
    decodeState,
};
