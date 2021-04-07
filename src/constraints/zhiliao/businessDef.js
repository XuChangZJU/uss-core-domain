const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');

const {
    action: commonAction,
} = require('../../constants/action');

const {
    action: companyAction,
    relation: companyRelation,
    state: companyState,
    STATE_TRANS_MATRIX: COMPANY_STATE_TRANS_MATRIX,
} = require('../../constants/zhiliao/company');

const {
    action: subscribedServiceAction,
    state: subscribedServiceState,
    STATE_TRANS_MATRIX: SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX,
} = require('../../constants/zhiliao/subscribedService');

// 被操作的orderedService的所属公司和操作者有owner和manager关系
const orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.manager],
};

const AUTH_MATRIX = {
    company: {
        [companyAction.create]: AllowEveryoneAuth,
        [companyAction.update]: OwnerRelationAuth,
        [companyAction.remove]: OwnerRelationAuth,
        [companyAction.enable]: OwnerRelationAuth,
        [companyAction.disable]: OwnerRelationAuth,
    },
    subscribedService: {
        [subscribedServiceAction.create]: {
            auths: [
                {
                    '#relation': orderedServiceCompany,
                },
            ],
        },
        [subscribedServiceAction.update]: {
            auths: [
                {
                    '#relation': orderedServiceCompany,
                },
            ],
        },
        [subscribedServiceAction.remove]: {
            auths: [
                {
                    '#relation': orderedServiceCompany,
                },
            ],
        },
        [subscribedServiceAction.subscribe]: {
            auths: [
                {
                    '#relation': orderedServiceCompany,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === subscribedServiceState.unsubscribed || row.state === subscribedServiceState.expired;
                            },
                        },
                    ],
                },
            ],
        },
        [subscribedServiceAction.unsubscribe]: {
            auths: [
                {
                    '#relation': orderedServiceCompany,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === subscribedServiceState.subscribed || row.state === subscribedServiceState.expired;
                            },
                        },
                    ],
                },
            ],
        },
    },
};

const STATE_TRAN_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX,
    subscribedService: SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};