
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');


const relation = Object.assign({}, commonRelation, {
    father: 111,
    mother: 112,
    eldership: 113,
    sibling: 121,
    friend: 122,
    colleague: 123,
    spouse: 124,
    child: 125,
});


const decodeRelation = (r) => {
    const S = {
        [relation.owner]: '本人',
        [relation.father]: '父亲',
        [relation.mother]: '母亲',
        [relation.eldership]: '长辈',
        [relation.sibling]: '兄弟姐妹',
        [relation.friend]: '朋友',
        [relation.colleague]: '同事',
        [relation.spouse]: '配偶',
        [relation.child]: '子女',
    };

    return S[r] || decodeCommonRelation(r);
};


module.exports = {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
};
