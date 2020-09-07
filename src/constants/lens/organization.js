const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');


const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX: COMMON_STATE_TRANS_MATRIX,
} = require('./common');

const action = Object.assign({}, commonAction, {
    eternaliseQrCode: 2001,
    bind: 1001,
});

const category = Object.assign({}, {
    hospital: 1,
    clinic: 2,
    shop: 3,
    others: 4
});

const STRINGS_OF_ORIGINS = {
    [category.hospital]: "医院",
    [category.clinic]: "诊所",
    [category.shop]: '门店',
    [category.others]: '其他',
};

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}

const decodeAction = (a) => {
    const TEXT = {
        [action.bind]: '绑定',
        [action.eternaliseQrCode]: '二维码变为永久',
    };
    return TEXT[a] || decodeCommonAction(a);
};

const relation = Object.assign({}, commonRelation, {
    worker: 301,
    doctor: 401,
});


const decodeRelation = (r) => {
    const S = {
        [relation.worker]: '工作人员',
        [relation.doctor]: '医生',
    };

    return S[r] || decodeCommonRelation(r);
};


const STATE_TRANS_MATRIX = Object.assign({}, COMMON_STATE_TRANS_MATRIX, {
    [action.bind]: [state.init, state.online],
});

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    category,
    decodeCategory,
    STATE_TRANS_MATRIX,
};
