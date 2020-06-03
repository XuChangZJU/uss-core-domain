'use strict';

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    active: 301,
    inactive: 311,
    succeed: 401
});
var decodeState = function decodeState(s) {
    var S = {
        active: '进行中',
        inactive: '已完成',
        succeed: '成交'
    };
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