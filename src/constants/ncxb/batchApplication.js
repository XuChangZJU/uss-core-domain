/**
 * Created by Administrator on 2018/10/21.
 */
const assert = require('assert');
const assign = require('lodash/assign');
const Roles = require('./role');
const { state: CommonState } = require('../action');

const state = assign({
    // init
    // unpaid
    // legal
    ready: 10001,
    end: 10101,
    reserved: 11001,
}, CommonState);

const decodeState = (s) => {
    const STRING = {
        [state.init]: '初始',
        [state.unpaid]: '待支付',
        [state.legal]: '已支付',
        [state.ready]: '生产中',
        [state.end]: '已完成',
        [state.expired]: '已过期',
        [state.reserved]: '后台生成',
    };

    return STRING[s];
};

const StateTransformMatrix = {
    [Roles.LOGGEDIN]: {
        [state.init]: [ state.unpaid ],
    },
    [Roles.ROOT.name]: {
        [state.init]: [ state.expired ],
        [state.unpaid]: [ state.legal, state.expired],
        [state.legal]: [ state.ready ],
        [state.ready]: [ state.end ],
    },
};

module.exports = {
    state,
    decodeState,
    StateTransformMatrix,
};