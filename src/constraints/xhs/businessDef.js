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
    action: MemberAchievementAction,
} = require('../../constants/xhs/memberAchievement');

const {
    action: ProjectAction,
} = require('../../constants/xhs/project');

const {
    action: MemberProjectAction,
} = require('../../constants/xhs/memberProject');

const {
    action: StarAction,
} = require('../../constants/xhs/star');

const {
    action: CommentAction,
} = require('../../constants/xhs/comment');

const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');

const {Roles} = require('../../constants/lens/roles');

const MemberOfAchievement = {
    '#exists': [
        {
            relation: 'memberAchievement',
            condition: ({user, row}) => {
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

const MemberAchievementOption = {
    '#exists': [
        {
            relation: 'memberAchievement',
            condition: ({user, row}) => {
                const query = {
                    member: {
                        userId: user.id,
                    },
                    // achievementId: row.id,
                    memberAchievementId: row.id,
                };
                return query;
            },
        },
    ],
};

const MemberOfProject = {
    '#exists': [
        {
            relation: 'memberProject',
            condition: ({user, row}) => {
                const query = {
                    member: {
                        userId: user.id,
                    },
                    projectId: row.id,
                };
                return query;
            },
        },
    ],
};

const MemberProjectOption = {
    '#exists': [
        {
            relation: 'memberProject',
            condition: ({user, row}) => {
                const query = {
                    member: {
                        userId: user.id,
                    },
                    memberProjectId: row.id,
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
                    '#data': [      // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row && row.userId === user.id;
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
                            condition: ({user}) => {
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
    memberAchievement: {
        [MemberAchievementAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'member',
                            condition: ({user}) => {
                                const query = {
                                    member: {
                                        userId: user.id,
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [MemberAchievementAction.update]: {
            auths: [
                MemberAchievementOption,
            ],
        },
        [MemberAchievementAction.remove]: {
            auths: [
                MemberAchievementOption,
            ],
        },
        [MemberAchievementAction.exchange]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'memberAchievement',
                            condition: ({user, row}) => {
                                const query = {
                                    member: {
                                        userId: user.id,
                                    },
                                    memberAchievementId: row.id,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
    },
    project: {
        [ProjectAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'member',
                            condition: ({user}) => {
                                const query = {
                                    userId: user.id,
                                    role: {
                                        $in: [MemberRole.teacher, MemberRole.graduate,MemberRole.student],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [ProjectAction.update]: {
            auths: [
                MemberOfProject,
            ],
        },
        [ProjectAction.remove]: {
            auths: [
                MemberOfProject,
            ],
        },
        [ProjectAction.try]: {
            auths: [
                MemberOfProject,
            ],
        },
        [ProjectAction.share]: {
            auths: [
                MemberOfProject,
            ],
        },
    },
    memberProject: {
        [MemberProjectAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'member',
                            condition: ({user}) => {
                                const query = {
                                    member: {
                                        userId: user.id,
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [MemberProjectAction.update]: {
            auths: [
                MemberProjectOption,
            ],
        },
        [MemberProjectAction.remove]: {
            auths: [
                MemberProjectOption,
            ],
        },
        [MemberProjectAction.exchange]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'memberProject',
                            condition: ({user, row}) => {
                                const query = {
                                    member: {
                                        userId: user.id,
                                    },
                                    memberProjectId: row.id,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
    },
    star: {
        [StarAction.update]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return user.id;
                            },
                        }
                    ],
                }
            ]
        },
    },
    comment: {
        [CommentAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'member',
                            condition: ({user}) => {
                                const query = {
                                    member: {
                                        userId: user.id,
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [CommentAction.update]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return user.id;
                            },
                        }
                    ],
                }
            ]
        },
    },
};


module.exports = {
    AUTH_MATRIX,
};
