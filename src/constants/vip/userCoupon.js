/**
 * Created by Administrator on 2018/7/9.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    } = require('../action');

const relation = Object.assign({
    inheritor: 1001,     // 获赠者
}, commonRelation);

const decodeRelation = (t) => {
    const STRING = {
        [relation.inheritor]: '获赠者',
    };

    return STRING[t] || decodeCommonRelation(t);
};

const action = Object.assign({
    use: 1001,

    send: 3001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.use]: '使用',
        [action.send]: '转赠',
        [action.expires]: '过期',
        [action.forbid]: '禁用',
        [action.dropBySelf]: '自丢弃',
        [action.dropByShop]: '店家删除',
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
}

const state = {
    available: 10,
    expired: 1001,
    used: 1002,
    forbidden: 1003,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.available]: '可用的',
        [state.expired]: '过期的',
        [state.used]: '用过的',
        [state.forbidden]: '禁用的',
    };

    return STRINGS[s];
}

module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
};
