'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var state = {
    fresh: 1,
    free: 10,
    bound: 101
};

var entity = {
    shop: 1,
    useCard: 2
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.fresh, '新鲜的'), _defineProperty(_STRING, state.free, '空闲的'), _defineProperty(_STRING, state.bound, '绑定的'), _STRING);

    return STRING[s];
};

var decodeEntity = function decodeEntity(s) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, entity.shop, '门店'), _defineProperty(_STRING2, entity.useCard, '会员卡使用'), _STRING2);

    return STRING[s];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    entity: entity,
    decodeEntity: decodeEntity
};