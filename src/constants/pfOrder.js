const pick = require('lodash/pick');
const { 
    state: commonState, 
    action: commonAction,
    decodeState,
    decodeAction,
    COMMON_STATE_TRAN_MATRIX,
 } = require('./action');
 const { AllowEveryoneAuth } = require('../constraints/action');

const state = pick(commonState, [
    'unpaid',
    'legal',
    'paying',
    'partialPaid',
    'refunding',
    'refunded',
    'partialRefunded',
    'cancelled',
    'expired',
    'completed',
]);

const action = pick(commonAction, [
    'cancel',
    'pay',
    'expire',
    'complete',
    'payPartially',
    'startToPay',
    'refund',
    'refundSuccess',
    'refundPartially',
]);

const STATE_TRANS_MATRIX = pick(COMMON_STATE_TRAN_MATRIX, Object.values(action));

const AUTH_MATRIX = {
    [action.create]: AllowEveryoneAuth,
    [action.pay]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.cancel]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.expire]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.complete]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.payPartially]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.startToPay]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.refund]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.refundSuccess]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
    [action.refundPartially]: {
        auths: [
            {
                "#role": [Roles.ROOT.name]
            },
        ],
    },
};

module.exports = {
    action,
    state,
    decodeAction,
    decodeState,
    STATE_TRANS_MATRIX,
    AUTH_MATRIX,
};
