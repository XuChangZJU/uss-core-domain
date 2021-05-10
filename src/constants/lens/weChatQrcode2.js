/**
 * Created by Xc on 2020/11/23.
 */
const type = {
    // diagnosis
    bindDiagnosis: 1,
    appointment: 2,
};


const decodeType = (t) => {
    const TEXT = {
        [type.bindDiagnosis]: '顾客绑定业务',
        [type.appointment]: '预约',
    };

    return TEXT[t];
};

module.exports = {
    type,
    decodeType,
};

