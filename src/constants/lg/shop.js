
const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const state = {
    online: 1,
    offline: 11,
    disabled: 21,
    // fresh: 22,
};

const decodeState = (s) => {
    const TEXT = {
        [state.online]: '上线中',
        [state.offline]: '下线中',
        [state.disabled]: '禁用中',
        // [state.fresh]: '未审核',
    };

    return TEXT[s];
};

const type = {
    microBusiness: 2401,
    selfEmployedSeller: 2500,
    selfEmployedBusiness: 4,
    company: 2,
    office: 3,
    others: 1708,
};
const decodeType = (t) => {
    const TEXT = {
        [type.microBusiness]: '小微商户',
        [type.selfEmployedSeller]: '个人卖家',
        [type.selfEmployedBusiness]: '个体工商户',
        [type.company]: '企业',
        [type.office]: '党政，机关及事业单位',
        [type.others]: '其他',
    };
    return TEXT[t];
};

const action = Object.assign({}, commonAction,
    {
        online: 301,
        offline: 401,
        disable: 501,
        able: 601,
    }
);

const decodeAction = (a) => {
    const TEXT = {
        [action.online]: '上线',
        [action.offline]: '下线',
        [action.disable]: '禁用',
        [action.able]: '启用',
    };

    return TEXT[a] || decodeCommonAction(a);
};


const relation = Object.assign({}, commonRelation, {
    seller: 1001,        // 营业员
});

const decodeRelation = (r) => {
    const T = {
        [relation.seller]: '营业员',
    };

    return T[r] || decodeCommonRelation(r);
};

const STATE_TRANS_MATRIX = {
    [action.online]: [state.offline, state.online],
    [action.offline]: [state.online, state.offline],
    [action.disable]: [[state.online, state.offline], state.disabled],
    [action.able]: [state.disabled, state.online],
};

module.exports = {
    type,
    decodeType,
    state,
    decodeState,
    action,
    decodeAction,
    relation,
    decodeRelation,
    STATE_TRANS_MATRIX,
};

