/**
 * Created by Administrator on 2018/7/9.
 */
const action = {
    create: 1,
    produceAmount: 11,
    produceScore: 12,
    produceTimes: 13,

    consumeAmount: 101,
    consumeScore: 102,
    consumeTimes: 103,

    grant: 201,
    revoke: 202,
    abandon: 203,

    send: 301,

    expires: 1001,
    forbid: 1002,
    dropBySelf: 1003,
    dropByShop: 1004,
};

const decodeAction = (a) => {
    const STRING = {
        [action.create]: '开卡',
        [action.produceAmount]: '余额充值',
        [action.produceScore]: '积分充值',
        [action.produceTimes]: '次数充值',
        [action.consumeAmount]: '消费余额',
        [action.consumeScore]: '消费积分',
        [action.consumeTimes]: '消费次数',
        [action.grant]: '授权',
        [action.revoke]: '收回授权',
        [action.abandon]: '放弃授权',
        [action.send]: '转赠',
        [action.expires]: '过期',
        [action.forbid]: '禁用',
        [action.dropBySelf]: '自丢弃',
        [action.dropByShop]: '店家删除',
    };

    return STRING[a];
};

module.exports = {
    action,
    decodeAction,
};
