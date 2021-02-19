'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _AttrsUpdateMatrix, _Roles$BUYER$name, _Roles$SELLER$name, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/3/31.
 */
var _require = require('../constants/tradeConstant'),
    State = _require.state;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

// 属性允许更新矩阵


var AttrsUpdateMatrix = (_AttrsUpdateMatrix = {}, (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.BUYER.name, {
    params: [State.init, State.inShopCart],
    addressId: [State.init, State.unpaid, State.inShopCart, State.paid],
    number: [State.init, State.inShopCart],
    remark: [State.init, State.unpaid, State.inShopCart, State.paid],
    evaluate: [State.confirmed, State.finished],
    comment: [State.confirmed, State.finished]
}), (0, _defineProperty3.default)(_AttrsUpdateMatrix, Roles.SELLER.name, {
    transit: [State.gettingRidOf, State.sending],
    transitNo: [State.gettingRidOf, State.sending]
}), _AttrsUpdateMatrix);

// 状态允许更新矩阵
var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.BUYER.name, (_Roles$BUYER$name = {}, (0, _defineProperty3.default)(_Roles$BUYER$name, State.init, [State.inShopCart, State.unpaid, State.closed]), (0, _defineProperty3.default)(_Roles$BUYER$name, State.inShopCart, [State.unpaid, State.closed]), (0, _defineProperty3.default)(_Roles$BUYER$name, State.inShopCart, [State.closed]), (0, _defineProperty3.default)(_Roles$BUYER$name, State.sending, [State.confirmed, State.applyingForRefunding, State.changing]), _Roles$BUYER$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.SELLER.name, (_Roles$SELLER$name = {}, (0, _defineProperty3.default)(_Roles$SELLER$name, State.paid, [State.gettingRidOf]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.gettingRidOf, [State.sending]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.applyingForRefunding, [State.refunding]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.changing, [State.gettingRidOf]), _Roles$SELLER$name)), _StateTransformMatrix);

// 检查对象是否合法
var checkValid = function checkValid(trade, assertFn) {
    assertFn(trade.transitCost >= 0, 'trade must have transitCost');
    assertFn(trade.number > 0, 'trade must have number');
    assertFn(trade.price > 0, 'trade must have price');
};

module.exports = {
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};