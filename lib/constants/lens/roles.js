'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../roleConstant2'),
    CommonRoles = _require.Roles;

var Roles = (0, _assign2.default)({}, CommonRoles, {
    BUSINESS: {
        name: 'business',
        id: 101
    }
});

module.exports = {
    Roles: Roles
};