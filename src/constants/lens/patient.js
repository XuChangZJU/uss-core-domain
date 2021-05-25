
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');


const action = Object.assign({}, commonAction, {
    sendMessage: 311,
});

const decodeAction = (r) => {
    const S = {
        [action.sendMessage]: '发消息'
    };

    return S[r] || decodeCommonRelation(r);
};

const relation = Object.assign({}, commonRelation, {
    parent: 111,
    eldership: 112,
    mate: 121,
    sibling: 122,
    friend: 123,
    children: 131,
    grandchildren: 132,
    patient: 141,
    partner: 151,
});


const decodeRelation = (r) => {
    const S = {
        [relation.owner]: '本人',
        [relation.parent]: '父/母',
        [relation.mate]: '配偶',
        [relation.eldership]: '长辈',
        [relation.sibling]: '兄弟姐妹',
        [relation.friend]: '朋友',
        [relation.children]: '子女',
        [relation.grandchildren]: '晚辈',
        [relation.patient]: '患者',
        [relation.partner]: '相关者',
    };

    return S[r] || decodeCommonRelation(r);
};

const tag = {
    VIP: 501,
    regularCostomer: 601,
    hospitalInsider: 701,
};

const decodeTag = (t) => {
    const T = {
        [tag.VIP]: 'VIP顾客',
        [tag.regularCostomer]: '熟客',
        [tag.hospitalInsider]: '医院内部人士',
    }
}
module.exports = {
    relation,
    decodeRelation,
    tag,
    decodeTag,
    action,
    decodeAction,
};
