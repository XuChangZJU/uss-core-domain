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
    grantee: 1001,     // 获权使用者
}, commonRelation);

const decodeRelation = (r) => {
    const STRING = {
        [relation.grantee]: '获权使用',
    };

    return STRING[r] || decodeCommonRelation(r);
};

const decodeGrantRelationAction = (r, grant) => {
    const STRING_GRANT = {
        [relation.grantee]: '分享会员卡',
    };
    const STRING_CONFIRM = {
        [relation.keeper]: '分享给您一张会员卡',
    };

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

const action = Object.assign({
    produceAmount: 1001,
    produceScore: 1002,
    produceTimes: 1003,

    consumeAmount: 2001,
    consumeScore: 2002,
    consumeTimes: 2003,

    // createCard: 5001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.produceAmount]: '余额充值',
        [action.produceScore]: '积分充值',
        [action.produceTimes]: '次数充值',
        [action.consumeAmount]: '消费余额',
        [action.consumeScore]: '消费积分',
        [action.consumeTimes]: '消费次数',

        // [action.createCard]: '开卡',

        [action.expires]: '过期',
        [action.forbid]: '禁用',
        [action.dropBySelf]: '自丢弃',
        [action.dropByShop]: '店家删除',
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

const grantMatrix = {
    [relation.owner]: [relation.grantee],
};

module.exports = {
    relation,
    decodeRelation,
    decodeGrantRelationAction,
    action,
    decodeAction,
    grantMatrix,
};
