const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    TRANSPORT_STATE_TRANS_MATRIX,
 } = require('./action');

const state = pick(commonState, [
    'unpaid',
    'legal',
    'paying',
    'partialPaid',
]);

const action = pick(commonAction, [
    'payPartially',
    'startToPay',
    'stopPaying',
    'pay',
]);

const STATE_TRAN_MATRIX = pick(TRANSPORT_STATE_TRANS_MATRIX, Object.keys(action));

const origin = {
    'weChatV3Partner': 1,
    'lianlian': 5,
    'shouQianBa': 10,
};

const decodeOrigin = (o) => {
    const TEXT = {
        [origin.weChatV3Partner]: '微信收付通',
        [origin.lianlian]: '连连',
        [origin.shouQianBa]: '收钱吧',
    };

    return TEXT[o];
};

const method = {
    'jsApi': 1,
    'h5': 2,
    'native': 3,
};

const decodeMethod = (m) => {
    const TEXT = {
        [method.jsApi]: 'JSAPI',
        [method.h5]: 'H5',
        [method.native]: 'NATIVE',
    };

    return TEXT[m];
};

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRAN_MATRIX,

    origin,
    decodeOrigin,
    method,
    decodeMethod,
};
