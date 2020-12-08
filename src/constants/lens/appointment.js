const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const category = {
    appointment: 1,
    register: 2,
}

const decodeCategory = (c) => {
    const C = {
        [category.appointment]: '预约',
        [category.register]: '挂号',
    }
    return C[c] || decodeCommonRelation(c);
}

const state = {
    normal: 301,
    cancelled: 401,
    completed: 501,
}

const decodeState = (s) => {
    const S = {
        [state.normal]: '正常的',
        [state.cancelled]: '已取消',
        [state.completed]: '已完成',
    }
    return S[s] || decodeCommonRelation(s);
}

const action = Object.assign({
    regist: 1,
    cancel: 1,
}, commonAction);

const decodeAction = (a) => {
    const A = {
        [action.regist]: '挂号',
        [action.cancel]: '取消',
    }
    return A[a] || decodeCommonAction(a);
}

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    category,
    decodeCategory,
};