/**
 *
 * Created by Xc on 2020/2/20.
 */
const {
    action: MemberAction,
    role: MemberRole,
} = require('../../constants/xhs/member');

const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
    } = require('../action');

const { Roles } = require('../../constants/lens/roles');





const OrganizationOwnerAndBrandWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userOrganization',
                    condition: ({ user, row }) => {
                        const { id: organizationId } = row;
                        const query = {
                            userId: user.id,
                            organizationId,
                        };
                        return query;
                    },
                },
            ],
        },
        {
            "#relation": {
                attr: 'brand',
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
};


module.exports = {
    AUTH_MATRIX,
};
