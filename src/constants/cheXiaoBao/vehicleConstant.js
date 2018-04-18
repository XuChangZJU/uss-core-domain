/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const spec = {
    suv:    1,       // SUV
    car:    2,       // 小轿车
    mini:   3,      // 两厢车
};

const decodeSpec = (t) => {
    const STRINGS = {
        [spec.suv]: 'SUV',
        [spec.car]: '小汽车',
        [spec.mini]: '两座小汽车',
    };

    return STRINGS[t];
};

const colors = {
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
    '洋红': 0xFF00FF,
};



module.exports = {
    spec,
    decodeSpec,
    colors,
};
