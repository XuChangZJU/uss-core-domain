/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$SELLER$name, _Roles$SKUMANAGER$nam, _StateTransformMatrix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../constants/skuConstant'),
    State = _require.state;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

var isAvailable = function isAvailable(sku) {
    return sku.state < State.unavailable;
};

var AvailableStatesWhere = {
    $lt: State.state
};

var AttrsUpdateMatrix = (0, _defineProperty3.default)({}, Roles.SKUMANAGER.name, {
    // todo
});

var StateTransformMatrix = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.SELLER.name, (_Roles$SELLER$name = {}, (0, _defineProperty3.default)(_Roles$SELLER$name, State.available, [State.few, State.willOff, State.off, State.lack]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.lack, [State.available, State.few, State.willOff]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.willOff, [State.available, State.off, State.few, State.lack]), (0, _defineProperty3.default)(_Roles$SELLER$name, State.few, [State.available, State.willOff,, State.off, State.lack]), _Roles$SELLER$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.SKUMANAGER.name, (_Roles$SKUMANAGER$nam = {}, (0, _defineProperty3.default)(_Roles$SKUMANAGER$nam, State.unavailable, [State.available]), (0, _defineProperty3.default)(_Roles$SKUMANAGER$nam, State.available, [State.off, State.forbidden]), (0, _defineProperty3.default)(_Roles$SKUMANAGER$nam, State.off, [State.available, State.forbidden]), (0, _defineProperty3.default)(_Roles$SKUMANAGER$nam, State.forbidden, [State.available, State.off]), _Roles$SKUMANAGER$nam)), _StateTransformMatrix);

// 检查对象是否合法
var checkValid = function checkValid(sku, assertFn) {
    assertFn(sku.originalPrice >= sku.price, 'originalPrice must be larger than or equal to price');
    assertFn(sku.price > sku.cost, 'price must be larger than cost');
    assertFn(sku.name, 'name must be set');
    assertFn(sku.briefName, 'briefName must be set');
    assertFn(sku.name.length >= sku.briefName.length, 'length of briefName should not be longer than length of name');
    assertFn(sku.refundLine >= 0, 'refundLine must be an number');
    assertFn(sku.warehouseId > 0, 'warehouseId must be set');
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};