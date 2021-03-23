const {
    action,
    decodeAction,
} = require('../action');

const state = {
    active: 1,
    expired: 2,
};

const decodeState = (s) => {
    const TEXT = {
        [state.active]: '生效中',
        [state.expired]: '已过期',
    };

    return TEXT[s];
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
};
