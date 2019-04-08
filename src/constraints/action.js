    /**
 * Created by Administrator on 2018/8/31.
 * 本文件定义是公共有支付对象的状态变化矩阵
 */

const { Roles } = require('../constants/roleConstant2');
const { state: State } = require('../constants/action');

// 状态允许更新矩阵
const StateTransformMatrixForPaid = {
    [Roles.ROOT.name]: {
        [State.init]: [State.unpaid, State.cancelled, State.expired],
        [State.unpaid]: [ State.legal, State.aborted, State.expired, State.cantPaid],
        [State.legal]: [State.refunding, State.completed, State.abandoned],
        [State.refunding]: [State.refunded],
    },
};

const StateTransformMatrixForGrant = {
    [Roles.ROOT.name]: {
        [State.init]: [State.expired],
    },
    [Roles.LOGGEDIN.name]: {
        [State.init]: [State.confirmed],
    }
}

module.exports = {
    StateTransformMatrixForPaid,
    StateTransformMatrixForGrant
};
