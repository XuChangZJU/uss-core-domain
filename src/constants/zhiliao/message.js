const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    unsent: 401,
    // sent: 401,
    // received: 402,
    unread: 402,
    read: 403,
    withdrawn: 411,
    concealed: 412,
});

const decodeState = (s) => {
    const S = {
        [state.unsent]: '未发送',
        [state.unread]: '未读',
        [state.read]: '已读',
        [state.withdrawn]: '已撤回',
        [state.concealed]: '已删除',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    send: 1301,
    // receive: 1302,
    read: 1303,
    withdraw: 1311,
    conceal: 1312,
});

const decodeAction = (a) => {
    const A = {
        [action.send]: '发送',
        // [action.receive]: '接收',
        [action.read]: '阅读',
        [action.withdraw]: '撤回',
        [action.conceal]: '删除',
    };
    return A[a] || decodeCommonAction(a);
};

const relation = Object.assign({}, commonRelation, {
    sender: 301,
    receiver: 302,
});

const decodeRelation = (r) => {
    const R = {
        [relation.sender]: '发送者',
        [relation.receiver]: '接受者',
    };
    return R[r] || decodeCommonRelation(r);
};

const STATE_TRANS_MATRIX = {
    [action.send]: [state.unsent, state.unread],
    [action.read]: [state.unread, state.read],
    [action.withdraw]: [[state.unread, state.read], state.withdrawn],
    [action.conceal]: [[state.unsent, state.unread, state.read], state.cancelled],
};
module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};