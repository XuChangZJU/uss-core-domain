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
    relation: chatMessageRelation,
    STATE_TRANS_MATRIX: CHAT_MESSAGE_STATE_TRAN_MATRIX,
} = require('../../constants/zhiliao/chatMessage');

// 被操作的orderedService的所属公司和操作者有owner和manager关系
const orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.manager],
};

const chatMessageSender = {
    'exists': [
        {
            relation: 'userChatMessage',
            condition: ({ user, row }) => {
                const { id } = row;
                const query = {
                    userId: user.id,
                    chatMessageId: id,
                    relation: {
                        $in: [chatMessageRelation.receiver],
                    },
                };
                return query;
            },
        },
    ],
};

const chatMessageReceiver = {
    'exists': [
        {
            relation: 'userChatMessage',
            condition: ({ user, row }) => {
                const { id } = row;
                const query = {
                    userId: user.id,
                    chatMessageId: id,
                    relation: {
                        $in: [chatMessageRelation.receiver],
                    },
                };
                return query;
            },
        },
    ],
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
    session: {
        /*[sessionAction.create]: {},
        [sessionAction.update]: {},
        [sessionAction.remove]: {},*/
        [sessionAction.toManualService]: {
            auths: [
                {
                    '#relation': {
                        relation: [sessionRelation.customer],
                    },
                },
            ],
        },
        [sessionAction.finish]: {
            auths: [
                {
                    '#relation': {
                        relation: [sessionRelation.customer, sessionRelation.service],
                    },
                },
            ],
        },
    },
    chatMessage: {
        [chatMessageAction.create]: {
            auths: [
                {
                    'exists': [
                        {
                            relation: 'userChatMessage',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [chatMessageRelation.sender],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [chatMessageAction.send]: {
            auths: [
                chatMessageSender,
            ],
        },
        [chatMessageAction.read]: {
            auths: [
                chatMessageReceiver,
            ],
        },
        [chatMessageAction.withdraw]: {
            auths: [
                chatMessageSender,
            ],
        },
        [chatMessageAction.concealed]: {
            auths: [
                chatMessageSender,
                chatMessageReceiver,
            ],
        },
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