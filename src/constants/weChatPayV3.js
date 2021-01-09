/**
 * Created by Xc on 2020/12/27.
 * 本文件用于按微信支付V3的手册来定义一系列常量
 */
// 1、电商收付通部分

// 主体类型：https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter7_1_1.shtml
const organizationType = {
    '小微商户': '2401',
    '个人卖家': '2500',
    '个体工商户': '4',
    '企业': '2',
    '党政、机关及事业单位': '3',
    '其它组织': '1708',
};

const idDocType = {
    '身份证': 'IDENTIFICATION_TYPE_MAINLAND_IDCARD',
    '护照': 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT',
    '中国香港-来往内地通行证': 'IDENTIFICATION_TYPE_HONGKONG',
    '中国澳门-来往内地通行证': 'IDENTIFICATION_TYPE_MACAO',
    '中国台湾-来往内地通行证': 'IDENTIFICATION_TYPE_TAIWAN',
};

const bankAccountType = {
    '对公帐户': '74',
    '对私帐户': '75',
};

const oTbaTMatrix = {
    [organizationType['小微商户']]: [bankAccountType['对私商户']],
    [organizationType['个人卖家']]: [bankAccountType['对私商户']],
    [organizationType['个体工商户']]: [bankAccountType['对公商户'], bankAccountType['对私商户']],
    [organizationType['企业']]: [bankAccountType['对公商户']],
    [organizationType['党政、机关及事业单位']]: [bankAccountType['对公商户']],
    [organizationType['其它组织']]: [bankAccountType['对公商户']],
};

const contactType = {
    '经营者、法人': '65',
    '负责人': '66',
};

const obCtMatrix = {
    [organizationType['小微商户']]: [contactType['经营者、法人']],
    [organizationType['个人卖家']]: [contactType['经营者、法人']],
    [organizationType['个体工商户']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['企业']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['党政、机关及事业单位']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['其它组织']]: [contactType['经营者、法人'], contactType['负责人']],
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// 分润状态定义
///////////////////////////////////////////////////////////////////////////////////////////////////
const shareState = {
    unshared: 1001,
    sharing: 1011,
    shared: 1021,
    partialReturned: 1031,
    returned: 1032,
    failed: 1050,
};

const decodeShareState = (s) => {
    const TEXT = {
        [shareState.unshared]: '未分配的',
        [shareState.sharing]: '分配中',
        [shareState.shared]: '分配完成',
        [shareState.partialReturned]: '部分回退',
        [shareState.returned]: '已回退',
    };

    return TEXT[s];
};

const shareAction = {
    share: 1011,
    shareCompleted: 1021,
    shareFailed: 1050,
    returnPartially: 1031,
    return: 1032.
};

const decodeShareAction = (a) => {
    const TEXT = {
        [shareAction.share]: '分配',
        [shareAction.shareCompleted]: '分配完成',
        [shareAction.shareFailed]: '分配失败',
        [shareAction.returnPartially]: '部分回退',
        [shareAction.return]: '回退',
    };

    return TEXT[a];
};

const SHARE_STATE_TRANS_MATRIX = {
    [shareAction.share]: [shareState.unshared, shareState.sharing],
    [shareAction.shareCompleted]: [shareState.sharing, shareState.shared],
    [shareAction.shareFailed]: [shareState.sharing, shareState.failed],
    [shareAction.returnPartially]: [[shareState.shared, shareState.partialReturned], shareState.partialReturned],
    [shareAction.return]: [[shareState.shared, shareState.partialReturned], shareState.returned],
};

const shareReturnState = {
    returning: 2011,
    returned: 2021,
    failed: 2051,
};

const decodeShareReturnState = (srs) => {
    const TEXT = {
        [shareReturnState.returning]: '退还中',
        [shareReturnState.returned]: '已退还',
        [shareReturnState.failed]: '退还失败',
    };

    return TEXT[srs];
};

const shareReturnAction = {
    returnCompleted: 2021,
    returnFailed: 2051,
};

const decodeShareReturnAction = (sra) => {
    const TEXT = {
        [shareReturnAction.returnCompleted]: '退还成功',
        [shareReturnAction.returnFailed]: '退还失败',
    };

    return TEXT[sra];
};

const SHARE_RETURN_STATE_TRANS_MATRIX = {
    [shareReturnAction.returnCompleted]: [shareReturnState.returning, shareReturnState.returned],
    [shareReturnAction.returnFailed]: [shareReturnState.returning, shareReturnState.failed],
};

const shareAccountType = {
    merchant: 1,
    personal: 2,
};

const decodeShareAccountType = (sat) => {
    const TEXT = {
        [shareAccountType.merchant]: '商户',
        [shareAccountType.personal]: '个人',
    };

    return TEXT[sat];
};

module.exports = {
    organizationType,
    idDocType,
    bankAccountType,
    oTbaTMatrix,
    contactType,
    obCtMatrix,
    shareState,
    decodeShareState,
    shareAction,
    decodeShareAction,
    SHARE_STATE_TRANS_MATRIX,
    shareReturnState,
    decodeShareReturnState,
    shareReturnAction,
    decodeShareReturnAction,
    SHARE_RETURN_STATE_TRANS_MATRIX,
    shareAccountType,
    decodeShareAccountType,
};