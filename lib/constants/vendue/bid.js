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
    inactive: 311
});
var decodeState = function decodeState(s) {
    var S = {
        active: '最高',
        inactive: '非最高'
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