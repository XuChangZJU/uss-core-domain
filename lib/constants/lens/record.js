'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    state = _require.state,
    decodeState = _require.decodeState;

var action = (0, _assign2.default)({}, commonAction, {
    bind: 1001,
    unbind: 1002
});

var decodeAction = function decodeAction(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, action.bind, '关联'), (0, _defineProperty3.default)(_TEXT, action.unbind, '解联'), _TEXT);

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