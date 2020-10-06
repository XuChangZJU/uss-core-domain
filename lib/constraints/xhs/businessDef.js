'use strict';

var _achievement, _memberAchievement, _project, _memberProject, _comment;

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

var _require3 = require('../../constants/xhs/memberAchievement'),
    MemberAchievementAction = _require3.action;

var _require4 = require('../../constants/xhs/project'),
    ProjectAction = _require4.action;

var _require5 = require('../../constants/xhs/memberProject'),
    MemberProjectAction = _require5.action;

var _require6 = require('../../constants/xhs/star'),
    StarAction = _require6.action;

var _require7 = require('../../constants/xhs/comment'),
    CommentAction = _require7.action;

var _require8 = require('../action'),
    AllowEveryoneAuth = _require8.AllowEveryoneAuth,
    OwnerRelationAuth = _require8.OwnerRelationAuth,
    AnyRelationAuth = _require8.AnyRelationAuth;

var _require9 = require('../../constants/lens/roles'),
    Roles = _require9.Roles;

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

var MemberAchievementOption = {
    '#exists': [{
        relation: 'memberAchievement',
        condition: function condition(_ref2) {
            var user = _ref2.user,
                row = _ref2.row;

            var query = {
                member: {
                    userId: user.id
                },
                // achievementId: row.id,
                memberAchievementId: row.id
            };
            return query;
        }
    }]
};

var MemberOfProject = {
    '#exists': [{
        relation: 'memberProject',
        condition: function condition(_ref3) {
            var user = _ref3.user,
                row = _ref3.row;

            var query = {
                member: {
                    userId: user.id
                },
                projectId: row.id
            };
            return query;
        }
    }]
};

var MemberProjectOption = {
    '#exists': [{
        relation: 'memberProject',
        condition: function condition(_ref4) {
            var user = _ref4.user,
                row = _ref4.row;

            var query = {
                member: {
                    userId: user.id
                },
                memberProjectId: row.id
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
                    check: function check(_ref5) {
                        var user = _ref5.user,
                            row = _ref5.row;

                        return row && row.userId === user.id;
                    }
                }]
        }]
    }),
    achievement: (_achievement = {}, _defineProperty(_achievement, AchievementAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref6) {
                    var user = _ref6.user;

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
    }), _achievement),
    memberAchievement: (_memberAchievement = {}, _defineProperty(_memberAchievement, MemberAchievementAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref7) {
                    var user = _ref7.user;

                    var query = {
                        member: {
                            userId: user.id
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_memberAchievement, MemberAchievementAction.update, {
        auths: [MemberAchievementOption]
    }), _defineProperty(_memberAchievement, MemberAchievementAction.remove, {
        auths: [MemberAchievementOption]
    }), _defineProperty(_memberAchievement, MemberAchievementAction.exchange, {
        auths: [{
            '#exists': [{
                relation: 'memberAchievement',
                condition: function condition(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    var query = {
                        member: {
                            userId: user.id
                        },
                        memberAchievementId: row.id
                    };
                    return query;
                }
            }]
        }]
    }), _memberAchievement),
    project: (_project = {}, _defineProperty(_project, ProjectAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref9) {
                    var user = _ref9.user;

                    var query = {
                        userId: user.id,
                        role: {
                            $in: [MemberRole.teacher, MemberRole.graduate, MemberRole.student]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_project, ProjectAction.update, {
        auths: [MemberOfProject]
    }), _defineProperty(_project, ProjectAction.remove, {
        auths: [MemberOfProject]
    }), _defineProperty(_project, ProjectAction.try, {
        auths: [MemberOfProject]
    }), _defineProperty(_project, ProjectAction.share, {
        auths: [MemberOfProject]
    }), _project),
    memberProject: (_memberProject = {}, _defineProperty(_memberProject, MemberProjectAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

                    var query = {
                        member: {
                            userId: user.id
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_memberProject, MemberProjectAction.update, {
        auths: [MemberProjectOption]
    }), _defineProperty(_memberProject, MemberProjectAction.remove, {
        auths: [MemberProjectOption]
    }), _defineProperty(_memberProject, MemberProjectAction.exchange, {
        auths: [{
            '#exists': [{
                relation: 'memberProject',
                condition: function condition(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    var query = {
                        member: {
                            userId: user.id
                        },
                        memberProjectId: row.id
                    };
                    return query;
                }
            }]
        }]
    }), _memberProject),
    star: _defineProperty({}, StarAction.update, {
        auths: [{
            '#data': [{
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return user.id;
                }
            }]
        }]
    }),
    comment: (_comment = {}, _defineProperty(_comment, CommentAction.create, {
        auths: [{
            '#exists': [{
                relation: 'member',
                condition: function condition(_ref13) {
                    var user = _ref13.user;

                    var query = {
                        member: {
                            userId: user.id
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_comment, CommentAction.update, {
        auths: [{
            '#data': [{
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return user.id;
                }
            }]
        }]
    }), _comment)
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX
};
