/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
const action = {
    create: 1,
    update: 2,
    remove: 3,
    grant: 11,
    revoke: 12,
    abandon: 13,
};

// 全局抽象的关系 0-1000
const relation = {
    owner: 1,
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新数据',
        [action.remove]: '删除',
        [action.grant]: '授予',
        [action.revoke]: '回收',
        [action.abandon]: '放弃',
    };

    return STRINGS[a];
};

const decodeRelation = (r) => {
    const STRINGS = {
        [relation.owner]: '所有者',
    };
    return STRINGS[r];
}

module.exports = {
    action,
    decodeAction,

    relation,
    decodeRelation,
};
