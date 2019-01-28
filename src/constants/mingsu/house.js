/**
 * Created by Administrator on 2019/1/28.
 */
const {
    category,
    decodeCategory,
} = require('../ble/houseConstant');

const membership = {
    level0: 1,
    level1: 10,
    level2: 100,
};

const decodeMembership = (ms) => {
    const STRING = {
        [membership.level0]: '普通民宿',
        [membership.level1]: 'B级会员民宿',
        [membership.level2]: 'B级共享会员',
    };

    return STRING[ms];
};

module.exports = {
    category,
    decodeCategory,
    membership,
    decodeMembership,
};
