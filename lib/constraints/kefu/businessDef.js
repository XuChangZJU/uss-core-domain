'use strict';

var _axbBind, _company, _orderedService;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/action'),
    commonAction = _require2.action;

var _require3 = require('../../constants/kefu/axbBind'),
    origin = _require3.origin,
    axbBindAction = _require3.action,
    axbBindState = _require3.state,
    AXB_BIND_STATES_TRAN_MATRIX = _require3.STATE_TRANS_MATRIX;

var _require4 = require('../../constants/kefu/company'),
    companyAction = _require4.action,
    companyRelation = _require4.relation,
    companyState = _require4.state,
    COMPANY_STATE_TRANS_MATRIX = _require4.STATE_TRANS_MATRIX;

var _require5 = require('../../constants/kefu/orderedService'),
    orderedServiceAction = _require5.action,
    orderedServiceState = _require5.state,
    ORDERED_SERVICE_STATE_TRANS_MATRIX = _require5.STATE_TRANS_MATRIX;

var _require6 = require('../../constants/kefu/phoneCall'),
    phoneCallAction = _require6.action,
    phoneCallState = _require6.state,
    PHONE_CALL_STATE_TRANS_MATRIX = _require6.STATE_TRANS_MATRIX;

var _require7 = require('../../constants/kefu/phoneNumber'),
    phoneNumberAction = _require7.action,
    phoneNumberState = _require7.state,
    PHONE_NUMBER_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

// 判断被操作的axbBind的已订服务是否仍在订阅


var axbBindOrderedServiceSubscribed = { // exists都删去
    relation: 'orderedService',
    condition: function condition(_ref) {
        var user = _ref.user,
            row = _ref.row;

        return {
            id: row.orderedService.id,
            state: orderedServiceState.subscribed
        };
    }
};

// 判断被操作的axbBind所属公司和调用接口的公司是否是同一公司
var axbBindApiCompany = {
    relation: 'company',
    condition: function condition(_ref2) {
        var user = _ref2.user,
            row = _ref2.row;

        return {
            userId: user.id,
            id: row.orderedService.companyId
        };
    }
};

// 判断被操作的axbBind所属公司和操作者是否是owner和manager关系
var axbBindCompany = {
    relation: 'userCompany',
    condition: function condition(_ref3) {
        var user = _ref3.user,
            row = _ref3.row;

        return {
            userId: user.id,
            company: row.orderedService.companyId,
            relation: [companyRelation.owner, companyRelation.manager]
        };
    }
};

// 调用Api接口操作axbBind：1.该服务订阅中 2.被操作axbBind和调用公司所属同一公司
var axbBindApiManager = [axbBindOrderedServiceSubscribed, axbBindApiCompany];

// 在web或小程序系统中直接操作axbBind：1.该服务订阅中 2.被操作的axbBind的所属公司和操作者有owner和manager关系
var axbBindManager = [axbBindOrderedServiceSubscribed, axbBindCompany];

// 被操作的orderedService的所属公司和操作者有owner和manager关系
var orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.owner]
};

// 调用api的公司和被操作的orderedService所属同一个公司
var orderedServiceApiCompany = {
    relation: 'company',
    condition: function condition(_ref4) {
        var user = _ref4.user,
            row = _ref4.row;

        return {
            id: row.company.id,
            userId: user.id
        };
    }
};

var AUTH_MATRIX = {
    axbBind: (_axbBind = {}, _defineProperty(_axbBind, axbBindAction.create, {
        auths: [{
            '#exists': [{
                relation: 'orderedService',
                needData: true,
                condition: function condition(_ref5) {
                    var user = _ref5.user,
                        actionData = _ref5.actionData;

                    return {
                        id: actionData.axbBind.orderedServiceId,
                        state: orderedServiceState.subscribed
                    };
                }
            }]
        }]
    }), _defineProperty(_axbBind, axbBindAction.update, {
        auths: [{
            '#exists': axbBindManager
        }, {
            '#exists': axbBindApiManager
        }]
    }), _defineProperty(_axbBind, axbBindAction.remove, {
        auths: [{
            '#exists': axbBindManager
        }, {
            '#exists': axbBindApiManager
        }]
    }), _defineProperty(_axbBind, axbBindAction.unbind, {
        auths: [{
            '#exists': axbBindManager,
            '#data': [{
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return row.state === axbBindState.binded || row.state === axbBindState.expired;
                }
            }]
        }, {
            '#exists': axbBindApiManager,
            '#data': [{
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return row.state === axbBindState.binded || row.state === axbBindState.expired;
                }
            }]
        }]
    }), _defineProperty(_axbBind, axbBindAction.expire, {
        auths: [{
            '#exists': axbBindManager,
            '#data': [{
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return row.state === axbBindState.binded;
                }
            }]
        }, {
            '#exists': axbBindApiManager,
            '#data': [{
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return row.state === axbBindState.binded;
                }
            }]
        }]
    }), _axbBind),
    company: (_company = {}, _defineProperty(_company, companyAction.create, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            }
        }]
    }), _defineProperty(_company, companyAction.update, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            }
        }]
    }), _defineProperty(_company, companyAction.remove, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            }
        }]
    }), _defineProperty(_company, companyAction.enable, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            },
            '#data': {
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return row.state === companyState.offline;
                }
            }
        }]
    }), _defineProperty(_company, companyAction.disable, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            },
            '#data': {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return row.state === companyState.online;
                }
            }
        }]
    }), _company),
    orderedService: (_orderedService = {}, _defineProperty(_orderedService, orderedServiceAction.update, {
        auths: [{
            '#exists': [orderedServiceApiCompany]
        }, {
            '#relation': orderedServiceCompany
        }]
    }), _defineProperty(_orderedService, orderedServiceAction.remove, {
        auths: [{
            '#exists': [orderedServiceApiCompany]
        }, {
            '#relation': orderedServiceCompany
        }]
    }), _defineProperty(_orderedService, orderedServiceAction.subscribe, {
        auths: [{
            '#exists': [orderedServiceApiCompany],
            '#data': [{
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return row.state === orderedServiceState.unsubscribed;
                }
            }]
        }, {
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return row.state === orderedServiceState.unsubscribed;
                }
            }]
        }]
    }), _defineProperty(_orderedService, orderedServiceAction.unsubscribe, {
        auths: [{
            '#exists': [orderedServiceApiCompany],
            '#data': [{
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                }
            }]
        }, {
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                }
            }]
        }]
    }), _defineProperty(_orderedService, orderedServiceAction.renew, {
        auths: [{
            '#exists': [orderedServiceApiCompany],
            '#data': [{
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                }
            }]
        }, {
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return row.state === orderedServiceState.subscribed || row.state === orderedServiceState.expired;
                }
            }]
        }]
    }), _orderedService),
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
        /*[phoneCallAction.disconnect]: {
            auths: [
                {
                    '#exists': [
                        // 只有华为云的号码可以手动中断电话
                        {
                            relation: 'axbBind',
                            condition: ({ user, row }) => {
                                return {
                                    id: row.axbBind.id,
                                    origin: origin.huaweiCloud,
                                }
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === phoneCallState.inCall;
                            }
                        },
                    ],
                },
            ],
        },*/
    }
};

var STATE_TRANS_MATRIX = {
    axbBind: AXB_BIND_STATES_TRAN_MATRIX,
    company: COMPANY_STATE_TRANS_MATRIX,
    orderedService: ORDERED_SERVICE_STATE_TRANS_MATRIX,
    phoneNumber: PHONE_NUMBER_STATE_TRANS_MATRIX,
    phoneCall: PHONE_NUMBER_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};