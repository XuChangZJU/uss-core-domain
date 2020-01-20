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

module.exports = {
    category,
    decodeCategory,
};
