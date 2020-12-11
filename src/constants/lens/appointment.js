const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

function decodeTimeSlot(timeSlot){
    const t = {
        1: '上午',
        2: '下午',
        3: '晚上',
        4: '全天',
    };
    return t[timeSlot];
}

const {
    category,
    decodeCategory
} = require('./trade');
const type = {
    appointment: 1,
    register: 2,
}

const decodeType = (t) => {
    const T = {
        [type.appointment]: '预约',
        [type.register]: '挂号',
    }
    return T[t];
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
    regist: 301,
    cancel: 401,
}, commonAction);

const decodeAction = (a) => {
    const A = {
        [action.regist]: '挂号',
        [action.cancel]: '取消',
    }
    return A[a] || decodeCommonAction(a);
}
const STATE_TRANS_MATRIX = {
    [action.regist]: [state.normal, state.completed],
    [action.cancel]: [state.normal, state.cancelled],
};
module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
    type,
    decodeType,
    category,
    decodeCategory,
    decodeTimeSlot,
    STATE_TRANS_MATRIX,
};