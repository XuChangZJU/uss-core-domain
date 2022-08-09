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
    pausing: 312,
    sold: 501,
    unsold: 511,
    breakUp: 601,
    revoke: 610,
    resolded: 701
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.ready, '预展中'), (0, _defineProperty3.default)(_S, state.ongoing, '拍卖中'), (0, _defineProperty3.default)(_S, state.sold, '已成交'), (0, _defineProperty3.default)(_S, state.unsold, '已流拍'), (0, _defineProperty3.default)(_S, state.breakUp, '违约'), (0, _defineProperty3.default)(_S, state.pausing, '暂停'), (0, _defineProperty3.default)(_S, state.revoke, '撤销'), (0, _defineProperty3.default)(_S, state.resolded, '已重新上架'), _S);

    return S[s] || decodeCommonState(s);
};

var decodeStateForC = function decodeStateForC(s) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, state.ready, '预展中'), (0, _defineProperty3.default)(_S2, state.ongoing, '拍卖中'), (0, _defineProperty3.default)(_S2, state.sold, '已成交'), (0, _defineProperty3.default)(_S2, state.unsold, '已流拍'), (0, _defineProperty3.default)(_S2, state.breakUp, '已成交'), (0, _defineProperty3.default)(_S2, state.pausing, '暂停'), (0, _defineProperty3.default)(_S2, state.revoke, '撤销'), (0, _defineProperty3.default)(_S2, state.resolded, '已重新上架'), _S2);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    ready: 501,
    makeReady: 502,
    start: 511,
    restart: 512,
    pause: 513,
    sold: 601,
    unsold: 610,
    resold: 701,
    revoke: 801
});

var decodeAction = function decodeAction(a) {
    var _S3;

    var S = (_S3 = {}, (0, _defineProperty3.default)(_S3, action.ready, '就绪'), (0, _defineProperty3.default)(_S3, action.makeReady, '重新就绪'), (0, _defineProperty3.default)(_S3, action.start, '开拍'), (0, _defineProperty3.default)(_S3, action.restart, '重拍'), (0, _defineProperty3.default)(_S3, action.sold, '成交'), (0, _defineProperty3.default)(_S3, action.unsold, '流拍'), (0, _defineProperty3.default)(_S3, action.pause, '暂停'), (0, _defineProperty3.default)(_S3, action.resold, '延时拍重拍'), (0, _defineProperty3.default)(_S3, action.revoke, '撤拍'), _S3);

    return S[a] || decodeCommonAction(a);
};

var mode = {
    stock: 1,
    lot: 2
};

function decodeMode(m) {
    var _S4;

    var S = (_S4 = {}, (0, _defineProperty3.default)(_S4, mode.stock, '库号命名'), (0, _defineProperty3.default)(_S4, mode.lot, 'Lot号命名'), _S4);
    return S[m];
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.ready, [state.preparing, state.ready]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.start, [[state.ready, state.pausing], state.ongoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.sold, [state.ongoing, state.sold]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.unsold, [[state.ongoing, state.sold], state.unsold]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.pause, [state.ongoing, state.pausing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.restart, [[state.unsold, state.sold], state.ongoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.makeReady, [[state.unsold, state.sold], state.ready]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.resold, [state.unsold, state.resolded]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.revoke, [[state.ready, state.resolded], state.revoke]), _STATE_TRAN_MATRIX);

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
    decodeCategory: decodeCategory,
    decodeStateForC: decodeStateForC
};