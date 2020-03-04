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
    ascendant: 111,
    sibling: 121,
    descendant: 131,
    friend: 141,
    colleague: 142,
});


const decodeRelation = (r) => {
    const S = {
        [relation.self]: '本人',
        [relation.ascendant]: '长辈',
        [relation.sibling]: '兄弟姐妹',
        [relation.descendant]: '晚辈',
        [relation.friend]: '朋友',
        [relation.colleague]: '同事',
        [relation.child]:'子女',
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
