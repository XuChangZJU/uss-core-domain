/**
 * Created by Administrator on 2018/5/31.
 */
const commonCode = require('../errorCode');

const errorCode = {
    noUserInfo: {code: 10004, message: '您还没有告诉小高算卦需要的信息呢'},
    uiExpired: {code: 10005, message: '您需要续费'},
};

module.exports = Object.assign(errorCode, commonCode);
