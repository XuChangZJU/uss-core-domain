'use strict';

var _achievement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */
var _require = require('../../constants/xhs/member'),
    MemberAction = _require.action,
    MemberRole = _require.role;

var _require2 = require('../../constants/xhs/achievement'),
    AchievementAction = _require2.action;

var _require3 = require('../action'),
    AllowEveryoneAuth = _require3.AllowEveryoneAuth,
    OwnerRelationAuth = _require3.OwnerRelationAuth,
    AnyRelationAuth = _require3.AnyRelationAuth;

var _require4 = require('../../constants/lens/roles'),
    Roles = _require4.Roles;

var MemberOfAchievement = {
    '#exists': [{
        relation: 'memberAchievement',
        condition: function condition(_ref) {
            var user = _ref.user,
                row = _ref.row;

            var query = {
                member: {
                    userId: user.id
                },
                achievementId: row.id
            };
            return query;
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
    }),
    achievement: (_achievement = {}, _defineProperty(_achievement, AchievementAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref3) {
                    var user = _ref3.user;

                    var query = {
                        userId: user.id,
                        role: {
                            $in: [MemberRole.teacher, MemberRole.graduate]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_achievement, AchievementAction.update, {
        auths: [MemberOfAchievement]
    }), _defineProperty(_achievement, AchievementAction.remove, {
        auths: [MemberOfAchievement]
    }), _achievement)
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX
};