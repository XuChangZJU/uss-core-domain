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
    dispatch: 1002,

    send: 3001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.use]: '使用',
        [action.dispatch]: '发放',
        [action.send]: '转赠',
        [action.expires]: '过期',
        [action.forbid]: '禁用',
        [action.dropBySelf]: '自丢弃',
        [action.dropByShop]: '店家删除',
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
}

module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
};
