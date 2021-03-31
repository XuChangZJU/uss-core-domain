'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var relation = (0, _assign2.default)({}, commonRelation, {
    favourite: 301
});

var decodeRelation = function decodeRelation(r) {
    var R = (0, _defineProperty3.default)({}, relation.favourite, '收藏');
    return R[r] || decodeCommonRelation(r);
};
var state = (0, _assign2.default)({}, commonState, {
    // preparing: 301,
    ready: 310,
    ongoing: 311,
    sold: 501,
    unsold: 511,
    breakUp: 601
    // pausing: 520,
    // cancelled: 610,
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.ready, '预展中'), (0, _defineProperty3.default)(_S, state.ongoing, '拍卖中'), (0, _defineProperty3.default)(_S, state.sold, '已成交'), (0, _defineProperty3.default)(_S, state.unsold, '已流拍'), (0, _defineProperty3.default)(_S, state.breakUp, '违约'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    ready: 501,
    start: 511,
    sold: 601,
    unsold: 610,
    // resold: 611,
    pause: 620
    // cancel: 621,
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.ready, '就绪'), (0, _defineProperty3.default)(_S2, action.start, '开拍'), (0, _defineProperty3.default)(_S2, action.sold, '成交'), (0, _defineProperty3.default)(_S2, action.unsold, '流拍'), (0, _defineProperty3.default)(_S2, action.pause, '暂停'), _S2);

    return S[a] || decodeCommonAction(a);
};

var mode = {
    stock: 1,
    lot: 2
};

function decodeMode(m) {
    var _S3;

    var S = (_S3 = {}, (0, _defineProperty3.default)(_S3, mode.stock, '库号命名'), (0, _defineProperty3.default)(_S3, mode.lot, 'Lot号命名'), _S3);
    return S[m];
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.ready, [state.preparing, state.ready]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.start, [[state.ready, state.unsold, state.pausing], state.ongoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.sold, [state.ongoing, state.sold]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.unsold, [[state.ongoing, state.sold], state.unsold]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.pause, [state.ongoing, state.pausing]), _STATE_TRAN_MATRIX);

var category = {
    guqian: 1,
    yinding: 2,
    jizhibi: 3
};

var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, category.guqian, '古钱'), (0, _defineProperty3.default)(_C, category.yinding, '银锭'), (0, _defineProperty3.default)(_C, category.jizhibi, '机制币'), _C);
    return C[c];
};
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    mode: mode,
    decodeMode: decodeMode,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,
    category: category,
    decodeCategory: decodeCategory
};