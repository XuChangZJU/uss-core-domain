/**
 * Created by Administrator on 2020/1/20.
 */
const { action, decodeAction } = require('../action');

const category = {
    checkIn: 1,
    takeOff: 21,
    makeUp: 31,
    absence: 101,
};

const decodeCategory = (c) => {
    const S = {
        [category.checkIn]: '打卡',
        [category.takeOff]: '请假',
        [category.makeUp]: '补打',
        [category.absence]: '缺席',
    };

    return S[c];
};

const result = {
    success: 1,
    suspicious: 11,
    rejected: 21,
    uncertain: 101,
};

const decodeResult = (r) => {
    const S = {
        [result.success]: '成功的',
        [result.suspicious]: '可疑的',
        [result.rejected]: '拒绝的',
        [result.uncertain]: '待检查的',
    };

    return S[r];
};

module.exports = {
    category,
    decodeCategory,
    result,
    decodeResult,
    action,
    decodeAction,
};
