const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');
const {
    action: CommonAction,
} = require('../../constants/action');
const {
    action: bannerAction,
} = require('../../constants/vendue/banner');
const {
    action: agentAction,
    state: agentState,
} = require('../../constants/vendue/agent');
const {
    action: depositAction,
    state: depositState,
    STATE_TRAN_MATRIX: DEPOSIT_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/deposit');
const {
    action: checkOutAction,
    state: checkOutState,
    transportState: checkOutTransportState,
    STATE_TRAN_MATRIX: CHECKOUT_STATE_TRAN_MATRIX,
    decodeAction: decodeCheckOutAction,
} = require('../../constants/vendue/checkOut');
const {
    action: cashInAction,
    state: cashInState,
    STATE_TRAN_MATRIX: CASHIN_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/cashIn');
const {
    action: auctionHouseAction,
    state: auctionHouseState,
    STATE_TRAN_MATRIX: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    relation: auctionHouseRelation,
} = require('../../constants/vendue/auctionHouse');
const {
    action: collectionAction,
    state: collectionState,
    relation: collectionRelation,
} = require('../../constants/vendue/collection');

const {
    action: contractAction,
    state: contractState,
    STATE_TRAN_MATRIX: CONTRACT_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/contract');

const {
    action: stockAction,
    state: stockState,
    STATE_TRAN_MATRIX: STOCK_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/stock');

const {
    action: vendueAction,
    state: vendueState,
    STATE_TRAN_MATRIX: VENDUE_STATE_TRAN_MATRIX,
    relation: vendueRelation,
} = require('../../constants/vendue/vendue');
const {
    action: sessionAction,
    state: sessionState,
    STATE_TRAN_MATRIX: SESSION_STATE_TRAN_MATRIX,
    relation: sessionRelation,
} = require('../../constants/vendue/session');
const {
    action: auctionAction,
    state: auctionState,
    STATE_TRAN_MATRIX: AUCTION_STATE_TRAN_MATRIX,
    relation: auctionRelation,
} = require('../../constants/vendue/auction');
const {
    action: bidAction,
    state: bidState,
    relation: bidRelation,
    STATE_TRAN_MATRIX: BID_STATE_TRAN_MATRIX,
    category: bidCategory,
} = require('../../constants/vendue/bid');
const {
    action: paddleAction,
    relation: paddleRelation,
    isPaddleOnline,
} = require('../../constants/vendue/paddle');
const {
    action: licenseAction,
    STATE_TRAN_MATRIX: license_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/license');
const {
    action: contractTermsAction,
    state: contractTermsState,
    COMMON_STATE_TRAN_MATRIX: CONTRACTTERMS_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/contractTerms');
const {
    action: qiniuFileAction,
    state: qiniuFileState,
} = require('../../constants/vendue/qiniuFile');
const {
    action: paymentRecordAction,
} = require('../../constants/vendue/paymentRecord');
const {
    action: expressAction,
} = require('../../constants/vendue/express');
const ErrorCode = require('../../constants/errorCode');
const { Roles } = require('../../constants/roleConstant2');

const ContractAuctionHouseWorkerExists = [
    {
        relation: 'userAuctionHouse',
        condition: ({ user, row }) => {
            const { auctionHouseId } = row;
            const query = {
                userId: user.id,
                auctionHouseId,
            };
            return query;
        },
    },
];

const StockAuctionHouseWorkerExists = [
    {
        relation: 'userAuctionHouse',
        condition: ({ user, row }) => {
            const { auctionHouseId } = row;
            const query = {
                userId: user.id,
                auctionHouseId,
                relation: {
                    $in: [auctionHouseRelation.stockKeeper, auctionHouseRelation.owner, auctionHouseRelation.manager],
                },
            };
            return query;
        },
    },
];

const AuctionDataCheck = (states, msg) => [
    {
        check: ({ actionData, row }) => {
            const { auction } = actionData;
            if (auction.biddingSchema) {
                auction.biddingSchema.forEach(
                    (ele, index) => {
                        if (ele.type >= 3) {
                            return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '目前仅支持顺序递增和258拍');
                        }
                        if (ele.type === 1 && ele.step && !((ele.max - ele.min) > ele.step)) {
                            return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '设置的步长过大');
                        }
                        if (index > 0) {
                            if (ele.min !== auction.biddingSchema[index - 1].max) {
                                return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                            }
                        }
                    }
                );
            }
            if (states) {
                assert(row);

                if (states.includes(row.state)) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                        name: 'auction',
                        operation: 'update',
                        data: row,
                    });
                }
            }
        },
    }
];

const AuctionGeneralStateChangeFn = (state, msg, extraConstraint) => {
    const control = [
        {
            '#relation': {
                attr: 'session',
            },
            '#data': AuctionDataCheck(state, msg),
        },
        {
            '#relation': {
                attr: 'session.vendue',
            },
            '#data': AuctionDataCheck(state, msg),
        },
        {
            '#relation': {
                attr: 'session.vendue.auctionHouse',
            },
            '#data': AuctionDataCheck(state, msg),
        },
    ];
    if (extraConstraint) {
        control.forEach(
            (con) => assign(con, extraConstraint)
        );
    }

    return control;
}

const AuctionExistsSession = [
    {
        relation: 'session',
        condition: ({ actionData }) => {
            const { auction } = actionData;
            const query = {
                id: auction.sessionId,
                state: {
                    $in: [
                        sessionState.preparing,
                        sessionState.ready,
                        sessionState.ongoing,
                    ],
                },
            };
            return query;
        },
    },
];

const AuctionCreateControl = {
    auths: [
        {
            '#relation': {
                attr: 'session',
                relation: [sessionRelation.owner],
            },
            '#exists': AuctionExistsSession,
        },
        {
            '#relation': {
                attr: 'session.vendue',
            },
            '#exists': AuctionExistsSession,
        },
        {
            '#relation': {
                attr: 'session.vendue.auctionHouse',
            },
            '#exists': AuctionExistsSession,
        },
    ],
};

const AuctionUnexistsBid = [
    {
        relation: 'bid',
        condition: ({ row }) => {
            return {
                auctionId: row.id,
            };
        },
        message: '该拍品上已经有人出价',
    },
];

const AuctionCheckBidUnexistedControl = {
    auths: [
        {
            '#relation': {
                attr: 'session',
                relation: [sessionRelation.owner],
            },
            '#unexists': AuctionUnexistsBid,
        },
        {
            '#relation': {
                attr: 'session.vendue',
            },
            '#unexists': AuctionUnexistsBid,
        },
        {
            '#relation': {
                attr: 'session.vendue.auctionHouse',
            },
            '#unexists': AuctionUnexistsBid,
        },
    ],
}

const AuctionHouseOwnerAndmanagerExists = [
    {
        relation: 'userAuctionHouse',
        condition: ({ user, row }) => {
            const { id: auctionHouseId } = row;
            const query = {
                userId: user.id,
                auctionHouseId,
                relation: {
                    $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                },
            };
            return query;
        },
    },
];

const AnyAuctionHouseWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userAuctionHouse',
                    condition: ({ user }) => {
                        const query = {
                            userId: user.id,
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};

const CheckContractDataState = (states, msg) => [
    {
        check: ({ row }) => {
            if (!states.includes(row.data)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                    name: 'contract',
                    operation: 'update',
                    data: row,
                });
            }
        },
    },
];

const CheckContractAuctionInactive = (message) => [
    {
        relation: 'auction',
        condition: ({ row, actionData }) => {
            const { id } = row;
            return {
                contractId: id,
                state: {
                    $gt: auctionState.ongoing,
                },
            };
        },
        message,
    },
];

const BidGeneralUpdateControl = (states) => ({
    auths: [
        {
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
            },
            '#data': [
                {
                    check: ({ row }) => {
                        return states.includes(row.state);
                    },
                },
            ],
        },
        {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner],
            },
            '#data': [
                {
                    check: ({ row }) => {
                        return states.includes(row.state);
                    },
                },
            ],
        },
        {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
            },
            '#data': [
                {
                    check: ({ row }) => {
                        return states.includes(row.state);
                    },
                },
            ],
        }
    ]
});

const DepositExistsPaddleVendue = {
    relation: 'paddle',
    needData: true,
    condition: ({ actionData }) => {
        const { deposit } = actionData;
        const { paddleId } = deposit;
        return {
            id: paddleId,
            vendue: {
                state: {
                    $in: [vendueState.ready, vendueState.ongoing],
                },
            },
        };
    },
};

const CollectionOwnerOrAuctionHouseWorker = {
    auths: [
        {
            'exists': [
                {
                    relation: 'userCollection',
                    condition: ({ user, row }) => {
                        const { id: collectionId } = row;
                        const query = {
                            userId: user.id,
                            collectionId,
                            relation: {
                                $in: [collectionRelation.owner],
                            },
                        };
                        return query;
                    },
                },
            ],
        },
        {
            'exists': [
                {
                    relation: 'stock',
                    condition: ({ user, row }) => {
                        const { id: stockId } = row;
                        const query = {
                            stockId,
                        };
                        const has = {
                            name: 'userAuctionHouse',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                collectionId: {
                                    $ref: query,
                                    $attr: 'auctionHouseId',
                                },
                                relation: {
                                    $in: [auctionHouseRelation.owner, auctionHouseRelation.stockKeeper],
                                },
                            },
                        };
                        Object.assign(query, { $has: has });
                        return query;
                    },

                },
            ],
        },
    ],
};

const paddleRefundDataCheck = (isSuperUser) => [
    {
        check: ({ row, actionData, user }) => {
            const { paddle, paymentMethod } = actionData;
            const { refundingDeposit } = paddle;
            const { onlineDeposit } = row;
            if (row.availableDeposit <= 0.01) {
                return ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '没有可退的余额');
            }
            if (row.refundingDeposit > 0) {
                return ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '当前有其它正在进行中的退款');
            }
            if (row.availableDeposit < refundingDeposit) {
                return ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '退款余额过多');
            }
            if (!isSuperUser) {
                // 非超级用户只能申请线上退款
                if (paymentMethod) {
                    return new Error('普遍用户不能定义退款方式');
                }
                if (refundingDeposit > onlineDeposit) {
                    // 自主退款申请金额不能大于onlineDeposit
                    return ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '线上支付的金额不足以支付本次退款，请联系拍卖行申请线下退款');
                }
            }
        },
    },
];

const paddleRefundUnexistsAuth = [
    {
        relation: 'bid',
        condition: ({ row }) => {
            return {
                paddleId: row.id,
                state: {
                    $in: [bidState.success, bidState.confirmed],
                },
                checkOutId: {
                    $exists: false,
                },
            };
        },
        message: '该号牌上有待进行结算的拍卖',
    },
    {
        relation: 'bid',
        condition: ({ row }) => {
            return {
                paddleId: row.id,
                state: {
                    $in: [bidState.success, bidState.confirmed],
                },
                checkOut: {
                    state: {
                        $in: [checkOutState.unpaid, checkOutState.paying],
                    },
                },
            };
        },
        message: '该号牌上有待进行结算的拍卖',
    },
];

const CheckOutCheckDataFn = (action, states, transportStates) => ({
    check: ({ row }) => {
        if (transportStates && transportStates.includes(row.transportState)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                `当前物流状态不支持${decodeCheckOutAction(action)}操作`, {
                name: 'checkOut',
                operation: 'update',
                data: row,
            });
        };
        if (states && states.includes(row.state)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                `当前状态不支持${decodeCheckOutAction(action)}操作`, {
                name: 'checkOut',
                operation: 'update',
                data: row,
            });
        };

        return true;
    },
});

const CheckOutGuestCheckFn = (action, states, transportStates) => ({
    '#exists': [
        {
            relation: 'paddle',
            condition: ({ user, row, roleName }) => {
                const query = {
                    id: row.paddleId,
                };
                if (roleName !== Roles.ROOT.name) {
                    assign(query, {
                        userId: user.id,
                    });
                }
                return query;
            },
        },
    ],
    '#data': [
        CheckOutCheckDataFn(action, states, transportStates),
    ],
});

const CheckOutVendueWorkerCheckFn = (action, states, transportStates) => ({
    "#relation": {
        attr: 'paddle.vendue.auctionHouse',
        relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner],
    },
    '#data': [
        CheckOutCheckDataFn(action, states, transportStates),
    ],
});

const CheckOutVendueAuctionHouseWorkerCheckFn = (action, states, transportStates) => ({
    "#relation": {
        attr: 'paddle.vendue.auctionHouse',
        relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner],
    },
    '#data': [
        CheckOutCheckDataFn(action, states, transportStates),
    ],
});

const LicenseOperationControl = {
    auths: [
        {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.owner, sessionRelation.manager],
            },
        },
        {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.owner, vendueRelation.manager],
            },
        },
        {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler],
            },
        }
    ]
};

const AUTH_MATRIX = {
    vendue: {
        [vendueAction.assign]: {
            auths: [
                {
                    "#relation": {
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ],
        },
        [vendueAction.create]: {
            auths: [
                {
                    "exists": [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { auctionHouse } = actionData;
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                    auctionHouseId: auctionHouse.id,
                                }
                            }
                        }
                    ]
                }
            ]
        },
        [vendueAction.update]: {
            auths: [
                {
                    "#relation": {
                    },
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                }
            ],
        },
        [vendueAction.start]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.ready].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.ready].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [vendueAction.ready]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.preparing].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.preparing].includes(row.state);
                            },
                        }
                    ]
                },
            ]
        },
        [vendueAction.finish]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.ongoing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.ongoing].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [vendueAction.transfer]: {
            auths: [
                {
                    "#relation": {
                    },
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                },
            ]
        },
        [vendueAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                    },
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                },
            ]
        },
        [vendueAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    "#data": [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.preparing, vendueState.ready].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                    },
                    "#data": [
                        {
                            check: ({ user, row }) => {
                                return [vendueState.preparing, vendueState.ready].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        // [vendueAction.authGrant]: {
        //     auths: [
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userVendue',
        //                     condition: ({user, row}) => {
        //                         const query = {
        //                             userId: user.id,
        //                             vendueId: row.id,
        //                             relation: {
        //                                 $in: [vendueRelation.manager, vendueRelation.owner],
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         },
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userAuctionHouse',
        //                     condition: ({user, row}) => {
        //                         const query = {
        //                             userId: user.id,
        //                             auctionHouseId: row.auctionHouseId,
        //                             relation: {
        //                                 $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         },
        //     ]
        // },
        [vendueAction.authRevoke]: {
            auths: [
                {
                    '#exists': [
                        {
                            needData: true,
                            relation: 'userVendue',
                            condition: ({ user, row, actionData }) => {
                                const { userVendue } = actionData;
                                if (!userVendue.relation) {
                                    return {
                                        userId: user.id,
                                        vendueId: row.id,
                                        relation: {
                                            $in: [vendueRelation.manager, vendueRelation.owner],
                                        },
                                    }
                                }
                                if (userVendue.relation === vendueRelation.owner) {
                                    return {
                                        relation: -1,
                                    }
                                }
                                if (userVendue.relation === vendueRelation.manager) {
                                    return {
                                        userId: user.id,
                                        vendueId: row.id,
                                        relation: {
                                            $in: [vendueRelation.owner],
                                        },
                                    }
                                }
                                if (userVendue.relation === vendueRelation.worker) {
                                    return {
                                        userId: user.id,
                                        vendueId: row.id,
                                        relation: {
                                            $in: [vendueRelation.manager, vendueRelation.owner],
                                        },
                                    }
                                }
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        }
    },
    session: {
        [sessionAction.assign]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.manager, sessionRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ],
        },
        [sessionAction.create]: {
            auths: [
                {
                    "exists": [
                        {
                            relation: 'userVendue',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { session } = actionData;
                                if (session.biddingSchema) {
                                    session.biddingSchema.forEach(
                                        (ele, index) => {
                                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                                            if (ele.type === 1 && ele.step)
                                                assert((ele.max - ele.min) > ele.step, '设置的步长过大');
                                            if (index > 0) {
                                                if (ele.min !== session.biddingSchema[index - 1].max) {
                                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                                                }
                                            }
                                        }
                                    );
                                }
                                return {
                                    userId: user.id,
                                    vendueId: session.vendueId,
                                    relation: {
                                        $exists: true,
                                    },
                                };
                            }
                        }
                    ]
                },
            ]
        },
        [sessionAction.update]: {
            auths: [
                {
                    "#relation": {
                    }
                },
                {
                    '#relation': {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager]
                    }
                },
                {
                    '#relation': {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                    }
                },
            ]
        },
        [sessionAction.start]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.owner, sessionRelation.manager, sessionRelation.auctioneer],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ready, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ready, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ready, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [sessionAction.ready]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.preparing].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.preparing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.preparing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [sessionAction.finish]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.owner, sessionRelation.manager, sessionRelation.auctioneer],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [sessionAction.pause]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                        {
                            check: ({ user, row }) => {
                                return row.state === sessionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === sessionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.state === sessionState.ongoing;
                            },
                        }
                    ],
                }
            ]
        },
        [sessionAction.transfer]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userSession',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    sessionId: row.id,
                                    relation: sessionRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    vendueId: row.vendueId,
                                    relation: {
                                        $in: [vendueRelation.owner, vendueRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.vendue.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [sessionAction.authGrantMulti2]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userSession',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    sessionId: row.id,
                                    relation: {
                                        $in: [sessionRelation.owner, sessionRelation.manager]
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    vendueId: row.vendueId,
                                    relation: {
                                        $in: [vendueRelation.owner, vendueRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.vendue.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        // [sessionAction.authGrant]: {
        //     auths: [
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userSession',
        //                     condition: ({user, row}) => {
        //                         const query = {
        //                             userId: user.id,
        //                             sessionId: row.id,
        //                             relation: {
        //                                 $in: [sessionRelation.owner, sessionRelation.manager]
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         },
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userVendue',
        //                     condition: ({user, row}) => {
        //                         const query = {
        //                             userId: user.id,
        //                             vendueId: row.vendueId,
        //                             relation: {
        //                                 $in: [vendueRelation.owner, vendueRelation.manager],
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         },
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userAuctionHouse',
        //                     condition: ({user, row}) => {
        //                         const query = {
        //                             userId: user.id,
        //                             auctionHouseId: row.vendue.auctionHouseId,
        //                             relation: {
        //                                 $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         },
        //     ]
        // },
        [sessionAction.authRevoke]: {
            auths: [
                {
                    '#exists': [
                        {
                            needData: 'true',
                            relation: 'userSession',
                            condition: ({ user, row, actionData }) => {
                                const { userSession } = actionData;
                                if (!userSession.relation) {
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: {
                                            $in: [sessionRelation.owner, sessionRelation.manager]
                                        },
                                    }
                                }
                                if (userSession.relation === sessionRelation.owner) {
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: -1,
                                    }
                                }
                                if (userSession.relation === sessionRelation.manager) {
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: {
                                            $in: [sessionRelation.owner],
                                        },
                                    }
                                }
                                if (userSession.relation === sessionRelation.worker) {
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: {
                                            $in: [sessionRelation.owner, sessionRelation.manager],
                                        },
                                    }
                                }
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    vendueId: row.vendueId,
                                    relation: {
                                        $in: [vendueRelation.owner, vendueRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.vendue.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [sessionAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.owner, sessionRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.owner, vendueRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                    },
                }
            ]
        }
    },
    auction: {
        [auctionAction.create]: AuctionCreateControl,
        [auctionAction.update]: AuctionCheckBidUnexistedControl,
        [auctionAction.ready]: {
            auths: AuctionGeneralStateChangeFn([auctionState.preparing], '非准备状态的展品不能就绪'),
        },
        [auctionAction.start]: {
            auths: AuctionGeneralStateChangeFn([auctionState.ready, auctionState.unsold, state.pausing], '该状态的展品不能进入拍卖'),
        },
        [auctionAction.pause]: {
            auths: AuctionGeneralStateChangeFn([auctionState.ongoing], '非拍卖状态的展品不能暂停'),
        },
        [auctionAction.sold]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                }
            ],
        },
        [auctionAction.unsold]: {
            auths: AuctionGeneralStateChangeFn([auctionState.ongoing], '非拍卖状态的展品不能流拍', {
                '#unexists': [
                    {
                        relation: 'bid',
                        condition: ({ row }) => {
                            return {
                                auctionId: row.id,
                            }
                        },
                        message: '拍品上已有出价，无法流拍',
                    },
                ],
            }),
        },
        [auctionAction.remove]: AuctionCheckBidUnexistedControl,
        [auctionAction.assign]: AllowEveryoneAuth,
        [auctionAction.authRevoke]: AllowEveryoneAuth,
    },
    bid: {
        [bidAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'auction',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { bid } = actionData;
                                return {
                                    id: bid.auctionId,
                                    state: auctionState.ongoing,
                                };
                            },
                        },
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { bid } = actionData;
                                return {
                                    id: bid.paddleId,
                                    userId: user.id,
                                };
                            },
                        },
                    ],
                },
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#exists': [
                        {
                            relation: 'auction',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { bid } = actionData;
                                return {
                                    id: bid.auctionId,
                                    state: auctionState.ongoing,
                                };
                            },
                        },
                    ],
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    '#exists': [
                        {
                            relation: 'auction',
                            needData: true,
                            condition: ({ actionData }) => {
                                const { bid } = actionData;
                                return {
                                    id: bid.auctionId,
                                    state: auctionState.ongoing,
                                };
                            },
                        },
                    ],
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#exists': [
                        {
                            relation: 'auction',
                            needData: true,
                            condition: ({ actionData }) => {
                                const { bid } = actionData;
                                return {
                                    id: bid.auctionId,
                                    state: auctionState.ongoing,
                                };
                            },
                        },
                    ],
                }
            ],
        },
        [bidAction.success]: BidGeneralUpdateControl([bidState.bidding]),
        [bidAction.remove]: BidGeneralUpdateControl([bidState.bidding]),
        [bidAction.update]: BidGeneralUpdateControl([bidState.bidding]),
        [bidAction.changePrice]: BidGeneralUpdateControl([bidState.success]),
        [bidAction.confirm]: BidGeneralUpdateControl([bidState.success]),
        [bidAction.violate]: BidGeneralUpdateControl([bidState.success, bidState.confirmed]),
    },
    paddle: {
        [paddleAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    userId: user.id,
                                    vendueId: actionData.paddle.vendueId,
                                }
                            },
                        },
                    ]
                },
                {
                    '#unexists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    userId: user.id,
                                    vendueId: actionData.paddle.vendueId,
                                }
                            },
                            message: '用户已经申领过一个号牌',
                        },
                    ],
                }
            ]
        },
        [paddleAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ]
        },
        [paddleAction.changePrice]: {
            auths: [
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ]
        },
        [paddleAction.refund]: {
            auths: [
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner],
                    },
                    '#data': paddleRefundDataCheck(true),
                    '#unexists': paddleRefundUnexistsAuth,
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#data': paddleRefundDataCheck(true),
                    '#unexists': paddleRefundUnexistsAuth,
                },
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { paddle } = actionData;
                                return {
                                    id: paddle.id,
                                    userId: user.id,
                                };
                            },
                        },
                    ],
                    '#data': paddleRefundDataCheck(false),
                    '#unexists': paddleRefundUnexistsAuth,
                }
            ]
        },
    },
    auctionHouse: {
        [auctionHouseAction.assign]: {
            auths: [
                {
                    "#relation": {
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ],
        },
        [auctionHouseAction.create]: AllowEveryoneAuth,
        [auctionHouseAction.update]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndmanagerExists,
                },
            ],
        },
        [auctionHouseAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                },
            ],
        },
        [auctionHouseAction.enable]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndmanagerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === auctionHouseState.offline;
                            },
                        },
                    ],
                },
            ],
        },
        [auctionHouseAction.disable]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndmanagerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === auctionHouseState.online;
                            },
                        },
                    ],
                },
            ],
        },
        [auctionHouseAction.transfer]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.id,
                                    relation: auctionHouseRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [auctionHouseAction.authGrantMulti2]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.id,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                }
            ]
        },
        // [auctionHouseAction.authGrant]: {
        //     auths: [
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userAuctionHouse',
        //                     condition: ({ user, row }) => {
        //                         const query = {
        //                             userId: user.id,
        //                             auctionHouseId: row.id,
        //                             relation: {
        //                                 $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
        //                             },
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //         }
        //     ]
        // },
        [auctionHouseAction.authRevoke]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({ user, row, actionData }) => {
                                const { userAuctionHouse } = actionData;
                                if (!userAuctionHouse.relation) {
                                    return {
                                        userId: user.id,
                                        auctionHouseId: row.id,
                                        relation: {
                                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                        },
                                    }
                                }
                                if (userAuctionHouse.relation === auctionHouseRelation.owner) {
                                    return {
                                        relation: -1,
                                    }
                                }
                                if (userAuctionHouse.relation === auctionHouseRelation.manager) {
                                    return {
                                        userId: user.id,
                                        auctionHouseId: row.id,
                                        relation: {
                                            $in: [auctionHouseRelation.owner],
                                        },
                                    }
                                }

                                if ([auctionHouseRelation.worker, auctionHouseRelation.auctioneer, auctionHouseRelation.settler, auctionHouseRelation.stockKeeper].includes(userAuctionHouse.relation)) {
                                    return {
                                        userId: user.id,
                                        auctionHouseId: row.id,
                                        relation: {
                                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                        },
                                    }
                                }
                            },
                        },
                    ],
                }
            ]
        }
    },
    collection: {
        [collectionAction.create]: AllowEveryoneAuth,
        [collectionAction.update]: CollectionOwnerOrAuctionHouseWorker,
        [collectionAction.remove]: CollectionOwnerOrAuctionHouseWorker,
    },
    contract: {
        [contractAction.create]: AnyAuctionHouseWorker,
        [contractAction.update]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': CheckContractDataState([contractState.convertible, contractState.contracted], '合同当前状态不允许更新'),
                },
                {
                    "#relation": {
                        attr: 'actionHouse',
                    },
                    '#data': CheckContractDataState([contractState.convertible, contractState.contracted], '合同当前状态不允许更新'),
                },
            ],
        },
        [contractAction.changePrice]: {
            auths: [
                {
                    "#relation": {
                        attr: 'actionHouse',
                    },
                    '#data': CheckContractDataState([contractState.convertible, contractState.contracted], '合同当前状态不允许改价'),
                },
            ],
        },
        [contractAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'actionHouse',
                    },
                    '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许删除'),
                    '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法删除'),
                },
            ],
        },
        [contractAction.pay]: {
            auths: [
                {
                    '#data': CheckContractDataState([contractState.contracted], '当前状态无法支付成功'),
                },
            ],
        },
        [contractAction.complete]: {
            auths: [
                {
                    "#relation": {
                        attr: 'actionHouse',
                    },
                    '#data': CheckContractDataState([contractState.convertible], '当前状态无法结算'),
                },
            ],
        },
        [contractAction.cancel]: {
            auths: [
                {
                    "#relation": {
                        attr: 'actionHouse',
                    },
                    '#data': CheckContractDataState([contractState.contracted], '当前状态无法取消'),
                    '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法取消'),
                },
            ],
        },
        [contractAction.abort]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': CheckContractDataState([contractState.contracted], '当前状态无法中止'),
                    '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法中止'),
                },
            ],
        },
    },
    stock: {
        [stockAction.create]: AnyAuctionHouseWorker,
        [stockAction.update]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                },
            ],
        },
        [stockAction.remove]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                },
            ],
        },
        [stockAction.inStore]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === stockState.notStored;
                            },
                        },
                    ],
                },
            ],
        },
        [stockAction.outStore]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === stockState.stored;
                            },
                        },
                    ],
                },
            ],
        },
        [stockAction.sell]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === stockState.stored;
                            },
                        },
                    ],
                },
            ],
        },
        [stockAction.return]: {
            auths: [
                {
                    '#exists': StockAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === stockState.stored;
                            },
                        },
                    ],
                },
            ],
        },
    },
    deposit: {
        [depositAction.create]: {
            auths: [
                {
                    '#exists': [DepositExistsPaddleVendue],
                    "#relation": {
                        attr: 'paddle.vendue',
                    },
                },
                {
                    '#exists': [DepositExistsPaddleVendue, {
                        relation: 'paddle',
                        needData: true,
                        condition: ({ user, actionData }) => {
                            const { deposit } = actionData;
                            const { paddleId } = deposit;
                            return {
                                id: paddleId,
                                userId: user.id,
                            };
                        },
                    }],
                }
            ]
        },
        [depositAction.makePaid]: {
            auths: [
                {
                    "#relation": {
                        attr: 'paddle.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'paddle.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner],
                    },
                }
            ]
        },
    },
    checkOut: {
        [checkOutAction.taPrepare]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping]),
                CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping])
            ]
        },
        [checkOutAction.taCancel]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping]),
                CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.shipping]),
            ]
        },
        [checkOutAction.taSend]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing]),
            ]
        },
        [checkOutAction.taAccept]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsSending]),
            ]
        },
        [checkOutAction.takeAway]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing, checkOutTransportState.shipping]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing, checkOutTransportState.shipping]),
            ]
        },
        [checkOutAction.create]: {
            auths: [
                {
                    '#unexists': [
                        {
                            relation: 'checkOut',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { checkOut } = actionData;
                                return {
                                    paddleId: checkOut.paddleId,
                                    state: {
                                        $in: [checkOutState.unpaid, checkOutState.paying],
                                    },
                                };
                            },
                            message: '存在尚未完成的结算，请先完成或撤销',
                        },
                    ],
                    // todo 检查bid是否都是success状态且未结算，这个似乎不太好写，目前是写在service/checkOut.js的trigger里
                }
            ],
        },
        [checkOutAction.changePrice]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid], null),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid], null),
            ]
        },
        [checkOutAction.makePaid]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                }
            ]
        },
        [checkOutAction.finish]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                }
            ]
        },
        [checkOutAction.cancel]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null),
                CheckOutVendueWorkerCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null),
            ]
        },
    },
    cashIn: {
        [cashInAction.create]: AllowEveryoneAuth,
        [cashInAction.makePaid]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler],
                                    }
                                };
                            },
                        },
                    ],
                }
            ],
        },
    },
    license: {
        [licenseAction.create]: LicenseOperationControl,
        [licenseAction.update]: LicenseOperationControl,
        [licenseAction.remove]: LicenseOperationControl,
    },
    agent: {
        [agentAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData, roleName }) => {
                                const { agent } = actionData;
                                const query = {
                                    id: agent.paddleId,
                                };
                                if (roleName !== Roles.ROOT.name) {
                                    assign(query, {
                                        userId: user.id,
                                    });
                                }
                                return query;
                            },
                        },
                        {
                            relation: 'auction',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { agent } = actionData;
                                const { auctionId } = agent;
                                const query = {
                                    state: {
                                        $in: [auctionState.ready, auctionState.ongoing],
                                    },
                                    id: auctionId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [agentAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            condition: ({ user, actionData, roleName }) => {
                                const { agent } = actionData;
                                const query = {
                                    id: agent.paddleId,
                                };
                                if (roleName !== Roles.ROOT.name) {
                                    assign(query, {
                                        userId: user.id,
                                    });
                                }
                                return query;
                            },
                        },
                        {
                            relation: 'auction',
                            condition: ({ user, row }) => {
                                const { auctionId } = row;
                                const query = {
                                    id: auctionId,
                                    state: auctionState.ready,
                                };
                                return query;
                            },
                        },
                    ],
                    '#unexists': [
                        {
                            relation: 'agent',
                            condition: ({ user }) => {
                                const { auctionId } = row;
                                const query = {
                                    paddle: {
                                        userId: user.id,
                                    },
                                    state: agentState.normal,
                                    auctionId,
                                };
                                return query;
                            },
                            message: '您在此拍品上已有一个委托，不可重复委托',
                        }
                    ],
                    '#data': [
                        {
                            check: ({ row }) => {
                                return [agentState.normal].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        }
    },
    qiniuFile: {
        [qiniuFileAction.create]: AllowEveryoneAuth,
        [qiniuFileAction.remove]: AllowEveryoneAuth,
    },
    paymentRecord: {
        [paymentRecordAction.create]: AllowEveryoneAuth,
        [paymentRecordAction.remove]: AllowEveryoneAuth,
    },
    banner: {
        [bannerAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [bannerAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                }
            ],
        },
        [bannerAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                }
            ],
        },
    },
    checkOutPush: {
        [CommonAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'checkOut',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { checkOutPush } = actionData;
                                const { checkOutId } = checkOutPush;
                                const query = {
                                    state: {
                                        $in: [checkOutState.unpaid, checkOutState.paying],
                                    },
                                    id: checkOutId,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ]
        }
    }
};

const STATE_TRAN_MATRIX = {
    auctionHouse: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    contract: CONTRACT_STATE_TRAN_MATRIX,
    stock: STOCK_STATE_TRAN_MATRIX,
    vendue: VENDUE_STATE_TRAN_MATRIX,
    session: SESSION_STATE_TRAN_MATRIX,
    auction: AUCTION_STATE_TRAN_MATRIX,
    deposit: DEPOSIT_STATE_TRAN_MATRIX,
    checkOut: CHECKOUT_STATE_TRAN_MATRIX,
    cashIn: CASHIN_STATE_TRAN_MATRIX,
    bid: BID_STATE_TRAN_MATRIX,
    contractTerms: CONTRACTTERMS_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
