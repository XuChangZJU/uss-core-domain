/**
 * Created by Administrator on 2019/1/28.
 */
const category = {
    house: 1,
    room: 2,
};

const decodeCategory = (c) => {
    const STRING = {
        [category.house]: '房屋',
        [category.room]: '房间',
    };

    return STRING[c];
};

module.exports = {
    category,
    decodeCategory,
};
