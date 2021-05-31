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

const {
    action: sessionAction,
    state: sessionState,
    relation: sessionRelation,
    STATE_TRAN_MATRIX: SESSION_STATE_TRAN_MATRIX,
} = require('../../constants/zhiliao/session');

const {
    action: chatMessageAction,
    state: chatMessageState,
    // relation: chatMessageRelation,
    STATE_TRANS_MATRIX: CHAT_MESSAGE_STATE_TRAN_MATRIX,
} = require('../../constants/zhiliao/chatMessage');

// 被操作的orderedService的所属公司和操作者有owner和manager关系
const orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.manager],
};

// 被操作item的所属公司和操作者有owner和manager关系
const itemCompanyRelation = {
    '#relation': {
        attr: 'repository.company',
        relations: [companyRelation.owner, companyRelation.manager],
    }
};

const chatMessageUserSessionExists = {
    relation: 'userSession',
    condition: ({ user, actionData }) => {
        const { chatMessage } = actionData;

        const query = {
            userId: user.id,
            sessionId: chatMessage.sessionId,
        };
        return query;
    },
};

const chatMessageCreator = {
    relation: 'userChatMessageAction',
    condition: ({ user, row }) => {
        const { id: chatMessageId } = row;
        const query = {
            operatorId: user.id,
            action: commonAction.create,
            chatMessageId,
        };
        return query;
    },
};

const AUTH_MATRIX = {
    company: {
        [companyAction.create]: AllowEveryoneAuth,
        [companyAction.update]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner, companyRelation.manager, companyRelation.service, companyRelation.technician, companyRelation.preSaleService, companyRelation.postSaleService],
                    },
                },
            ],
        },
        [companyAction.remove]: OwnerRelationAuth,
        [companyAction.enable]: OwnerRelationAuth,
        [companyAction.disable]: OwnerRelationAuth,
        [companyAction.authRevoke]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner, companyRelation.manager, companyRelation.service, companyRelation.technician, companyRelation.preSaleService, companyRelation.postSaleService],
                    },
                },
            ],
        },
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
    session: {
        /*[sessionAction.create]: {},
        [sessionAction.update]: {},
        [sessionAction.remove]: {},*/
        [sessionAction.toManualService]: {
            auths: [
                {
                    '#relation': {
                        relations: [sessionRelation.customer],
                    },
                },
            ],
        },
        [sessionAction.finish]: {
            auths: [
                {
                    '#relation': {
                        relations: [sessionRelation.customer, sessionRelation.service],
                    },
                },
            ],
        },
    },
    chatMessage: {
        [chatMessageAction.create]: {
            auths: [
                {
                    '#exists': [
                        chatMessageUserSessionExists,
                    ],
                },
            ],
        },
        [chatMessageAction.send]: {
            auths: [
                {
                    '#exists': [
                        chatMessageUserSessionExists,
                    ],
                },
            ],
        },
        [chatMessageAction.read]: {
            auths: [
                {
                    '#unexists': [
                        chatMessageCreator,
                    ],
                },
            ],
        },
        [chatMessageAction.withdraw]: {
            auths: [
                {
                    '#exists': [
                        chatMessageUserSessionExists,
                        chatMessageCreator,
                    ],
                }
            ],
        },
        [chatMessageAction.concealed]: {
            auths: [
                {
                    '#exists': [
                        chatMessageUserSessionExists,
                    ],
                },
            ],
        },
    },
    repository: {
        [commonAction.create]:{
            auths: [
                {
                    '#relation': {
                        attr: 'company',
                        relations: [companyRelation.owner, companyRelation.manager],
                    },
                },
            ],
        },
        [commonAction.update]: AllowEveryoneAuth,
        [commonAction.remove]: AllowEveryoneAuth,
    },
    label: {
        [commonAction.create]:AllowEveryoneAuth,
        [commonAction.update]: AllowEveryoneAuth,
        [commonAction.remove]: AllowEveryoneAuth,
    },
    item: {
        [commonAction.create]: {
            auths: [itemCompanyRelation],
        },
        [commonAction.update]: {
            auths: [itemCompanyRelation],
        },
        [commonAction.remove]: {
            auths: [itemCompanyRelation],
        },
    },
    extraInfo: {
        [commonAction.create]:AllowEveryoneAuth,
        [commonAction.update]: AllowEveryoneAuth,
        [commonAction.remove]: AllowEveryoneAuth,
    },
    phoneCall: {
        [commonAction.create]:AllowEveryoneAuth,
        [commonAction.update]: AllowEveryoneAuth,
        [commonAction.remove]: AllowEveryoneAuth,
    },
};

const STATE_TRAN_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX,
    subscribedService: SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX,
    session: SESSION_STATE_TRAN_MATRIX,
    chatMessage: CHAT_MESSAGE_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
