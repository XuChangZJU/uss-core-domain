/**
 * Created by Administrator on 2018/6/27.
 */
const state = {
    unpaid: 10,         // 未支持
    paid: 20,           // 已支付
    arrived: 30,        // 已到达
    inServe: 50,        // 开始年检
    end: 400,           // 年检完成

    cancelled2: 1003,   // 支付后放弃
    over2: 1005,        // 支付后放弃并已结清
    cancelled1:  1010,   // 未支付放弃

    init:       10000,       // 初始
    expired:    10001,      // 未支付超时

};

const decodeState = (s) => {
    const STRINGS = {
        [state.unpaid]: '未支付',
        [state.paid]: '已支付',
        [state.inServe]: '年检中',
        [state.arrived]: '已到达',
        [state.end]: '已完成',

        [state.cancelled2]: '待退款',
        [state.over2]: '已退款',
        [state.cancelled1]: '已取消',

        [state.init]: '初始',
        [state.expired]: '已超时',
    };

    return STRINGS[s];
};

module.exports = {
    state,
    decodeState,
};

