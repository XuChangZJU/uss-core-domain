const {
    TRANSPORT_STATE_TRANS_MATRIX,
    action: commonAction,
    transportAction,
} = require('./action');

const { AllowEveryoneAuth } = require('../constraints/action');

const action = Object.assign(
    {}, transportAction, commonAction,
);

const AUTH_MATRIX = {
    [action.create]: AllowEveryoneAuth,
    [action.taSend]: AllowEveryoneAuth,
    [action.taAccept]: AllowEveryoneAuth,
    [action.taReject]: AllowEveryoneAuth,
    [action.taAbort]: AllowEveryoneAuth,
}

module.exports = {
    STATE_TRANS_MATRIX: TRANSPORT_STATE_TRANS_MATRIX,
    AUTH_MATRIX,
}