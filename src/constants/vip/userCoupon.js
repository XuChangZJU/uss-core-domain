/**
 * Created by Administrator on 2018/7/9.
 */
const type = {
    owner: 1,
    gift: 2,
};

const decodeType = (t) => {
    const STRING = {
        [type.owner]: '领劵人',
        [type.gift]: '赠送',
    };

    return STRING[t];
};

module.exports = {
    type,
    decodeType,
};
