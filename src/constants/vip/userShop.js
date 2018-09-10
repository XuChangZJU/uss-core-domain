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
    keeper: 1001,     // 店长
    worker: 1002,      // 店员
}, commonRelation);

const decodeRelation = (r) => {
    const STRING = {
        [relation.keeper]: '店长',
        [relation.worker]: '店员',
    };

    return STRING[r] || decodeCommonRelation(r);
};

const decodeGrantRelationAction = (r, grant) => {
    const STRING_GRANT = {
        [relation.keeper]: '邀请店长',
        [relation.worker]: '邀请店员',
    };
    const STRING_CONFIRM = {
        [relation.keeper]: '邀请您成为店长',
        [relation.worker]: '邀请您成为店员',
    };

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

const action = Object.assign({
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

const grantMatrix = {
    [relation.owner]: [relation.keeper, relation.worker],
    [relation.keeper]: [relation.worker],
};

module.exports = {
    relation,
    decodeRelation,
    decodeGrantRelationAction,
    action,
    decodeAction,
    grantMatrix,
};
