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

var relation = commonRelation;

var decodeRelation = decodeCommonRelation;

var action = (0, _assign2.default)({
    send: 1001,
    answer: 1002,
    answer2: 1003
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, action.send, '发起请求'), (0, _defineProperty3.default)(_STRINGS, action.answer, '响应'), (0, _defineProperty3.default)(_STRINGS, action.answer2, '代响应'), _STRINGS);

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};