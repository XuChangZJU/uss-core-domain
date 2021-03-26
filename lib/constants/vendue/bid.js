'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STRINGS_OF_ORIGINS, _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var action = (0, _assign2.default)({}, commonAction, {
    success: 701,
    confirm: 702,
    violate: 703
});

var decodeAction = function decodeAction(a) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, action.success, '成交'), (0, _defineProperty3.default)(_S, action.confirm, '确认'), (0, _defineProperty3.default)(_S, action.violate, '违约'), _S);

    return S[a] || decodeCommonAction(a);
};
var category = (0, _assign2.default)({}, {
    bid: 1,
    count: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.bid, "出价"), (0, _defineProperty3.default)(_STRINGS_OF_ORIGINS, category.count, "落槌倒计时"), _STRINGS_OF_ORIGINS);

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
var state = (0, _assign2.default)({}, commonState, {
    bidding: 301,
    success: 401,
    confirmed: 702,
    violated: 1001
});
var decodeState = function decodeState(s) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, state.bidding, '竞拍'), (0, _defineProperty3.default)(_S2, state.success, '成交'), (0, _defineProperty3.default)(_S2, state.confirmed, '已核对'), (0, _defineProperty3.default)(_S2, state.violated, '已违约'), _S2);
    return S[s] || decodeCommonState(s);
};
var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.success, [state.bidding, state.success]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.confirm, [state.success, state.confirmed]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.violate, [[state.success, state.confirmed], state.violated]), _STATE_TRAN_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};