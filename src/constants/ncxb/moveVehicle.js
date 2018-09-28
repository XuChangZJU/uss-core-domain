/**
 * Created by Administrator on 2018/7/9.
 */
const Roles = require('./role');


const state = {
    init: 10,
    send: 101,
    answered: 102,
    answered2: 103,
    end: 1001,
    end2: 1002,
};

const decodeState = (s) => {
    const STRING = {
        [state.init]: '初始的',
        [state.send]: '已请求',
        [state.answered]: '已响应',
        [state.answered2]: '已被动响应',
        [state.end]: '已结束',
        [state.end2]: '已被动结束',
    };
    return STRING[s];
};


const StateTransformMatrix = {
    [Roles.LOGGEDIN.name]: {
        [state.init]: [ state.send ],
        [state.answered]: [ state.end ],
    },
    [Roles.VehicleManager.name]: {
        [state.send]: [ state.answered],
        [state.answered]: [ state.end ],
    },
    [Roles.MoveVehicleOperator.name]: {
        [state.send]: [ state.answered2],
    },
    [Roles.ROOT.name]: {
        [state.init]: [ state.end2],
        [state.send]: [ state.end2],
        [state.answered]: [ state.end2],
        [state.answered2]: [ state.end2],
    },
};

module.exports = {
    state,
    decodeState,
    StateTransformMatrix,
};
