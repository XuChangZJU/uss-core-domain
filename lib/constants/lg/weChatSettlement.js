'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var _require2 = require('./shop'),
    shopType = _require2.type;

var state = {
    fresh: 22,
    checking: 31,
    approved: 32,
    failed: 41
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.approved, '审核已通过'), (0, _defineProperty3.default)(_TEXT, state.checking, '审核中'), (0, _defineProperty3.default)(_TEXT, state.failed, '审核未通过'), (0, _defineProperty3.default)(_TEXT, state.fresh, '未审核'), _TEXT);
    return TEXT[s];
};

var accountType = {
    public: 74,
    private: 75
};

var decodeAccountType = function decodeAccountType(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, accountType.public, '对公账户'), (0, _defineProperty3.default)(_A, accountType.private, '对私账户'), _A);
    return A[a];
};

var getAccountType = function getAccountType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, shopType.microBusiness, [accountType.private]), (0, _defineProperty3.default)(_T, shopType.selfEmployedSeller, [accountType.private]), (0, _defineProperty3.default)(_T, shopType.selfEmployedBusiness, [accountType.private, accountType.public]), (0, _defineProperty3.default)(_T, shopType.office, [accountType.public]), (0, _defineProperty3.default)(_T, shopType.company, [accountType.public]), (0, _defineProperty3.default)(_T, shopType.others, [accountType.public]), _T);
    return T[t];
};

var docType = {
    IDENTIFICATION_TYPE_MAINLAND_IDCARD: 'IDENTIFICATION_TYPE_MAINLAND_IDCARD',
    IDENTIFICATION_TYPE_OVERSEA_PASSPORT: 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT',
    IDENTIFICATION_TYPE_HONGKONG: 'IDENTIFICATION_TYPE_HONGKONG',
    IDENTIFICATION_TYPE_MACAO: 'IDENTIFICATION_TYPE_MACAO',
    IDENTIFICATION_TYPE_TAIWAN: 'IDENTIFICATION_TYPE_TAIWAN'
};

var decodeDocType = function decodeDocType(d) {
    var _D;

    var D = (_D = {}, (0, _defineProperty3.default)(_D, docType.IDENTIFICATION_TYPE_MAINLAND_IDCARD, '中国大陆居民-身份证'), (0, _defineProperty3.default)(_D, docType.IDENTIFICATION_TYPE_OVERSEA_PASSPORT, '其他国家或地区居民-护照'), (0, _defineProperty3.default)(_D, docType.IDENTIFICATION_TYPE_HONGKONG, '中国香港居民–来往内地通行证'), (0, _defineProperty3.default)(_D, docType.IDENTIFICATION_TYPE_MACAO, '中国澳门居民–来往内地通行证'), (0, _defineProperty3.default)(_D, docType.IDENTIFICATION_TYPE_TAIWAN, '中国台湾居民–来往大陆通行证'), _D);
    return D[d];
};

var contactType = {
    legalPerson: 65,
    responsePerson: 66
};
var decodeContactType = function decodeContactType(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, contactType.legalPerson, '法人/经营者'), (0, _defineProperty3.default)(_C, contactType.responsePerson, '责任人'), _C);
    return C[c];
};

var getContactType = function getContactType(t) {
    var _T2;

    var T = (_T2 = {}, (0, _defineProperty3.default)(_T2, shopType.microBusiness, [contactType.legalPerson]), (0, _defineProperty3.default)(_T2, shopType.selfEmployedSeller, [contactType.legalPerson]), (0, _defineProperty3.default)(_T2, shopType.selfEmployedBusiness, [contactType.legalPerson, contactType.responsePerson]), (0, _defineProperty3.default)(_T2, shopType.office, [contactType.legalPerson, contactType.responsePerson]), (0, _defineProperty3.default)(_T2, shopType.company, [contactType.legalPerson, contactType.responsePerson]), (0, _defineProperty3.default)(_T2, shopType.others, [contactType.legalPerson, contactType.responsePerson]), _T2);
    return T[t];
};
var accountBank = {
    工商银行: '工商银行',
    交通银行: '交通银行',
    招商银行: '招商银行',
    民生银行: '民生银行',
    中信银行: '中信银行',
    浦发银行: '浦发银行',
    兴业银行: '兴业银行',
    光大银行: '光大银行',
    广发银行: '广发银行',
    平安银行: '平安银行',
    北京银行: '北京银行',
    华夏银行: '华夏银行',
    农业银行: '农业银行',
    建设银行: '建设银行',
    邮政储蓄银行: '邮政储蓄银行',
    中国银行: '中国银行',
    宁波银行: '宁波银行',
    其他银行: '其他银行'
};
module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    accountType: accountType,
    decodeAccountType: decodeAccountType,
    getAccountType: getAccountType,
    contactType: contactType,
    decodeContactType: decodeContactType,
    getContactType: getContactType,
    docType: docType,
    decodeDocType: decodeDocType,
    accountBank: accountBank
};