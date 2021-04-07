'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _company, _subscribedService;

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

// 被操作的orderedService的所属公司和操作者有owner和manager关系


var orderedServiceCompany = {
    attr: 'company',
    relations: [companyRelation.owner, companyRelation.manager]
};

var AUTH_MATRIX = {
    company: (_company = {}, (0, _defineProperty3.default)(_company, companyAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.update, OwnerRelationAuth), (0, _defineProperty3.default)(_company, companyAction.remove, OwnerRelationAuth), (0, _defineProperty3.default)(_company, companyAction.enable, OwnerRelationAuth), (0, _defineProperty3.default)(_company, companyAction.disable, OwnerRelationAuth), _company),
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
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;

                    return row.state === subscribedServiceState.unsubscribed || row.state === subscribedServiceState.expired;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_subscribedService, subscribedServiceAction.unsubscribe, {
        auths: [{
            '#relation': orderedServiceCompany,
            '#data': [{
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return row.state === subscribedServiceState.subscribed || row.state === subscribedServiceState.expired;
                }
            }]
        }]
    }), _subscribedService)
};

var STATE_TRAN_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX,
    subscribedService: SUBSCRIBED_SERVICE_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};