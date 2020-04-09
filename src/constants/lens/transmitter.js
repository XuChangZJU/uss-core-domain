/**
 * Created by Xc on 2020/3/14.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    } = require('../action');
const type = {
    soft: 1,
    esp8266: 2,
};

const decodeType = (t) => {
    const TEXT = {
        [type.soft]: '软中继器',
        [type.esp8266]: 'wifi中继器',
    };
    return TEXT[t];
};

const state = {
    inactive: 1,
    normal: 10,
    offline: 101,
};

const decodeState = (s) => {
    const TEXT = {
        [state.inactive]: '未激活的',
        [state.normal]: '正常的',
        [state.offline]: '离线的',
    };

    return TEXT[s];
};

const action = Object.assign({}, commonAction, {
    activate: 101,
    online: 111,
    offline: 121,
    bind: 1001,
    unbind: 1002,
    updateUuid: 1003,
});

const decodeAction = (a) => {
    const TEXT = {
        [action.activate]: '激活',
        [action.online]: '上线',
        [action.offline]: '下线',
        [action.bind]: '关联设备',
        [action.unbind]: '解联设备',
        [action.updateUuid]: '绑定二维码',
    };

    return TEXT[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.activate]: [state.inactive, state.normal],
    [action.online]: [state.offline, state.normal],
    [action.offline]: [state.normal, state.offline],
    [action.bind]: [state.normal, state.normal],
    [action.unbind]: [state.normal, state.normal],
};

module.exports = {
    state,
    decodeState,
    type,
    decodeType,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
