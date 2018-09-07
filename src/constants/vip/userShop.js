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

const decodeRelation = (t) => {
    const STRING = {
        [relation.keeper]: '店长',
        [relation.worker]: '店员',
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
};

const grantMatrix = {
    [relation.owner]: [relation.keeper, relation.worker],
    [relation.keeper]: [relation.worker],
};

module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
    grantMatrix,
};
