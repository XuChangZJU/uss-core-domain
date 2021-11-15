const pick = require('lodash/pick');
const assign = require('lodash/assign');
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = {
     contracted: 1001,
     convertible: 1101,
     completed: 1201,
     cancelled: 2001,
     aborted: 2002,
     buyerRefund: 3001
};

const decodeState = (s) => {
    const DICT = {
        [state.contracted]: '生效中',
        [state.convertible]: '可结算',
        [state.completed]: '结算完成',
        [state.cancelled]: '已取消',
        [state.aborted]: '已中止',
        [state.buyerRefund]: '买家已退款',
    };
    return DICT[s] || decodeCommonState(s);
};

const action = assign({
    pay: 1101,
    complete: 1201,
    cancel: 2001,
    abort: 2002,
}, pick(commonAction, ['create', 'update', 'remove', 'changePrice']));

const decodeAction = (a) => {
    const DICT = {
        [action.pay]: '买家支付',
        [action.complete]: '结算',
        [action.cancel]: '取消',
        [action.abort]: '中止',
    };
    return DICT[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.pay]: [state.contracted, state.convertible],
    [action.complete]: [state.convertible, state.completed],
    [action.cancel]: [state.contracted, state.cancelled],
    [action.abort]: [state.contracted, state.aborted],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};
