/**
 * Created by Administrator on 2018/6/8.
 */
const state = {
    fresh: 1,
    pushed: 2,
    failed: 3,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.fresh]: '新的',
        [state.pushed]: '已推送的',
        [state.failed1]: '推送失败的',
    };

    return STRINGS[s];
};

module.exports = {
    state,
    decodeState,
};
