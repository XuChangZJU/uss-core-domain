'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var _require2 = require('./shop'),
    shopType = _require2.type;

var state = {
    approved: 11,
    fresh: 22
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.approved, '审核已通过'), _defineProperty(_TEXT, state.fresh, '未审核'), _TEXT);
    return TEXT[s];
};

var accountType = {
    public: 74,
    private: 75
};

var decodeAccountType = function decodeAccountType(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, accountType.public, '对公账户'), _defineProperty(_A, accountType.private, '对私账户'), _A);
    return A[a];
};

var getAccountType = function getAccountType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, shopType.microBusiness, [accountType.private]), _defineProperty(_T, shopType.selfEmployedSeller, [accountType.private]), _defineProperty(_T, shopType.selfEmployedBusiness, [accountType.private, accountType.public]), _defineProperty(_T, shopType.office, [accountType.public]), _defineProperty(_T, shopType.company, [accountType.public]), _defineProperty(_T, shopType.others, [accountType.public]), _T);
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

    var D = (_D = {}, _defineProperty(_D, docType.IDENTIFICATION_TYPE_MAINLAND_IDCARD, '中国大陆居民-身份证'), _defineProperty(_D, docType.IDENTIFICATION_TYPE_OVERSEA_PASSPORT, '其他国家或地区居民-护照'), _defineProperty(_D, docType.IDENTIFICATION_TYPE_HONGKONG, '中国香港居民–来往内地通行证'), _defineProperty(_D, docType.IDENTIFICATION_TYPE_MACAO, '中国澳门居民–来往内地通行证'), _defineProperty(_D, docType.IDENTIFICATION_TYPE_TAIWAN, '中国台湾居民–来往大陆通行证'), _D);
    return D[d];
};

var contactType = {
    legalPerson: 65,
    responsePerson: 66
};
var decodeContactType = function decodeContactType(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, contactType.legalPerson, '法人/经营者'), _defineProperty(_C, contactType.responsePerson, '责任人'), _C);
    return C[c];
};

var getContactType = function getContactType(t) {
    var _T2;

    var T = (_T2 = {}, _defineProperty(_T2, shopType.microBusiness, [contactType.legalPerson]), _defineProperty(_T2, shopType.selfEmployedSeller, [contactType.legalPerson]), _defineProperty(_T2, shopType.selfEmployedBusiness, [contactType.legalPerson, contactType.responsePerson]), _defineProperty(_T2, shopType.office, [contactType.legalPerson, contactType.responsePerson]), _defineProperty(_T2, shopType.company, [contactType.legalPerson, contactType.responsePerson]), _defineProperty(_T2, shopType.others, [contactType.legalPerson, contactType.responsePerson]), _T2);
    return T[t];
};
module.exports = _defineProperty({
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
    decodeDocType: decodeDocType
}, 'docType', docType);