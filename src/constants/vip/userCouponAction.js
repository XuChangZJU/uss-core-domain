/**
 * Created by Administrator on 2018/7/9.
 */
const action = {
    create: 1,
    use: 101,

    send: 301,

    expires: 1001,
    forbid: 1002,
    drop: 1003,
};

const decodeAction = (a) => {
    const STRING = {
        [action.create]: '领劵',
        [action.use]: '使用',
        [action.send]: '转赠',
        [action.expires]: '过期',
        [action.forbid]: '禁用',
        [action.drop]: '丢弃',
    };

    return STRING[a];
};

module.exports = {
    action,
    decodeAction,
};
