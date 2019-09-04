/**
 * Created by Administrator on 2019/9/2.
 */
const type = [
    {
        name: '进货',
        raise: 1,
    },
    {
        name: '增加数量',
        raise: 1,
    },
    {
        name: '减少数量',
        raise: -1,
    },
    {
        name: '下级拿货',
        raise: -1,
    },
    {
        name: '自动售卖机加货',
        raise: -1,
    },
    {
        name: '商务使用',
        raise: -1,
    },
    {
        name: '意外损失',
        raise: -1,
    },
    {
        name: '线上售出',
        raise: -1,
    },
];

module.exports = {
    type,
};
