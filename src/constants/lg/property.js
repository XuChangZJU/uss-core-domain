/**
 * Created by Xc on 2021/1/8.
 */
const type = {
    enumerable: 1,
    assignable: 2,
};

const decodeType = (t) => {
    const TEXT = {
        [type.enumerable]: '枚举的',
        [type.assignable]: '赋值的',
    };

    return TEXT[t];
};

module.exports = {
    type,
    decodeType,
};
