const pick = require('lodash/pick');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');

const category = {
    platform: 1,
    paymentSupplier: 2,
    shop: 10,
    seller: 11,
    onlineGuide: 21,
    offlineGuide: 22,
    user: 101,
    organization:102,
};

const decodeCategory = (o) => {
    const DICT = {
        [category.platform]: '平台',
        [category.paymentSupplier]: '支付渠道商',
        [category.shop]: '店铺',
        [category.seller]: '营业员',
        [category.onlineGuide]: '线上导流',
        [category.offlineGuide]: '线下导流',
        [category.user]: '固定用户',
        [category.organization]: '固定机构',
    };

    return DICT[o];
};

const method = {
    fixed: 1,
    upperbound: 2,
};

const decodeMethod = (m) => {
    const DICT = {
        [method.fixed]: '固定比例',
        [method.upperbound]: '上限',
    };
};

const state = {
    unshare: 1001,
    sharing: 1002,
    shared: 1003,
};

const decodeState = (s) => {
    const DICT = {
        [state.unshare]: '未分润',
        [state.sharing]: '分润中',
        [state.sharing]: '已分润',
    };

    return DICT[s];
}

const action = Object.assign({
    share: 1002,
    shareManually:1003,
    shareSuccess: 1004,
}, pick(CommonAction, ['create', 'update', 'remove']));

const decodeAction = (a) => {
    const DICT = {
        [action.share]: '分润',
        [action.shareManually]: '手动分润',
        [action.shareSuccess]: '分润成功',
    };

    return DICT[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    // [transportAction.taPrepare]: [null, transportState.tsInPreparing], prepare的前状态由具体应用自己定义
    [action.share]: [state.unshare, state.sharing],
    [action.shareManually]: [state.unshare, state.shared],
    [action.shareSuccess]: [state.sharing, state.shared],
};

module.exports = {
    category,
    decodeCategory,
    method,
    decodeMethod,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
