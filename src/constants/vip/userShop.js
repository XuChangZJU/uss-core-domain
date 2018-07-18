/**
 * Created by Administrator on 2018/7/9.
 */
const type = {
    owner: 1,       // 创始人
    partner: 2,     // 合伙人
    manager: 3,     // 管理员

    keeper: 11,     // 店长
    worker: 12,      // 店员
};

const decodeType = (t) => {
    const STRING = {
        [type.owner]: '创始人',
        [type.partner]: '合伙人',
        [type.manager]: '管理员',
        [type.keeper]: !'店长',
        [type.worker]: '店员',
    };

    return STRING[t];
};

const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');

const action = Object.assign({
    addPartner: 101,
    removePartner: 102,
    addManager: 201,
    removeManager: 202,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.addPartner]: '增加合伙人',
        [action.removePartner]: '移除合伙人',
        [action.addManager]: '增加管理员',
        [action.removeManager]: '移除管理员',
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
}

module.exports = {
    type,
    decodeType,
    action,
    decodeAction,
};
