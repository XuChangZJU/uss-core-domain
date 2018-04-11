/**
 * Created by Administrator on 2018/3/31.
 */
const { state: State } = require('../constants/tradeConstant');

const ParamUpdateMatrix = {
    params: [State.init, State.inShopCart],
    addressId: [State.init, State.unpaid, State.inShopCart, State.paid],
    number: [State.init, State.inShopCart],
    remark: [State.init, State.unpaid, State.inShopCart, State.paid],
    orderId: [State.unpaid],
    transit: [State.gettingRidOf, State.sending],
    transitNo: [State.gettingRidOf, State.sending],
    finishLine: [State.sending],
    evaluate: [State.confirmed, State.finished],
    comment: [State.confirmed, State.finished],
    groupBy: [State.init, State.inShopCart]
};

module.exports = {
    ParamUpdateMatrix
};