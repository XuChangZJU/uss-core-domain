/**
 * Created by Xc on 2021/1/8.
 */
const part = {
    '平台': 'platform',
    '微信': 'weChat',
    '店铺': 'shop',
    '线上获客': 'onlineGuide',
    '线下获客': 'realGuide',
    '用户': 'user',
    '商户': 'merchant',
};

const { data: TagData } = require('./tag');
const { user: UserTag } = TagData;

const OnlineGuideTags = Object.keys(UserTag).filter(
    tag => ['顾客'].includes(UserTag[tag])
);

const RealGuideTags = Object.keys(UserTag).filter(
    tag => ['导游', '的士司机', '特权者'].includes(UserTag[tag])
);

const state = {
    unshared: 1001,
    sharing: 1011,
    shared: 1021,
    partialReturned: 1031,
    returned: 1032,
    failed: 1050,
};

const decodeState = (s) => {
    const TEXT = {
        [state.unshared]: '未分配的',
        [state.sharing]: '分配中',
        [state.shared]: '分配完成',
        [state.partialReturned]: '部分回退',
        [state.returned]: '已回退',
    };

    return TEXT[s];
};

const action = {
    share: 1011,
    shareCompleted: 1021,
    shareFailed: 1050,
    returnPartially: 1031,
    return: 1032.
};

const decodeAction = (a) => {
    const TEXT = {
        [action.share]: '分配',
        [action.shareCompleted]: '分配完成',
        [action.shareFailed]: '分配失败',
        [action.returnPartially]: '部分回退',
        [action.return]: '回退',
    };

    return TEXT[a];
};

const STATE_TRANS_MATRIX = {
    [action.share]: [state.unshared, state.sharing],
    [action.shareCompleted]: [state.sharing, state.shared],
    [action.shareFailed]: [state.sharing, state.failed],
    [action.returnPartially]: [[state.shared, state.partialReturned], state.partialReturned],
    [action.return]: [[state.shared, state.partialReturned], state.returned],
};

module.exports = {
    part,
    OnlineGuideTags,
    RealGuideTags,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
