/**
 * Created by Administrator on 2018/7/9.
 */
const action = {
    create: 1,
    use: 101,

    send: 301,

    expires: 1001,
    forbid: 1002,
    dropBySelf: 1003,
    dropByShop: 1004,
};

const decodeAction = (a) => {
    const STRING = {
        [action.create]: '领劵',
        [action.use]: '使用',
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
