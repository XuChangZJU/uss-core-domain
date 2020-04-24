'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    state = _require.state,
    decodeState = _require.decodeState;

var action = Object.assign({}, commonAction, {
    bind: 1001,
    unbind: 1002
});

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, action.bind, '关联'), _defineProperty(_TEXT, action.unbind, '解联'), _TEXT);

    return TEXT[a] || decodeCommonAction(a);
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState
};