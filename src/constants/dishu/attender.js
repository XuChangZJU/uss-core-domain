/**
 * Created by Administrator on 2020/1/20.
 */
const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation: CommonRelation, 
    decodeRelation: decodeCommonRelation
} = require('../action');


const relation = Object.assign({}, CommonRelation, {
    self: 101,
    father: 111,
    mother: 112,
    eldership: 113,
    sibling: 121,
    friend: 122,
    colleague: 123,
});


const decodeRelation = (r) => {
    const S = {
        [relation.self]: '本人',
        [relation.father]: '父亲',
        [relation.mother]: '母亲',
        [relation.eldership]: '长辈',
        [relation.sibling]: '兄弟姐妹',
        [relation.friend]: '朋友',
        [relation.colleague]: '同事',
    };

    return S[r] || decodeCommonRelation(r);
};

const action = Object.assign({}, CommonAction, {
    check: 181,
});

const decodeAction = (a) => {
    const S = {
        [action.check]: '签到',
    };

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
};
