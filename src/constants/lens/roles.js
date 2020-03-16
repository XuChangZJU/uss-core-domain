/**
 * Created by Xc on 2020/2/20.
 */
const { Roles: CommonRoles } = require('../roleConstant2');

const Roles = Object.assign({}, CommonRoles, {
    BUSINESS: {
        name: 'business',
        id: 101,
    },
});

module.exports = {
    Roles,
};
