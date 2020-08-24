'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */
var _require = require('../../constants/xhs/member'),
    MemberAction = _require.action,
    MemberRole = _require.role;

var _require2 = require('../action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth,
    OwnerRelationAuth = _require2.OwnerRelationAuth,
    AnyRelationAuth = _require2.AnyRelationAuth;

var _require3 = require('../../constants/lens/roles'),
    Roles = _require3.Roles;

var OrganizationOwnerAndBrandWorker = {
    auths: [{
        '#exists': [{
            relation: 'userOrganization',
            condition: function condition(_ref) {
                var user = _ref.user,
                    row = _ref.row;
                var organizationId = row.id;

                var query = {
                    userId: user.id,
                    organizationId: organizationId
                };
                return query;
            }
        }]
    }, {
        "#relation": {
            attr: 'brand'
        }
    }]
};

var AUTH_MATRIX = {
    member: _defineProperty({}, MemberAction.update, {
        auths: [{
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return row.userId === user.id;
                }
            }]
        }]
    })
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX
};