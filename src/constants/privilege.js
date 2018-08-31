/**
 * Created by Administrator on 2018/8/31.
 */
const state = {
    unpaid: 10,
    legal: 20,
    expired: 30,
    aborted: 40,
    cancelled: 50,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.unpaid]: '未支付的',
        [state.legal]: '生效的',
        [state.expired]: '过期的',
        [state.aborted]: '中止的',
        [state.cancelled]: '取消的',
    }
};

module.exports = {
    state,
    decodeState,
};
