/**
 * Created by Administrator on 2020/1/20.
 */

const category = {
    checkInBySelf: 1,
    checkInByOthers: 2,
    takeOffBySelf: 21,
    takeOffByOthers: 22,
};

const decodeCategory = (c) => {
    const S = {
        [category.checkInBySelf]: '本人打卡',
        [category.checkInByOthers]: '他人代打',
        [category.takeOffBySelf]: '本人请假',
        [category.takeOffByOthers]: '他人请假',
    };

    return S[c];
};

const result = {
    success: 1,
    suspicious: 11,
    rejected: 21,
};

const decodeResult = (r) => {
    const S = {
        [result.success]: '成功的',
        [result.suspicious]: '可疑的',
        [result.rejected]: '拒绝的',
    };

    return S[r];
};

module.exports = {
    category,
    decodeCategory,
    result,
    decodeResult,
};
