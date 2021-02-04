const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');

const {
    action: commonAction,
} = require('../../constants/action');

const {
    action: axbBindAction,
    state: axbBindState,
    STATE_TRANS_MATRIX: AXB_BIND_STATES_TRAN_MATRIX,
} = require('../../constants/kefu/axbBind');

const {
    action: companyAction,
    relation: companyRelation,
    state: companyState,
    STATE_TRANS_MATRIX: COMPANY_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/company');

const {
    action: orderedServiceAction,
    state: orderedServiceState,
    STATE_TRANS_MATRIX: ORDERED_SERVICE_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/orderedService');

const {
    action: phoneCallAction,
    state: phoneCallState,
    STATE_TRANS_MATRIX: PHONE_CALL_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/phoneCall');

const {
    action: phoneNumberAction,
    state: phoneNumberState,
    STATE_TRANS_MATRIX: PHONE_NUMBER_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/phoneNumber');

// 判断被操作的axbBind的已订服务是否仍在订阅
const axbBindOrderedServiceSubscribed = {             // exists都删去
    relation: 'orderedService',
    condition: ({ user, row }) => {
        return {
            id: row.orderedService.id,
            state: orderedServiceState.subscribed,
        };
    },
};

// 判断被操作的axbBind所属公司和调用接口的公司是否是同一公司
const axbBindApiCompany = {
    relation: 'company',
    condition: ({ user, row }) => {
        return {
            userId: user.id,
            id: row.orderedService.companyId,
        };
    },
};

// 判断被操作的axbBind所属公司和操作者是否是owner和manager关系
const axbBindCompany = {
    relation: 'userCompany',
    condition: ({ user, row }) => {
        return {
            userId: user.id,
            company: row.orderedService.companyId,
            relation: [companyRelation.owner, companyRelation.manager],
        }
    }
};

// 调用Api接口操作axbBind：1.该服务订阅中 2.被操作axbBind和调用公司所属同一公司
const axbBindApiManager = [
    axbBindOrderedServiceSubscribed,
    axbBindApiCompany,
];

// 在web或小程序系统中直接操作axbBind：1.该服务订阅中 2.被操作的axbBind的所属公司和操作者有owner和manager关系
const axbBindManager = [
    axbBindOrderedServiceSubscribed,
    axbBindCompany,
];

// 被操作的orderedService的所属公司和操作者有owner和manager关系
const orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.owner],
};

// 调用api的公司和被操作的orderedService所属同一个公司
const orderedServiceApiCompany = {
    relation: 'company',
    condition: ({ user, row }) => {
        return {
            id: row.company.id,
            userId: user.id,
        };
    },
};

const AUTH_MATRIX = {
    axbBind: {
        [axbBindAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'orderedService',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    id: actionData.axbBind.orderedServiceId,
                                    state: orderedServiceState.subscribed,
                                };
                            },
                        },
                    ],
                },
            ],
        },
        [axbBindAction.update]: {
            auths: [
                {
                    '#exists': axbBindManager,
                },
                {
                    '#exists': axbBindApiManager,
                },
            ],
        },
        [axbBindAction.remove]: {
            auths: [
                {
                    '#exists': axbBindManager,
                },
                {
                    '#exists': axbBindApiManager,
                },
            ],
        },
        /*[axbBindAction.bind]: {
            auths: [
                {
                    '#exists': axbBindManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.init;
                            }
                        }
                    ],
                },
                {
                    '#exists': axbBindApiManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.init;
                            }
                        }
                    ],
                },
            ],
        },*/
        /*[axbBindAction.call]: {
            auths: [
                {
                    '#exists': axbBindApiManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.binded;
                            }
                        }
                    ],
                },
            ],
        },
        [axbBindAction.disconnected]: {
            auths: [
                {
                    '#exists': axbBindApiManager,
                },
            ],
        },*/
        [axbBindAction.unbind]: {
            auths: [
                {
                    '#exists': axbBindManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.binded || row.state === axbBindState.expired;
                            }
                        },
                    ],
                },
                {
                    '#exists': axbBindApiManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.binded || row.state === axbBindState.expired;
                            }
                        },
                    ],
                },
            ],
        },
        [axbBindAction.expire]: {
            auths: [
                {
                    '#exists': axbBindManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.binded;
                            }
                        },
                    ],
                },
                {
                    '#exists': axbBindApiManager,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === axbBindState.binded;
                            }
                        },
                    ],
                },
            ],
        },
    },
    company: {
        [companyAction.create]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                },
            ],
        },
        [companyAction.update]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                },
            ],
        },
        [companyAction.remove]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                },
            ],
        },
        [companyAction.enable]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                    '#data': {
                        check: ({ user, row }) => {
                            return row.state === companyState.offline;
                        },
                    },
                },
            ],
        },
        [companyAction.disable]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                    '#data': {
                        check: ({ user, row }) => {
                            return row.state === companyState.online;
                        },
                    },
                },
            ],
        },
    },
    orderedService: {
        // [orderedServiceAction.create]: {},
        [orderedServiceAction.update]: {
            auths: [
                {
                    '#exists': [orderedServiceApiCompany],
                },
                {
                    '#relation': orderedServiceCompany
                },
            ],
        },
        [orderedServiceAction.remove]: {
            auths: [
                {
                    '#exists': [orderedServiceApiCompany],
                },
                {
                    '#relation': orderedServiceCompany
                },
            ],
        },
        [orderedServiceAction.subscribe]: {
            auths: [
                {
                    '#exists': [orderedServiceApiCompany],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.unsubscribed;
                            },
                        },
                    ],
                },
                {
                    '#relation': orderedServiceCompany,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.unsubscribed;
                            },
                        },
                    ],
                },
            ],
        },
        [orderedServiceAction.unsubscribe]: {
            auths: [
                {
                    '#exists': [orderedServiceApiCompany],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                            },
                        },
                    ],
                },
                {
                    '#relation': orderedServiceCompany,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                            },
                        },
                    ],
                },
            ],
        },
        [orderedServiceAction.renew]: {
            auths: [
                {
                    '#exists': [orderedServiceApiCompany],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                            },
                        },
                    ],
                },
                {
                    '#relation': orderedServiceCompany,
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                            },
                        },
                    ],
                },
            ],
        },
        // [orderedServiceAction.expire]: {},
    },
    /*phoneNumber: {
        [phoneNumberAction.create]: {},
        [phoneNumberAction.update]: {},
        [phoneNumberAction.remove]: {},
        [phoneNumberAction.bind]: {},
        [phoneNumberAction.unbind]: {},
        [phoneNumberAction.arrear]: {},
        [phoneNumberAction.halt]: {},
    },*/
    phoneCall: {
        /*[phoneCallAction.create]: {},
        [phoneCallAction.update]: {},
        [phoneCallAction.remove]: {},
        [phoneCallAction.answer]: {},*/
        [phoneCallAction.disconnect]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === phoneCallState.inCall;
                            }
                        },
                    ],
                },
            ],
        },
    },
};

const STATE_TRANS_MATRIX = {
    axbBind: AXB_BIND_STATES_TRAN_MATRIX,
    company: COMPANY_STATE_TRANS_MATRIX,
    orderedService: ORDERED_SERVICE_STATE_TRANS_MATRIX,
    phoneNumber: PHONE_NUMBER_STATE_TRANS_MATRIX,
    phoneCall: PHONE_NUMBER_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRANS_MATRIX,
};