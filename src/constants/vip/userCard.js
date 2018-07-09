/**
 * Created by Administrator on 2018/7/9.
 */
const type = {
    owner: 1,
    borrow: 2,
};

const decodeType = (t) => {
    const STRING = {
        [type.owner]: '持卡人',
        [type.borrow]: '借用人',
    };

    return STRING[t];
};

module.exports = {
    type,
    decodeType,
};
