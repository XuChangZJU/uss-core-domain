'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    online: 501,
    offline: 511
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.online, '使用中'), _defineProperty(_S, state.offline, '已停用'), _S);

    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    enable: 501,
    disable: 511
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.enable, '启用'), _defineProperty(_S2, action.disable, '禁用'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.enable, [state.offline, state.online]), _defineProperty(_STATE_TRANS_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRANS_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};