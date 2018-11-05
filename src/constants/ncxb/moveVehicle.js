/**
 * Created by Administrator on 2018/7/9.
 */
const Roles = require('./role');


const state = {
    init: 10,
    send: 101,
    answered: 102,
    answered2: 103,
    failed: 201,
    end: 1001,
    end2: 1002,
};

const decodeState = (s) => {
    const STRING = {
        [state.init]: '初始的',
        [state.send]: '已请求',
        [state.answered]: '已响应',
        [state.answered2]: '已被动响应',
        [state.failed]: '已失败',
        [state.end]: '已结束',
        [state.end2]: '已被动结束',
    };
    return STRING[s];
};


const StateTransformMatrix = {
    [Roles.LOGGEDIN.name]: {
        [state.init]: [ state.send ],
        [state.send]: [ state.answered],
        [state.answered]: [ state.end, state.send ],
        [state.answered2]: [ state.end, state.send ],
        [state.failed]: [ state.send ],
    },
    [Roles.MoveVehicleOperator.name]: {
        [state.send]: [ state.answered2, state.failed ],
    },
    [Roles.ROOT.name]: {
        [state.init]: [ state.end2 ],
        [state.send]: [ state.end2, state.failed ],
        [state.answered]: [ state.end2 ],
        [state.answered2]: [ state.end2 ],
    },
};

const event = {
    autoCallMaster: 1,
    callMasterYourself: 2,
    noticeFirstTime: 3,
    noticeSecondTime: 4,
};

const decodeEvent = (e) => {
    const STRING = {
        [event.autoCallMaster]: '正为您拨打车主电话',
        [event.callMasterYourself]: '请手动拨打车主电话',
        [event.noticeFirstTime]: '正在为您第一次通知车主',
        [event.noticeSecondTime]: '正在为您第二次通知车主',
    };

    return STRING[e];
}

module.exports = {
    state,
    decodeState,
    StateTransformMatrix,
    event,
    decodeEvent,
};
