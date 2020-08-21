'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var transportState = {
    wdd: 10003,
    dqj: 10004,
    yqj: 10005,
    yfh: 10010
};

var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 10000) {
        return 'transportState';
    }

    return state;
};

var decodeTransportState = function decodeTransportState(ts) {
    var _TS;

    var TS = (_TS = {}, _defineProperty(_TS, transportState.wdd, '未到店'), _defineProperty(_TS, transportState.dqj, '待取件（到店）'), _defineProperty(_TS, transportState.yfh, '已发货'), _defineProperty(_TS, transportState.yqj, '已取件'), _TS);
    return TS[ts];
};

var getMethod = {
    helpYourself: 1,
    express: 2,
    atOnce: 3
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _GM;

    var GM = (_GM = {}, _defineProperty(_GM, getMethod.helpYourself, '顾客自取'), _defineProperty(_GM, getMethod.express, '快递'), _defineProperty(_GM, getMethod.atOnce, '当场立取'), _GM);

    return GM[gm];
};

var action = Object.assign({}, commonAction, {
    confirmArriveAtShop: 10001,
    confirmGet: 10002,
    send: 10003,
    confirmPick: 10004,
    updateFeedback: 9000
    // getAndSendMessage: 1004
});

var decodeAction = function decodeAction(a) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, action.confirmArriveAtShop, '确认到店'), _defineProperty(_S, action.confirmGet, '确认收货'), _defineProperty(_S, action.send, '发快递'), _defineProperty(_S, action.updateFeedback, '更新评价'), _defineProperty(_S, action.confirmPick, '确认取货'), _S);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.confirmArriveAtShop, [[transportState.dfl, transportState.dzdjh, transportState.dqhcl], transportState.dqj]), _defineProperty(_STATE_TRAN_MATRIX, action.confirmGet, [transportState.yfh, transportState.yqj]), _defineProperty(_STATE_TRAN_MATRIX, action.confirmPick, [[transportState.dqj], transportState.yqj]), _defineProperty(_STATE_TRAN_MATRIX, action.send, [[transportState.dfl, transportState.dzdjh, transportState.dqhcl, transportState.dqj], transportState.yfh]), _STATE_TRAN_MATRIX);
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    getMethod: getMethod,
    decodeGetMethod: decodeGetMethod,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    getActionStateAttr: getActionStateAttr,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};