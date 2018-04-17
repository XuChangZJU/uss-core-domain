/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const { state: State } = require('../constants/skuConstant');
const { Roles } = require('../constants/roleConstant2');
const isAvailable = sku => {
    return sku.state < State.unavailable;
};

const AvailableStatesWhere = {
    $lt: State.state
};

const AttrsUpdateMatrix = {
    [Roles.SKUMANAGER.name]: {
        // todo
    }
};

const StateTransformMatrix = {
    [Roles.SELLER.name]: {
        [State.available]: [State.few, State.willOff, State.off, State.lack],
        [State.lack]: [State.available, State.few, State.willOff],
        [State.willOff]: [State.available, State.off, State.few, State.lack],
        [State.few]: [State.available, State.willOff,, State.off, State.lack]
    },
    [Roles.SKUMANAGER.name]: {
        [State.unavailable]: [State.available],
        [State.available]: [State.off, State.forbidden],
        [State.off]: [State.available, State.forbidden],
        [State.forbidden]: [State.available, State.off]
    }
};

// 检查对象是否合法
const checkValid = (sku, assertFn) => {
    assertFn(sku.originalPrice >= sku.price, 'originalPrice must be larger than or equal to price');
    assertFn(sku.price > sku.cost, 'price must be larger than cost');
    assertFn(sku.name, 'name must be set');
    assertFn(sku.briefName, 'briefName must be set');
    assertFn(sku.name.length >= sku.briefName.length, 'length of briefName should not be longer than length of name');
    assertFn(sku.refundLine >= 0, 'refundLine must be an number');
    assertFn(sku.warehouseId > 0, 'warehouseId must be set');
};

module.exports = {
    isAvailable,
    AvailableStatesWhere,
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid
};