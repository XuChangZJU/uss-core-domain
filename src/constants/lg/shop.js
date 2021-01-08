/**
 * Created by Xc on 2021/1/7.
 */
const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
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

const action = {
    online: 1,
    offline: 11,
    disable: 21,
};

const decodeAction = (a) => {
    const TEXT = {
        [action.online]: '上线',
        [action.offline]: '下线',
        [action.disable]: '禁用',
    };

    return TEXT[a];
};


const relation = Object.assign({}, commonRelation, {
    seller: 1001,        // 营业员
    master: 1011,        // 管理员
});

const decodeRelation = (r) => {
    const T = {
        [relation.seller]: '营业员',
        [relation.master]: '管理员',
    };

    return T[r] || decodeCommonRelation(r);
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
    relation,
    decodeRelation,
    STATE_TRANS_MATRIX,
};

