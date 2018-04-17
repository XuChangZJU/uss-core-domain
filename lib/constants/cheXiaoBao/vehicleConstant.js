/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const spec = {
    suv: 1, // SUV
    car: 2, // 小轿车
    mini: 3 // 两厢车
};

const decodeSpec = t => {
    const STRINGS = {
        [spec.suv]: 'SUV',
        [spec.car]: '小汽车',
        [spec.mini]: '两座小汽车'
    };

    return STRINGS[t];
};

module.exports = {
    spec,
    decodeSpec
};