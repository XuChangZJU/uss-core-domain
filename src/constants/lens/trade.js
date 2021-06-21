const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    COMMON_STATE_TRAN_MATRIX,
    state: commonState,
    transportState: TransportState,
    TRANSPORT_STATE_TRANS_MATRIX,
    decodeTransportState: decodeCommonTransportState,
    decodeTransportAction: decodeCommonTransportAction,
    decodeState: decodeCommonState,
    transportAction: TransportAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,

} = require('../action');

const billState = {
    'noBill': 101,
    'pending': 201,
    'done': 301,
};

const decodeBillState = (b) => {
    const B = {
        [billState.noBill]: '未开发票',
        [billState.pending]: '发票请求处理中',
        [billState.done]: '已完成',
    };
    return B[b];
}


const transportState = Object.assign({}, TransportState, {
    wdd: 10003,
    dqj: 10004,
    yqj: 10005,
    dgkqr: 10006,
    yfh: 10010,
    yth: 10011,
    yzf: 10012,
    dxh: 10013,
    checkInQueue: 11001,
    checkCompleted: 11002,
    checkCanceled: 11003,
});

const messageState = {
    sending: 10001,
    success: 10002,
    failure: 10003,
};

const state = Object.assign({}, commonState, {
    financialRefunded: 501,
});

const decodeState = (s) => {
    const S = {
        [state.financialRefunded]: '财务已退款',
    };

    return S[s] || decodeCommonState(s);
};

const decodeMessageState = (s) => {
    const STRINGS = {
        [messageState.sending]: '发送中',
        [messageState.success]: '发送成功',
        [messageState.failure]: '发送失败',
    }
    return STRINGS[s];
};

const getActionStateAttr = (action) => {
    if (action > 30000) {
        return 'transportState';
    }
    if (action > 20000) {
        return 'billState';
    }
    if (action > 10000) {
        return 'transportState';
    }
    return 'state';
};

const decodeTransportState = (ts) => {
    const TS = {
        [transportState.wdd]: '未到店',
        [transportState.dqj]: '已到店',
        [transportState.dgkqr]: '待完成取货',
        [transportState.yqj]: '已取件',
        [transportState.yth]: '已退货',
        // [transportState.yzf]: '已作废',
        // [transportState.dxh]: '待销号',
        [transportState.checkInQueue]: '待检查',
        [transportState.checkCompleted]: '已完成',
        [transportState.checkCanceled]: '已取消',
    };
    return TS[ts] || decodeCommonTransportState(ts);
};

const getMethodId = {
    HelpYourself: 1,
    Express: 2,
    AtOnce: 3,
    Agent: 4,
};

const decodeGetMethodId = (gm) => {
    const GM = {
        [getMethodId.HelpYourself]: '顾客自取',
        [getMethodId.Express]: '快递',
        [getMethodId.AtOnce]: '当场立取',
        [getMethodId.Agent]: '委托代收',
    };

    return GM[gm];
};




const action = Object.assign({}, commonAction, TransportAction, {
    financialRefund: 501,
    confirmArriveAtShop: 10001,
    confirmPick: 10004,
    customConfirm: 10005,
    completeCheck: 10006,
    cancelCheck: 10007,
    issueBill: 20001,
    completeBill: 20002,
});

const decodeAction = (a) => {
    const S = {
        [action.financialRefund]: '财务退款',
        [action.confirmArriveAtShop]: '确认到店',
        [action.customConfirm]: '完成取货',
        [action.confirmPick]: '确认取货',
        [action.completeCheck]: '完成',
        [action.cancelCheck]: '取消',
        [action.issueBill]: '申请开票',
        [action.completeBill]: '完成开票'
    };

    return S[a] || decodeCommonAction(a) || decodeCommonTransportAction(a);
};

const STATE_TRAN_MATRIX =    Object.assign({},  COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX, {
    [action.taPrepare]: [transportState.wdd, transportState.tsSending],
    // [action.taCancel]: [transportState.tsInPreparing, transportState.wdd],
    [action.financialRefund]: [[state.legal2, state.legal, state.abandoned], state.financialRefunded],
    [action.confirmArriveAtShop]: [transportState.wdd, transportState.dqj],
    [action.confirmPick]:  [transportState.dqj, transportState.dgkqr],
    [action.customConfirm]: [transportState.dgkqr, transportState.yqj],
    [action.completeCheck]: [transportState.checkInQueue, transportState.checkCompleted],
    [action.cancelCheck]: [transportState.checkInQueue, transportState.checkCanceled],
    [action.issueBill]: [[billState.noBill, billState.pending], billState.pending],
    [action.completeBill]: [billState.pending, billState.done],
});


const categoryId = {
    'Glasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'Others': 4,
    'Training': 5,
    'Check': 6,
    'DISCGlasses': 7,
    'BandgeGlasses': 8,
    'OkGlassTry': 9,
    'Inquiry': 10,
    'TrainingCheck': 11,
    'Service': 12,
    'Gift': 13,
    'OkGlassRecheck': 14,
    'CareLiquid': 15,
    'Food': 16,
    'OkGlassFetch': 17,
    'Screening': 18,
    'Compensation': 19,
    'activityCheck': 20,
    'teenagerScreening': 21,
    'OKGlassesStudy': 22,
}
const decodeCategoryId = (c) => {
    const C = {
        [categoryId.Glasses]: '框架眼镜',
        [categoryId.OKGlasses]: '角膜塑形镜',
        [categoryId.DoneGlasses]: '成镜',
        [categoryId.Others]: '其它',
        [categoryId.Training]: '视训',
        [categoryId.Check]: '验光检查',
        [categoryId.DISCGlasses]: '多焦软镜',
        [categoryId.BandgeGlasses]: '绷带镜',
        [categoryId.OkGlassTry]: '角膜塑形镜试戴',
        [categoryId.Inquiry]: '医生问诊',
        [categoryId.TrainingCheck]: '弱视检查',
        [categoryId.Service]: '服务/线下宣讲',
        [categoryId.Gift]: '赠品',
        [categoryId.OkGlassRecheck]: '角膜塑形镜复查',
        [categoryId.CareLiquid]: '护理液',
        [categoryId.Food]: '眼保健食品',
        [categoryId.OkGlassFetch]: '角膜塑形镜取镜',
        [categoryId.Screening]: '筛查(幼儿)',
        [categoryId.Compensation]: '补件',
        [categoryId.activityCheck]: '活动验光',
        [categoryId.teenagerScreening]: '筛查（青少年）',
        [categoryId.OkGlassLearning]: '角膜塑形镜摘戴学习',
    }
    return C[c];
}


const mainCategoryId = {
    MakeBill: 1,
    Check: 2,
    Service: 3,
};

const decodeMainCategoryId = (mc) => {
    const MC = {
        [mainCategoryId.MakeBill]: '开单',
        [mainCategoryId.Check]: '检查',
        [mainCategoryId.Service]: '服务',
    }
    return MC[mc];
}

const relation = Object.assign({}, commonRelation, {
    seller: 1001,        // 营业员
    customer: 301,
    doctor: 401,
    VIP: 501,
    regularCostomer: 601,
    hospitalInsider: 701,
    others: 801,
});

const decodeRelation = (r) => {
    const T = {
        [relation.seller]: '营业员',
        [relation.customer]: '顾客',
        [relation.doctor]: '验光医生',
        [relation.VIP]: 'VIP顾客',
        [relation.regularCostomer]: '熟客',
        [relation.hospitalInsider]: '医院内部人士',
        [relation.others]: '其他',
    };
    return T[r] || decodeCommonRelation(r);
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    transportState,
    decodeTransportState,
    messageState,
    decodeMessageState,
    getMethodId,
    decodeGetMethodId,
    categoryId,
    decodeCategoryId,
    getActionStateAttr,
    mainCategoryId,
    decodeMainCategoryId,
    billState,
    decodeBillState,
    STATE_TRAN_MATRIX,
};
