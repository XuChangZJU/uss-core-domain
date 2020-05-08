'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = object.assign({}, commonState, {
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

var action = Object.assign({}, commonAction, {
    cancel: 501
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.cancel, '撤销');

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction
};