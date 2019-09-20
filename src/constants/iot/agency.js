/**
 * Created by Administrator on 2019/7/8.
 */
const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation,
    decodeRelation,
} = require('../action');

const action = Object.assign({}, CommonAction, {
    setAgencySkuPrice: 101,
});


const decodeAction = (a) => {
    const S = {
        [action.setAgencySkuPrice]: '设置进货价格',
    };

    return S[a] || decodeCommonAction(a);
};



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
    action,
    decodeAction,
    relation,
    decodeRelation,
};
