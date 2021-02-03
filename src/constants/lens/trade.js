const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    COMMON_STATE_TRAN_MATRIX,
    state: commonState,
    decodeState: decodeCommonState,
    relation,
    decodeRelation
} = require('../action');

const transportState = {
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
};

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
    if (action > 10000) {
        return 'transportState';
    }

    return 'state';
};

const decodeTransportState = (ts) => {
    const TS = {
        [transportState.wdd]: '未到店',
        [transportState.dqj]: '待取件（到店）',
        [transportState.dgkqr]: '待顾客确认',
        [transportState.yfh]: '已发货',        // 快递已发出
        [transportState.yqj]: '已取件',
        [transportState.yth]: '已退货',
        // [transportState.yzf]: '已作废',
        // [transportState.dxh]: '待销号',
        [transportState.checkInQueue]: '待检查',
        [transportState.checkCompleted]: '已完成',
        [transportState.checkCanceled]: '已取消',
    };
    return TS[ts];
};

const getMethod = {
    helpYourself: 1,
    express: 2,
    atOnce: 3,
};

const decodeGetMethod = (gm) => {
    const GM = {
        [getMethod.helpYourself]: '顾客自取',
        [getMethod.express]: '快递',
        [getMethod.atOnce]: '当场立取',
    };

    return GM[gm];
};




const action = Object.assign({}, commonAction, {
    financialRefund: 501,
    confirmArriveAtShop: 10001,
    confirmGet: 10002,
    send: 10003,
    confirmPick: 10004,
    customConfirm: 10005,
    completeCheck: 10006,
    cancelCheck: 10007,
    updateFeedback: 9000,
});

const decodeAction = (a) => {
    const S = {
        [action.financialRefund]: '财务退款',
        [action.confirmArriveAtShop]: '确认到店',
        [action.confirmGet]: '确认收货',
        [action.send]: '发快递',
        [action.updateFeedback]: '更新评价',
        [action.customConfirm]: '顾客确认',
        [action.confirmPick]: '确认取货',
        [action.completeCheck]: '完成',
        [action.cancelCheck]: '取消'
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX =    Object.assign({}, COMMON_STATE_TRAN_MATRIX, {
    [action.financialRefund]: [[state.legal2, state.legal, state.abandoned], state.financialRefunded],
    [action.confirmArriveAtShop]: [transportState.wdd, transportState.dqj],
    [action.confirmGet]: [transportState.yfh, transportState.yqj],
    [action.confirmPick]:  [transportState.dqj, transportState.dgkqr],
    [action.customConfirm]: [transportState.dgkqr, transportState.yqj],
    [action.send]: [transportState.wdd, transportState.yfh],
    [action.completeCheck]: [transportState.checkInQueue, transportState.checkCompleted],
    [action.cancelCheck]: [transportState.checkInQueue, transportState.checkCanceled],
});


const category = {
    'makeGlasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'consumables': 4,
    'visionTraining': 5,
    'check': 6,
    'DISCGlasses': 7,
    'SCL': 8,
    'OkGlassCheck': 9,
    'doctorService': 10,
    'visionTrainingCheck': 11,
    'service': 12,
    'gift': 13,
}
const decodeCategory = (c) => {
    const C = {
        [category.makeGlasses]: '框架眼镜',
        [category.OKGlasses]: '角膜塑形镜',
        [category.DoneGlasses]: '成镜',
        [category.consumables]: '耗品',
        [category.visionTraining]: '视训',
        [category.check]: '验光检查',
        [category.DISCGlasses]: '多焦软镜',
        [category.SCL]: '软性隐形眼镜',
        [category.OkGlassCheck]: '角膜塑形镜检查',
        [category.doctorService]: '医生问诊',
        [category.visionTrainingCheck]: '视训检查',
        [category.service]: '服务/线下宣讲',
        [category.gift]: '赠品',
    }
    return C[c];
}

const mainCategory = {
    makeBill: 1,
    check: 2,
    others: 3,
};

const decodeMainCategory = (mc) => {
    const MC = {
        [mainCategory.makeBill]: '开单',
        [mainCategory.check]: '检查',
        [mainCategory.others]: '其他',
    }
    return MC[mc];
}

const getMainCategory = (c) => {
    const C = {
        [category.makeGlasses]: mainCategory.makeBill,
        [category.OKGlasses]: mainCategory.makeBill,
        [category.DoneGlasses]: mainCategory.makeBill,
        [category.consumables]: mainCategory.makeBill,
        [category.visionTraining]: mainCategory.makeBill,
        [category.check]: mainCategory.check,
        [category.DISCGlasses]: mainCategory.makeBill,
        [category.SCL]: mainCategory.makeBill,
        [category.OkGlassCheck]: mainCategory.check,
        [category.doctorService]: mainCategory.check,
        [category.visionTrainingCheck]: mainCategory.check,
        [category.service]: mainCategory.others,
        [category.gift]: mainCategory.makeBill,
    }
    return C[c];
}

const getCategory = (mc) => {
    const MC = {
        [mainCategory.makeBill]: [category.makeGlasses, category.OKGlasses, category.visionTraining, category.DISCGlasses, category.SCL, category.gift, category.DoneGlasses, category.consumables],
        [mainCategory.check]: [category.OkGlassCheck, category.visionTrainingCheck, category.check, category.doctorService],
        [mainCategory.others]: [category.service],
    }
    return MC[mc];
}

const checkType = {
    'firstVisit': 1,
    'revisit': 2,
}
const decodeCheckType = (ct) => {
    const CT = {
        [checkType.firstVisit]: '初诊',
        [checkType.revisit]: '复查',
    };
    return CT[ct];
}

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    getMethod,
    decodeGetMethod,
    transportState,
    decodeTransportState,
    messageState,
    decodeMessageState,
    category,
    decodeCategory,
    getActionStateAttr,
    mainCategory,
    decodeMainCategory,
    getMainCategory,
    getCategory,
    checkType,
    decodeCheckType,
    STATE_TRAN_MATRIX,
};
