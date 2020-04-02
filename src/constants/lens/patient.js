
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');


const relation = Object.assign({}, commonRelation, {
    parent: 111,
    eldership: 112,
    mate: 121,
    sibling: 122,
    friend: 123,
    children: 131,
    grandchildren: 132,
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
    };

    return S[r] || decodeCommonRelation(r);
};


module.exports = {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
};
