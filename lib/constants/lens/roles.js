'use strict';

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../roleConstant2'),
    CommonRoles = _require.Roles;

var Roles = Object.assign({}, CommonRoles, {
    BUSINESS: {
        name: 'business',
        id: 101
    }
});

module.exports = {
    Roles: Roles
};