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
    manager: 1002 // 管理员
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var STRING = (0, _defineProperty3.default)({}, relation.manager, '管理员');

    return STRING[t] || decodeCommonRelation(t);
};

var action = (0, _assign2.default)({}, commonAction);

var decodeAction = function decodeAction(a) {
    var STRINGS = {};

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};