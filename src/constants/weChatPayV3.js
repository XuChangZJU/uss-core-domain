/**
 * Created by Xc on 2020/12/27.
 * 本文件用于按微信支付V3的手册来定义一系列常量
 */
// 1、电商收付通部分

// 主体类型：https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter7_1_1.shtml
const organizationType = {
    '小微商户': '2401',
    '个人卖家': '2500',
    '个体工商户': '4',
    '企业': '2',
    '党政、机关及事业单位': '3',
    '其它组织': '1708',
};

const idDocType = {
    '身份证': 'IDENTIFICATION_TYPE_MAINLAND_IDCARD',
    '护照': 'IDENTIFICATION_TYPE_OVERSEA_PASSPORT',
    '中国香港-来往内地通行证': 'IDENTIFICATION_TYPE_HONGKONG',
    '中国澳门-来往内地通行证': 'IDENTIFICATION_TYPE_MACAO',
    '中国台湾-来往内地通行证': 'IDENTIFICATION_TYPE_TAIWAN',
};

const bankAccountType = {
    '对公帐户': '74',
    '对私帐户': '75',
};

const oTbaTMatrix = {
    [organizationType['小微商户']]: [bankAccountType['对私商户']],
    [organizationType['个人卖家']]: [bankAccountType['对私商户']],
    [organizationType['个体工商户']]: [bankAccountType['对公商户'], bankAccountType['对私商户']],
    [organizationType['企业']]: [bankAccountType['对公商户']],
    [organizationType['党政、机关及事业单位']]: [bankAccountType['对公商户']],
    [organizationType['其它组织']]: [bankAccountType['对公商户']],
};

const contactType = {
    '经营者、法人': '65',
    '负责人': '66',
};

const obCtMatrix = {
    [organizationType['小微商户']]: [contactType['经营者、法人']],
    [organizationType['个人卖家']]: [contactType['经营者、法人']],
    [organizationType['个体工商户']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['企业']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['党政、机关及事业单位']]: [contactType['经营者、法人'], contactType['负责人']],
    [organizationType['其它组织']]: [contactType['经营者、法人'], contactType['负责人']],
};

