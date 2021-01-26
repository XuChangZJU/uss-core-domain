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
};

const decodeState = (s) => {
    const TEXT = {
        [state.online]: '已上架',
        [state.offline]: '已下架',
    };

    return TEXT[s];
};

const action =  Object.assign({}, commonAction,
    {
        online: 101,
        offline: 111,
    },
);

const decodeAction = (a) => {
    const TEXT = {
        [action.online]: '上架',
        [action.offline]: '下架',
    };

    return TEXT[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.online]: [state.offline, state.online],
    [action.offline]: [state.online, state.offline],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};

