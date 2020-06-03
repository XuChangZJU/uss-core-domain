'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var state = Object.assign({}, commonState, {
    unsettled: 501,
    settled: 511
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.unsettled, '未结算'), _defineProperty(_S, state.settled, '已结算'), _S);

    return S[s] || decodeCommonState(s);
};
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction
};