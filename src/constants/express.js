const {
    TRANSPORT_STATE_TRANS_MATRIX,
    action: commonAction,
    decodeTransportState,
    decodeTransportAction,
    transportAction,
    transportState,
} = require('./action');

const ErrorCode = require('../constants/errorCode');

const { AllowEveryoneAuth } = require('../constraints/action');

const action = Object.assign(
    {}, transportAction, commonAction,
);

const AUTH_MATRIX = {
    [action.create]: AllowEveryoneAuth,
    [action.update]: AllowEveryoneAuth,
    [action.remove]: AllowEveryoneAuth,
    [action.taSend]: {
        auths: [
            {
                "#data": [
                    {
                        check: ({ row }) => {
                            if (![transportState.tsInPreparing].includes(row.transportState)) {
                                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                                    `当前物流状态不支持${decodeTransportAction(action.taSend)}操作`, {
                                        name: 'express',
                                        operation: 'update',
                                        data: row,
                                    });
                            };
                            return true;
                        },
                    }
                ]
            }
        ]
    },
    [action.taAccept]: {
        auths: [
            {
                "#data": [
                    {
                        check: ({ row }) => {
                            if (![transportState.tsSending].includes(row.transportState)) {
                                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                                    `当前物流状态不支持${decodeTransportAction(action.taAccept)}操作`, {
                                        name: 'express',
                                        operation: 'update',
                                        data: row,
                                    });
                            };
                            return true;
                        },
                    }
                ]
            }
        ]
    },
    [action.taReject]: {
        auths: [
            {
                "#data": [
                    {
                        check: ({ row }) => {
                            if (![transportState.tsSending].includes(row.transportState)) {
                                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                                    `当前物流状态不支持${decodeTransportAction(action.taReject)}操作`, {
                                        name: 'express',
                                        operation: 'update',
                                        data: row,
                                    });
                            };
                            return true;
                        },
                    }
                ]
            }
        ]
    },
}

module.exports = {
    STATE_TRANS_MATRIX: TRANSPORT_STATE_TRANS_MATRIX,
    action,
    AUTH_MATRIX,
    transportState,
}