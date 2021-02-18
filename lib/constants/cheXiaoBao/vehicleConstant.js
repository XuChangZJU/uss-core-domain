/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spec = {
    suv: 1, // SUV
    car: 2, // 小轿车
    mini: 3 // 两厢车
};

var decodeSpec = function decodeSpec(t) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, spec.suv, 'SUV'), (0, _defineProperty3.default)(_STRINGS, spec.car, '小汽车'), (0, _defineProperty3.default)(_STRINGS, spec.mini, '两座小汽车'), _STRINGS);

    return STRINGS[t];
};

var colors = {
    '红': 0xFF0000,
    '黄': 0xFFFF00,
    '绿': 0x00FF00,
    '蓝': 0x0000FF,
    '黑': 0x000000,
    '白': 0xFFFFFF,
    '灰': 0x545454,
    '紫': 0x9932CD,
    '青': 0x5F9F9F,
    '亮金': 0xD9D919,
    '亮铜': 0xD98719,
    '墨绿': 0x00FFFF,
    '洋红': 0xFF00FF
};

module.exports = {
    spec: spec,
    decodeSpec: decodeSpec,
    colors: colors
};