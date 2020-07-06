'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
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

var relation = Object.assign({}, commonRelation, {
    guardian: 101,
    worker: 102,
    auctioneer: 103,
    stockKeeper: 104,
    settler: 105,
    manager: 106,
    administrator: 110
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, _defineProperty(_R, relation.guardian, '守护者'), _defineProperty(_R, relation.worker, '员工'), _defineProperty(_R, relation.administrator, '管理员'), _defineProperty(_R, relation.auctioneer, '拍卖师'), _defineProperty(_R, relation.stockKeeper, '库管员'), _defineProperty(_R, relation.settler, '结算员'), _defineProperty(_R, relation.manager, '经理'), _R);
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.enable, [state.offline, state.online]), _defineProperty(_STATE_TRAN_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};