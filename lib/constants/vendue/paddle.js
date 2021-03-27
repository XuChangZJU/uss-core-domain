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
    decodeRelation = _require.decodeRelation;

var action = (0, _assign2.default)({}, commonAction, {
    refund: 1001
});

var decodeAction = function decodeAction(a) {
    var Dict = (0, _defineProperty3.default)({}, action.refund, '退款');

    return Dict[a] || decodeCommonAction(a);
};

// const state = Object.assign({}, commonState, {
//     unsettled: 501,
//     settled: 511,
//     breakUp: 601,
// });
//
// const decodeState = (s) => {
//     const S = {
//         [state.unsettled]: '未结算',
//         [state.settled]: '已结算',
//         [state.breakUp]: '违约',
//     };
//
//     return S[s] || decodeCommonState(s);
// };
function isPaddleOnline(number) {
    var maxOfflineNum = 10000;
    return number > maxOfflineNum;
}
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    // state,
    // decodeState,
    action: action,
    decodeAction: decodeAction,
    isPaddleOnline: isPaddleOnline
};