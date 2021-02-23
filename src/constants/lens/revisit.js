/**
 * Created by Xc on 2020/2/20.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const state = {
    pending: 301,
    processing: 401,
    waitingForData: 501,
    completed: 601,
    noData: 701
};

const decodeState = (s) => {
    const S = {
        [state.pending]: '待处理',
        [state.processing]: '处理中',
        [state.completed]: '已完成',
        [state.waitingForData]: '已完成等待通话记录生成',
        [state.noData]: '无通话记录',
    };
    return S[s];
};


const action = Object.assign({}, commonAction, {
    manage: 301,
});

const decodeAction = (a) => {
    const S = {
         [action.manage]: '处理',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.manage]: [state.pending, state.processing],
};

const type = {
    recheck: 1,
    appointment: 2,
};

const decodeType = {
    [type.recheck]: '邀请复查',
    [type.appointment]: '询问预约未到原因',
};

module.exports = {
    type,
    decodeType,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
