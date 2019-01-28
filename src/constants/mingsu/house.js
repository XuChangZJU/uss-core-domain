/**
 * Created by Administrator on 2019/1/28.
 */
const {
    category,
    decodeCategory,
} = require('../ble/houseConstant');

const memberShip = {
    level0: 1,
    level1: 10,
    level2: 100,
};

const decodeMemberShip = (ms) => {
    const STRING = {
        [memberShip.level0]: '普通民宿',
        [memberShip.level1]: 'B级会员民宿',
        [memberShip.level2]: 'B级共享会员',
    };

    return STRING[ms];
};

module.exports = {
    category,
    decodeCategory,
    memberShip,
    decodeMemberShip,
};
