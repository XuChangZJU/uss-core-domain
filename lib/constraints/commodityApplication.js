/**
 * Created by Administrator on 2018/3/31.
 */
const { state: State } = require('../constants/commodityApplicationConstant');

const ParamUpdateMatrix = {
    params: [State.init, State.inShopCart],
    addressId: [State.init, State.unpaid, State.inShopCart, State.paid],
    number: [State.init, State.inShopCart],
    remark: [State.init, State.unpaid, State.inShopCart, State.paid]
};

module.exports = {
    ParamUpdateMatrix
};