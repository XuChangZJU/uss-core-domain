/**
 * Created by Administrator on 2019/7/8.
 */
const category = {
    personal: 1,
    enterprise: 2,
};

const decodeCategory = (c) => {
    const S = {
        [category.personal]: '个人',
        [category.enterprise]: '企业',
    };

    return S[c];
};

module.exports = {
    category,
    decodeCategory,
};
