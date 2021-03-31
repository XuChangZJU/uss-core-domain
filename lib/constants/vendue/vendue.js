'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STRINGS_OF_ORIGINS, _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var omit = require('lodash/omit');
var state = (0, _assign2.default)({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401
    // pausing: 410,
    // aborted: 411,
});
var category = (0, _assign2.default)({}, {
    synchronous: 1,
    delayed: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.synchronous, "同步拍"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.delayed, "限时拍"), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.preparing, '准备中'), (0, _defineProperty3.default)(_S, state.ready, '预展中'), (0, _defineProperty3.default)(_S, state.ongoing, '进行中'), (0, _defineProperty3.default)(_S, state.finished, '已结束'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601
    // pause: 610,
    // stop: 611,
});
var relation = omit((0, _assign2.default)({}, commonRelation, {
    worker: 301,
    authorizer: 401
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.worker, '员工'), (0, _defineProperty3.default)(_R, relation.authorizer, '授权人'), _R);
    return R[r] || decodeCommonRelation(r);
};
var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.ready, '发布'), (0, _defineProperty3.default)(_S2, action.start, '开始'), (0, _defineProperty3.default)(_S2, action.finish, '结束'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.ready, [state.preparing, state.ready]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.start, [state.ready, state.ongoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.finish, [state.ongoing, state.finished]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,
    category: category,
    decodeCategory: decodeCategory
};