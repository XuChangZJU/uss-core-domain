'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/6/30.
 */
var state = {
    init: 1,
    normal: 10,
    disconnected: 21,
    disabled: 101
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.init, '初建的'), _defineProperty(_S, state.normal, '正常的'), _defineProperty(_S, state.disconnected, '失联的'), _defineProperty(_S, state.disabled, '禁用的'), _S);

    return S[s];
};

var action = {
    normalize: 11,
    disconnect: 21,
    connect: 22,
    disable: 31,
    enable: 32
};

var decodeAction = function decodeAction(s) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.normalize, '正常化'), _defineProperty(_S2, action.disconnect, '断连'), _defineProperty(_S2, action.connect, '连接'), _defineProperty(_S2, action.disable, '禁用'), _defineProperty(_S2, action.enable, '启用'), _S2);
    return S[s];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction
};