/**
 * Created by Xc on 2020/11/23.
 */
const type = {
    // diagnosis
    bindDiagnosis: 1,
    createOKGlassCheck: 2,
};


const decodeType = (t) => {
    const TEXT = {
        [type.bindDiagnosis]: '顾客绑定业务',
        [type.createOkGlassCheck]: '顾客登记角膜塑形镜检查',
    };

    return TEXT[t];
};

module.exports = {
    type,
    decodeType,
};

