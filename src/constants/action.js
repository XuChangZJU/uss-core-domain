/**
 * Created by Administrator on 2018/7/18.
 */
const action = {
    create: 1,
    update: 2,
    remove: 3,
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新数据',
        [action.remove]: '删除',
    };

    return STRINGS[a];
};

module.exports = {
    action,
    decodeAction,
};
