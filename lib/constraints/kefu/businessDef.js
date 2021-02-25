'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _axbBind, _company, _orderedService, _phoneCall;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    axbBind: (_axbBind = {}, (0, _defineProperty3.default)(_axbBind, axbBindAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_axbBind, axbBindAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_axbBind, axbBindAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_axbBind, axbBindAction.unbind, AllowEveryoneAuth), (0, _defineProperty3.default)(_axbBind, axbBindAction.expire, AllowEveryoneAuth), _axbBind),
    company: (_company = {}, (0, _defineProperty3.default)(_company, companyAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.enable, AllowEveryoneAuth), (0, _defineProperty3.default)(_company, companyAction.disable, AllowEveryoneAuth), _company),
    orderedService: (_orderedService = {}, (0, _defineProperty3.default)(_orderedService, orderedServiceAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_orderedService, orderedServiceAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_orderedService, orderedServiceAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_orderedService, orderedServiceAction.subscribe, AllowEveryoneAuth), (0, _defineProperty3.default)(_orderedService, orderedServiceAction.unsubscribe, AllowEveryoneAuth), (0, _defineProperty3.default)(_orderedService, orderedServiceAction.renew, AllowEveryoneAuth), _orderedService),
    /*phoneNumber: {
        [phoneNumberAction.create]: {},
        [phoneNumberAction.update]: {},
        [phoneNumberAction.remove]: {},
        [phoneNumberAction.bind]: {},
        [phoneNumberAction.unbind]: {},
        [phoneNumberAction.arrear]: {},
        [phoneNumberAction.halt]: {},
    },*/
    phoneCall: (_phoneCall = {}, (0, _defineProperty3.default)(_phoneCall, phoneCallAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_phoneCall, phoneCallAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_phoneCall, phoneCallAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_phoneCall, phoneCallAction.answer, AllowEveryoneAuth), (0, _defineProperty3.default)(_phoneCall, phoneCallAction.disconnect, AllowEveryoneAuth), _phoneCall)
};

var STATE_TRAN_MATRIX = {
    axbBind: AXB_BIND_STATES_TRAN_MATRIX,
    company: COMPANY_STATE_TRANS_MATRIX,
    orderedService: ORDERED_SERVICE_STATE_TRANS_MATRIX,
    phoneNumber: PHONE_NUMBER_STATE_TRANS_MATRIX,
    phoneCall: PHONE_NUMBER_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};