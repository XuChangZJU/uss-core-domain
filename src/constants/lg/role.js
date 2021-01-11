/**
 * Created by Xc on 2021/1/8.
 */
const { roles: commonRoles } = require('../roleConstant2');

const role = Object.assign({}, commonRoles, {
    touristGuide: 1,
    taxiDriver: 2,
    customer: 1001,
});

const decodeRole = (r) => {
    const TEXT = {
        [role.touristGuide]: '导游',
        [role.taxiDriver]: '的士司机',
        [role.customer]: '顾客',
    };


}