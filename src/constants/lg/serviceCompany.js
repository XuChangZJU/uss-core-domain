const {
    action,
    decodeAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const type = {
    'guide': 1,
    'taxi': 2,
};

const decodeType = (t) => {
    const T = {
        [type.guide]: '导游公司',
        [type.taxi]: '出租车公司',
    }
    return T[t];
}
const relation = Object.assign({}, commonRelation, {
    'worker': 301,
    'seller': 401,
    'driver': 501,
})
const decodeRelation = (a) => {
    const TEXT = {
        [relation.worker]: '员工',
        [relation.seller]: '销售',
        [relation.driver]: '司机',
    };

    return TEXT[a] || decodeCommonRelation(a);
};
module.exports = {
    action,
    decodeAction,
    type,
    decodeType,
    relation,
    decodeRelation,
};


