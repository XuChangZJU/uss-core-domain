/**
 * Created by Xc on 2021/1/7.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const state = {
    online: 1,
    offline: 11,
    disabled: 21,
    fresh: 22,
};

const decodeState = (s) => {
    const TEXT = {
        [state.online]: '上线中',
        [state.offline]: '下线中',
        [state.disabled]: '禁用中',
        [state.fresh]: '未审核',
    };

    return TEXT[s];
};

const action =  Object.assign({}, commonAction,
    {
        online: 101,
        offline: 111,
        disable: 211,
    },
);

const decodeAction = (a) => {
    const TEXT = {
        [action.online]: '上线',
        [action.offline]: '下线',
        [action.disable]: '禁用',
    };

    return TEXT[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.online]: [[state.fresh, state.offline, state.disabled], state.online],
    [action.offline]: [state.online, state.offline],
    [action.disable]: [[state.online, state.offline], state.disabled],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};

