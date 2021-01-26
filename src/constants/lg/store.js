
const {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
} = require('../action');

const {
    type: shopType
} = require('./shop');
const state = {
    approved: 11,
    fresh: 22,
};

const decodeState = (s) => {
    const TEXT = {
        [state.approved]: '审核已通过',
        [state.fresh]: '未审核',
    };
    return TEXT[s];
};

const accountType = {
    public: 74,
    private: 75,
};

const decodeAccountType = (a) => {
    const A = {
        [accountType.public]: '对公账户',
        [accountType.private]: '对私账户',
    }
    return A[a];
};

const getAccountType = (t) => {
    const T = {
        [shopType.microBusiness]: [accountType.private],
        [shopType.selfEmployedSeller]: [accountType.private],
        [shopType.selfEmployedBusiness]: [accountType.private, accountType.public],
        [shopType.office]: [accountType.public],
        [shopType.company]: [accountType.public],
        [shopType.others]: [accountType.public],
    }
    return T[t];
};

const docType = {
    IDENTIFICATION_TYPE_MAINLAND_IDCARD: 'IDENTIFICATION_TYPE_MAINLAND_IDCARD',
    IDENTIFICATION_TYPE_OVERSEA_PASSPORT: 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT',
    IDENTIFICATION_TYPE_HONGKONG: 'IDENTIFICATION_TYPE_HONGKONG',
    IDENTIFICATION_TYPE_MACAO: 'IDENTIFICATION_TYPE_MACAO',
    IDENTIFICATION_TYPE_TAIWAN: 'IDENTIFICATION_TYPE_TAIWAN',
};

const decodeDocType = (d) => {
    const D = {
        [docType.IDENTIFICATION_TYPE_MAINLAND_IDCARD]: '中国大陆居民-身份证',
        [docType.IDENTIFICATION_TYPE_OVERSEA_PASSPORT]: '其他国家或地区居民-护照',
        [docType.IDENTIFICATION_TYPE_HONGKONG]: '中国香港居民–来往内地通行证',
        [docType.IDENTIFICATION_TYPE_MACAO]: '中国澳门居民–来往内地通行证',
        [docType.IDENTIFICATION_TYPE_TAIWAN]: '中国台湾居民–来往大陆通行证',
    }
    return D[d];
}

const contactType = {
    legalPerson: 65,
    responsePerson: 66,
}
const decodeContactType = (c) => {
    const C = {
        [contactType.legalPerson]: '法人/经营者',
        [contactType.responsePerson]: '责任人',
    };
    return C[c];
}

const getContactType = (t) => {
    const T = {
        [shopType.microBusiness]: [contactType.legalPerson],
        [shopType.selfEmployedSeller]: [contactType.legalPerson],
        [shopType.selfEmployedBusiness]: [contactType.legalPerson, contactType.responsePerson],
        [shopType.office]: [contactType.legalPerson, contactType.responsePerson],
        [shopType.company]: [contactType.legalPerson, contactType.responsePerson],
        [shopType.others]: [contactType.legalPerson, contactType.responsePerson],
    };
    return T[t];
}
module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    relation,
    decodeRelation,
    accountType,
    decodeAccountType,
    getAccountType,
    contactType,
    decodeContactType,
    getContactType,
    docType,
    decodeDocType,
};

