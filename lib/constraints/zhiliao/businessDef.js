'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _company, _subscribedService, _session, _chatMessage, _repository, _label, _item;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/action'),
    commonAction = _require2.action;

var _require3 = require('../../constants/zhiliao/company'),
    companyAction = _require3.action,
    companyRelation = _require3.relation,
    companyState = _require3.state,
    COMPANY_STATE_TRANS_MATRIX = _require3.STATE_TRANS_MATRIX;

var _require4 = require('../../constants/zhiliao/subscribedService'),
    subscribedServiceAction = _require4.action,
    subscribedServiceState = _require4.state,
    SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX = _require4.STATE_TRANS_MATRIX;

var _require5 = require('../../constants/zhiliao/session'),
    sessionAction = _require5.action,
    sessionState = _require5.state,
    sessionRelation = _require5.relation,
    SESSION_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX;

var _require6 = require('../../constants/zhiliao/chatMessage'),
    chatMessageAction = _require6.action,
    chatMessageState = _require6.state,
    CHAT_MESSAGE_STATE_TRAN_MATRIX = _require6.STATE_TRANS_MATRIX;

// 被操作的orderedService的所属公司和操作者有owner和manager关系


var orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.manager]
};

// 被操作item的所属公司和操作者有owner和manager关系
var itemCompanyRelation = {
    '#relation': {
        attr: 'repository.company',
        relations: [companyRelation.owner, companyRelation.manager]
    }
};

var chatMessageUserSessionExists = {
    relation: 'userSession',
    condition: function condition(_ref) {
        var user = _ref.user,
            row = _ref.row;
        var sessionId = row.sessionId;

        var query = {
            userId: user.id,
            sessionId: sessionId
        };
        return query;
    }
};

var chatMessageCreator = {
    relation: 'userChatMessageAction',
    condition: function condition(_ref2) {
        var user = _ref2.user,
            row = _ref2.row;
        var chatMessageId = row.id;

        var query = {
            operatorId: user.id,
            action: commonAction.create,
            chatMessageId: chatMessageId
        };
        return query;
    }
};

var AUTH_MATRIX = {
    company: (_company = {}, (0, _defineProperty3.default)(_company, companyAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.update, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner, companyRelation.manager, companyRelation.service, companyRelation.technician, companyRelation.preSaleService, companyRelation.postSaleService]
            }
        }]
    }), (0, _defineProperty3.default)(_company, companyAction.remove, OwnerRelationAuth), (0, _defineProperty3.default)(_company, companyAction.enable, OwnerRelationAuth), (0, _defineProperty3.default)(_company, companyAction.disable, OwnerRelationAuth), _company),
    subscribedService: (_subscribedService = {}, (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.create, {
        auths: [{
            '#relation': orderedServiceCompany
        }]
    }), (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.update, {
        auths: [{
            '#relation': orderedServiceCompany
        }]
    }), (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.remove, {
        auths: [{
            '#relation': orderedServiceCompany
        }]
    }), (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.subscribe, {
        auths: [{
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return row.state === subscribedServiceState.unsubscribed || row.state === subscribedServiceState.expired;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.unsubscribe, {
        auths: [{
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return row.state === subscribedServiceState.subscribed || row.state === subscribedServiceState.expired;
                }
            }]
        }]
    }), _subscribedService),
    session: (_session = {}, (0, _defineProperty3.default)(_session, sessionAction.toManualService, {
        auths: [{
            '#relation': {
                relations: [sessionRelation.customer]
            }
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.finish, {
        auths: [{
            '#relation': {
                relations: [sessionRelation.customer, sessionRelation.service]
            }
        }]
    }), _session),
    chatMessage: (_chatMessage = {}, (0, _defineProperty3.default)(_chatMessage, chatMessageAction.create, {
        auths: [{
            '#exists': [chatMessageUserSessionExists]
        }]
    }), (0, _defineProperty3.default)(_chatMessage, chatMessageAction.send, {
        auths: [{
            '#exists': [chatMessageUserSessionExists]
        }]
    }), (0, _defineProperty3.default)(_chatMessage, chatMessageAction.read, {
        auths: [{
            '#unexists': [chatMessageCreator]
        }]
    }), (0, _defineProperty3.default)(_chatMessage, chatMessageAction.withdraw, {
        auths: [{
            '#exists': [chatMessageUserSessionExists, chatMessageCreator]
        }]
    }), (0, _defineProperty3.default)(_chatMessage, chatMessageAction.concealed, {
        auths: [{
            '#exists': [chatMessageUserSessionExists]
        }]
    }), _chatMessage),
    repository: (_repository = {}, (0, _defineProperty3.default)(_repository, commonAction.create, {
        auths: [{
            '#relation': {
                attr: 'company',
                relations: [companyRelation.owner, companyRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_repository, commonAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_repository, commonAction.remove, AllowEveryoneAuth), _repository),
    label: (_label = {}, (0, _defineProperty3.default)(_label, commonAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_label, commonAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_label, commonAction.remove, AllowEveryoneAuth), _label),
    item: (_item = {}, (0, _defineProperty3.default)(_item, commonAction.create, {
        auths: [itemCompanyRelation]
    }), (0, _defineProperty3.default)(_item, commonAction.update, {
        auths: [itemCompanyRelation]
    }), (0, _defineProperty3.default)(_item, commonAction.remove, {
        auths: [itemCompanyRelation]
    }), _item)
};

var STATE_TRAN_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX,
    subscribedService: SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX,
    session: SESSION_STATE_TRAN_MATRIX,
    chatMessage: CHAT_MESSAGE_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};