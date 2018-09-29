/**
 * Created by Administrator on 2018/9/29.
 */
const Roles = require('./role');

const state = {
    init: 1,
    send: 10,
};

const decodeState = (s) => {
    const STRING = {
        [state.init]: '请求中',
        [state.send]: '已发送',
    };

    return STRING[s];
};

const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [state.init]: [ state.send],
    },
};

module.exports = {
    state,
    decodeState,
    StateTransformMatrix,
};
