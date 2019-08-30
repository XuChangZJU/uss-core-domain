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
        [State.unpaid]: [ State.legal, State.cancelled, State.expired, State.cantPaid],
        [State.legal]: [State.completed, State.aborted, State.abandoned, State.aborting, State.abandoning],
        [State.aborting]: [State.aborted, State.completed],
        [State.abandoning]: [State.abandoned, State.completed],
        [State.cantPaid]: [State.legal, State.expired],
    },
    [Roles.LOGGEDIN.name]: {
        [State.init]: [State.unpaid, State.cancelled],
        [State.unpaid]: [State.cancelled],
        [State.legal]: [State.aborted, State.aborting, State.abandoned, State.abandoning],
    }
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
