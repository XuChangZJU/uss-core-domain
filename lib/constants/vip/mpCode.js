'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/9.
 */
var state = {
    fresh: 1,
    free: 10,
    reserved: 50,
    bound: 101
};

var entity = {
    shop: 1,
    useCard: 2
};

var decodeState = function decodeState(s) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.fresh, '新鲜的'), (0, _defineProperty3.default)(_STRING, state.free, '空闲的'), (0, _defineProperty3.default)(_STRING, state.reserved, '保留的'), (0, _defineProperty3.default)(_STRING, state.bound, '绑定的'), _STRING);

    return STRING[s];
};

var decodeEntity = function decodeEntity(s) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, entity.shop, '门店'), (0, _defineProperty3.default)(_STRING2, entity.useCard, '会员卡使用'), _STRING2);

    return STRING[s];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    entity: entity,
    decodeEntity: decodeEntity
};