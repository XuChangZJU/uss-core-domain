/**
 *
 * Created by Xc on 2020/2/20.
 */
const {
    action: MemberAction,
    role: MemberRole,
} = require('../../constants/xhs/member');

const {
    action: AchievementAction,
} = require('../../constants/xhs/achievement');

const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
    } = require('../action');

const { Roles } = require('../../constants/lens/roles');

const MemberOfAchievement = {
    '#exists': [
        {
            relation: 'memberAchievement',
            condition: ({ user, row }) => {
                const query = {
                    member: {
                        userId: user.id,
                    },
                    achievementId: row.id,
                };
                return query;
            },
        },
    ],
};

const AUTH_MATRIX = {
    member: {
        [MemberAction.update]: {
            auths: [
                {
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.userId === user.id;
                            },
                        }
                    ],
                }
            ]
        }
    },
    achievement: {
        [AchievementAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'member',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    role: {
                                        $in: [MemberRole.teacher, MemberRole.graduate],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [AchievementAction.update]: {
            auths: [
                MemberOfAchievement,
            ],
        },
        [AchievementAction.remove]: {
            auths: [
                MemberOfAchievement,
            ],
        },
    },
};


module.exports = {
    AUTH_MATRIX,
};
