/**
 * Created by Administrator on 2018/7/9.
 */
const type = {
    owner: 1,       // 创始人
    partner: 2,     // 合伙人
    manager: 3,     // 管理员
};

const decodeType = (t) => {
    const STRING = {
        [type.owner]: '创始人',
        [type.partner]: '合伙人',
        [type.manager]: '管理员',
    };

    return STRING[t];
};

module.exports = {
    type,
    decodeType,
};
