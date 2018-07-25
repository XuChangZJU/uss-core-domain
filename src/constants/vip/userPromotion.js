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
    manager: 1002,      // 管理员
}, commonRelation);

const decodeRelation = (t) => {
    const STRING = {
        [relation.manager]: '管理员',
    };

    return STRING[t] || decodeCommonRelation(t);
};

const action = Object.assign({
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
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
