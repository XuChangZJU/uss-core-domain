const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const timeSlot = {
    morning: 1,
    afternoon: 2,
    evening: 3,
    allday: 4,
};
const decodeTimeSlot = (timeSlot) => {
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
    decodeCategoryId
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
    late: 302,
    cancelled: 401,
    completed: 501,
    checkEnd: 502,
    absent: 601,
}

const decodeState = (s) => {
    const S = {
        [state.normal]: '待就诊',
        [state.cancelled]: '已取消',
        [state.completed]: '检查中',
        [state.checkEnd]: '已完成',
        [state.late]: '已过号',
        [state.absent]: '缺席',
    }
    return S[s];
}

const action = Object.assign({}, commonAction, {
    makeLate: 302,
    cancel: 401,
    regist: 501,
    checkEnd: 502,
    makeAbsent: 601,
});

const decodeAction = (a) => {
    const A = {
        [action.regist]: '开始检查',
        [action.checkEnd]: '检查完成',
        [action.cancel]: '取消',
        [action.makeLate]: '过号',
        [action.makeAbsent]: '爽约',
    }
    return A[a] || decodeCommonAction(a);
}

const STATE_TRANS_MATRIX = {
    [action.regist]: [[state.normal, state.late], state.completed],
    [action.checkEnd]: [state.completed, state.checkEnd],
    [action.cancel]: [state.normal, state.cancelled],
    [action.makeLate]: [[state.normal, state.late], state.late],
    [action.makeAbsent]: [[state.normal, state.late], state.absent],
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
    decodeCategoryId,
    STATE_TRANS_MATRIX,
};