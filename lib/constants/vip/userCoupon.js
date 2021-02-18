'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = (0, _assign2.default)({
    inheritor: 1001 // 获赠者
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var STRING = (0, _defineProperty3.default)({}, relation.inheritor, '获赠者');

    return STRING[t] || decodeCommonRelation(t);
};

var action = (0, _assign2.default)({
    use: 1001,

    send: 3001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, action.use, '使用'), (0, _defineProperty3.default)(_STRINGS, action.send, '转赠'), (0, _defineProperty3.default)(_STRINGS, action.expires, '过期'), (0, _defineProperty3.default)(_STRINGS, action.forbid, '禁用'), (0, _defineProperty3.default)(_STRINGS, action.dropBySelf, '自丢弃'), (0, _defineProperty3.default)(_STRINGS, action.dropByShop, '店家删除'), _STRINGS);

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

var state = {
    available: 10,
    expired: 1001,
    used: 1002,
    forbidden: 1003
};

var decodeState = function decodeState(s) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, (0, _defineProperty3.default)(_STRINGS2, state.available, '可用的'), (0, _defineProperty3.default)(_STRINGS2, state.expired, '过期的'), (0, _defineProperty3.default)(_STRINGS2, state.used, '用过的'), (0, _defineProperty3.default)(_STRINGS2, state.forbidden, '禁用的'), _STRINGS2);

    return STRINGS[s];
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState
};