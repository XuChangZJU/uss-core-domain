const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    online: 501,
    offline: 511,
});

const decodeState = (s) => {
    const S = {
        [state.online]: '使用中',
        [state.offline]: '已停用',
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    enable: 501,
    disable: 511,
});

const decodeAction = (a) => {
    const S = {
        [action.enable]: '启用',
        [action.disable]: '禁用',
    };

    return S[a] || decodeCommonAction(a);
};

const relation = Object.assign({}, commonRelation, {
    guardian: 101,
    worker: 102,
    administrator: 110,
    stockManage: 120,
});

const decodeRelation = (r) => {
    const R = {
        [relation.guardian]: '守护者',
        [relation.worker]: '员工',
        [relation.administrator]: '管理员',
        [relation.stockManage]: '库存管理员',
    };
    return R[r] || decodeCommonRelation(r);
};

const STATE_TRAN_MATRIX = {
    [action.enable]: [state.offline, state.online],
    [action.disable]: [state.online, state.offline],
};

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};
