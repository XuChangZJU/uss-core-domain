const assign = require('lodash/assign');
const assert = require('assert');
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
    category: vendueCategory,
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

const { AUTH_MATRIX: EXPRESS_AUTH_MATRIX, STATE_TRANS_MATRIX: EXPRESS_STATE_TRANS_MATRIX } = require('../../constants/express');
const ErrorCode = require('../../constants/errorCode');
const { Roles } = require('../../constants/roleConstant2');
const omit = require('lodash/omit');

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

                if (!states.includes(row.state)) {
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
            (con) => Object.assign(con, extraConstraint)
        );
    }

    return control;
}

const AuctionCanCreate = [
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
    {
        relation: 'contract',
        condition: ({ actionData }) => {
            const { auction } = actionData;
            const query = {
                id: auction.contractId,
                state: contractState.contracted,
            };
            return query;
        },
    },
];

const AuctionNoOtherAuctionOnSameContract = [
    {
        relation: 'auction',
        condition: ({ actionData }) => {
            const { auction } = actionData;
            const { contractId } = auction;
            const query = {
                state: {
                    $in: [
                        auctionState.sold,
                        auctionState.ready,
                        auctionState.ongoing,
                    ],
                },
                contractId,
            };
            return query;
        },
        message: '该拍品已经在另一个有效的拍卖当中',
    },
    {
        relation: 'auction',
        condition: ({ actionData }) => {
            const { auction } = actionData;
            const { contractId, sessionId } = auction;
            const query = {
                contractId,
                sessionId,
            };
            return query;
        },
        message: '该拍品已经存在于同一个拍卖当中',
    },
];

const AuctionCreateControl = {
    auths: [
        {
            '#relation': {
                attr: 'session',
                relation: [sessionRelation.owner],
            },
            '#exists': AuctionCanCreate,
            '#unexists': AuctionNoOtherAuctionOnSameContract,
        },
        {
            '#relation': {
                attr: 'session.vendue',
            },
            '#exists': AuctionCanCreate,
            '#unexists': AuctionNoOtherAuctionOnSameContract,
        },
        {
            '#relation': {
                attr: 'session.vendue.auctionHouse',
            },
            '#exists': AuctionCanCreate,
            '#unexists': AuctionNoOtherAuctionOnSameContract,
        },
    ],
};

const AuctionUnexistsBid = [
    {
        relation: 'bid',
        condition: ({ row, actionData }) => {
            const { auction } = actionData;

            if (auction.hasOwnProperty('id') && Object.keys.length === 1){
                return {
                    id: -1,
                }
            }
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
        check: ({ row, actionData }) => {
            const { contract } = actionData;
            // if (contract.hasOwnProperty('price')) {
            //     assert(contract.price >= 0, `合同「${row.id}」的价格必须大于等于0`);
            // }
            if (!states.includes(row.state)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                    name: 'contract',
                    operation: 'update',
                    data: row,
                });
            }

            return true;
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

const BidDataCheckStateFn = (states, checkDataFn) => ({
    check: ({ row, actionData }) => {
        const { bid } = actionData;
        if (bid && bid.hasOwnProperty('price')) {
            assert(bid.price >= 0, `bid「${row.id}」的价格必须大于等于0`);
        }
        if (!states.includes(row.state)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                `当前状态不支持此操作`, {
                name: 'bid',
                operation: 'update',
                data: row,
            });
        }
        if (checkDataFn) {
            return checkDataFn({ row, actionData });
        }
        return true;
    },
});

const BidGeneralUpdateControl = (states, extra, checkDataFn) => {
    const DataCheck = BidDataCheckStateFn(states, checkDataFn);
    const Auth1 = assign({
        "#relation": {
            attr: 'auction.session',
            relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
        },
        '#data': [DataCheck],
    }, extra);
    const Auth2 = assign({
        "#relation": {
            attr: 'auction.session.vendue',
            relations: [vendueRelation.manager, vendueRelation.owner],
        },
        '#data': [DataCheck],
    }, extra);
    const Auth3 = assign({
        "#relation": {
            attr: 'auction.session.vendue.auctionHouse',
            relations: [auctionHouseRelation.manager, auctionHouseRelation.owner, auctionHouseRelation.auctioneer, auctionHouseRelation.settler],
        },
        '#data': [DataCheck],
    }, extra);

    return {
        auths: [ Auth1, Auth2, Auth3],
    };
};

const DepositExistsPaddleVendue = {
    relation: 'paddle',
    needData: true,
    condition: ({ actionData }) => {
        const { deposit } = actionData;
        const { paddleId, price } = deposit;
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
            const { refundingDeposit, id } = paddle;
            const { onlineDeposit } = row;
            assert(id === row.id);

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
                    $in: [bidState.bidding, bidState.success, bidState.confirmed],
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
        message: '该号牌上有待进行结算的订单',
    },
    {
        relation: 'agent',
        condition: ({ row }) => {
            return {
                paddleId: row.id,
                state: {
                    $in: [agentState.normal],
                },
            };
        },
        message: '该号牌上有生效中的委托',
    },
];

const CheckOutCheckDataFn = (action, states, transportStates) => ({
    check: ({ row, actionData }) => {
        if (transportStates && !transportStates.includes(row.transportState)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                `当前物流状态不支持${decodeCheckOutAction(action)}操作`, {
                name: 'checkOut',
                operation: 'update',
                data: row,
            });
        };
        if (states && !states.includes(row.state)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                `当前状态不支持${decodeCheckOutAction(action)}操作`, {
                name: 'checkOut',
                operation: 'update',
                data: row,
            });
        };

        const { checkOut } = actionData;
        if (checkOut && checkOut.hasOwnProperty('price')) {
            assert(checkOut.price >= 0, `checkOut的价格必须大于等于0`);
        }
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

const CheckOutPushExistsCheckOut = [
    {
        relation: 'checkOut',
        needData: true,
        condition: ({ actionData }) => {
            const { checkOutPush } = actionData;
            const { paddleId } = checkOutPush;
            const query = {
                state: {
                    $in: [checkOutState.unpaid, checkOutState.paying],
                },
                paddleId,
            };
            return query;
        },
    },
];

const CheckOutPushExistsBid = [
    {
        relation: 'bid',
        needData: true,
        condition: ({ actionData }) => {
            const { checkOutPush } = actionData;
            const { paddleId } = checkOutPush;
            const query = {
                checkOutId: {
                    $exists: false,
                },
                state: bidState.success,
                paddleId,
            };
            return query;
        },
    },
];

const CheckOutPushUnexistsRecentCheckOutPush = [
    {
        relation: 'checkOutPush',
        needData: true,
        condition: ({ actionData }) => {
            const { checkOutPush } = actionData;
            const { paddleId } = checkOutPush;
            const query = {
                paddleId,
                _createAt_: {
                    $gt: Date.now() - 3600 * 1000,
                },
            };
            return query;
        },
        message: '一小时以内请勿重复打扰客户',
    },
];

const UnexistsActiveAuctionInSession = {
    relation: 'auction',
    condition: ({ user, row }) => {
        return {
            sessionId: row.id,
            state: {
                $nin: [auctionState.unsold, auctionState.sold, auctionState.revoke],
            }
        };
    },
    message: '请将拍卖会中所有拍品流拍或成交后再将拍卖会结束',
};

const ExistsAuctionForBidCreation = {
    relation: 'auction',
    needData: true,
    condition: ({ user, actionData }) => {
        const { bid } = actionData;
        if (bid.agentId) {
            return {
                id: bid.auctionId,
                state: {
                    $in: [auctionState.ongoing, auctionState.ready],
                },
            };
        }
        return {
            id: bid.auctionId,
            state: {
                $in: [auctionState.ongoing],
            },
        };
    },
};

const SessionStateForBidCreation = {
    relation: 'session',
    needData: true,
    condition: ({ user, actionData }) => {
        const { bid } = actionData;
        if (bid.agentId) {
            return {
                id: {
                    $in: {
                        name: 'auction',
                        query: {
                            id: bid.auctionId,
                        },
                        projection: 'sessionId',
                    },
                },
                state: {
                    $in: [auctionState.ongoing, auctionState.ready],
                },
            };
        }
        return {
            id: {
                $in: {
                    name: 'auction',
                    query: {
                        id: bid.auctionId,
                    },
                    projection: 'sessionId',
                },
            },
            state: {
                $in: [auctionState.ongoing],
            },
        };
    },
    message: '专场尚未开始，不能出价',
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
                    "#role": [Roles.ROOT.name],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                if (![vendueState.ready].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.preparing].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.preparing].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.ongoing].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法结束拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.ongoing].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法结束拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.preparing, vendueState.ready].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                                if (![vendueState.preparing, vendueState.ready].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                                        name: 'vendue',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
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
                    '#exists': [
                        {
                            relation: 'vendue',
                            condition: ({ row }) => {
                                const query = {
                                    id: row.vendueId,
                                    state: {
                                        $in: [vendueState.ready, vendueState.ongoing],
                                    },
                                };
                                return query;
                            },
                        },
                        {
                            relation: 'auction',
                            condition: ({ row }) => {
                                const query = {
                                    sessionId: row.id,
                                    state: {
                                        $in: [auctionState.ready, auctionState.pausing, auctionState.ongoing],
                                    },
                                };
                                return query;
                            },
                            message: '专场中没有预展的拍品，不能开拍',
                        },
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
                    '#exists': [
                        {
                            relation: 'vendue',
                            condition: ({ row }) => {
                                const query = {
                                    id: row.vendueId,
                                    state: {
                                        $in: [vendueState.ready, vendueState.ongoing],
                                    },
                                };
                                return query;
                            },
                        },
                        {
                            relation: 'auction',
                            condition: ({ row }) => {
                                const query = {
                                    sessionId: row.id,
                                    state: {
                                        $in: [auctionState.ready, auctionState.pausing],
                                    },
                                };
                                return query;
                            },
                            message: '专场中没有预展的拍品，不能开拍',
                        },
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
                    '#exists': [
                        {
                            relation: 'vendue',
                            condition: ({ row }) => {
                                const query = {
                                    id: row.vendueId,
                                    state: {
                                        $in: [vendueState.ready, vendueState.ongoing],
                                    },
                                };
                                return query;
                            },
                        },
                        {
                            relation: 'auction',
                            condition: ({ row }) => {
                                const query = {
                                    sessionId: row.id,
                                    state: {
                                        $in: [auctionState.ready, auctionState.pausing, auctionState.ongoing],
                                    },
                                };
                                return query;
                            },
                            message: '专场中没有预展的拍品，不能开拍',
                        },
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
                    '#unexists': [UnexistsActiveAuctionInSession],
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
                    '#unexists': [UnexistsActiveAuctionInSession],
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
                    '#unexists': [UnexistsActiveAuctionInSession],
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
            auths: AuctionGeneralStateChangeFn([auctionState.ready, auctionState.pausing], '非预展和暂停的展品不能进入拍卖'),
        },
        [auctionAction.restart]: {
            auths: AuctionGeneralStateChangeFn([auctionState.unsold], '非流拍的展品不能重拍'),
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
        [auctionAction.makeReady]: {
            auths: AuctionGeneralStateChangeFn([auctionState.unsold], '非流拍的展品不能重拍'),
        },
        [auctionAction.resold]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionRelation.owner, auctionRelation.manager],
                    },
                    "#data": [
                        {
                            check: ({ user, row }) => {
                                if (row.state !== auctionState.unsold) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                                        `当前状态不支持此操作`, {
                                            name: 'bid',
                                            operation: 'update',
                                            data: row,
                                        });
                                }
                                return true;
                            },
                        }
                    ],
                    '#exists': [
                        {
                            relation: 'vendue',
                            condition: ({ user, row }) => {
                                return {
                                    id: row.session.vendueId,
                                    category: vendueCategory.delayed,
                                }
                            },
                            message: '当前拍卖类型不允许重拍',
                        }
                    ],
                }
            ],
        },
    },
    bid: {
        [bidAction.create]: {
            auths: [
                {
                    '#exists': [
                        ExistsAuctionForBidCreation,
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { bid } = actionData;
                                const query = {
                                    userId: user.id,
                                }
                                if (bid.paddleId) {
                                    assign(query, {
                                        id: bid.paddleId,
                                    })
                                }
                                return query;
                            },
                        },
                        SessionStateForBidCreation,
                    ],
                },
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#exists': [
                        ExistsAuctionForBidCreation,
                    ],
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    '#exists': [
                        ExistsAuctionForBidCreation,
                        SessionStateForBidCreation,
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
        [bidAction.success]: BidGeneralUpdateControl([bidState.bidding], {
            '#unexists': [
                {
                    relation: 'bid',
                    condition: ({ row }) => {
                        return {
                            id: {
                                $gt: row.id,
                            },
                            auctionId: row.auctionId,
                            state: bidState.bidding,
                        };
                    },
                    message: '当前出价已经更新，请重新落槌',
                },
            ],
        }),
        [bidAction.remove]: BidGeneralUpdateControl([bidState.bidding], {
            '#unexists': [
                {
                    relation: 'bid',
                    condition: ({ row }) => {
                        return {
                            id: {
                                $gt: row.id,
                            },
                            auctionId: row.auctionId,
                            state: bidState.bidding,
                        };
                    },
                    message: '只能移除最后一条出价',
                },
            ],
        }, ({ row }) => {
            if (row.isOnline || row.agentId)  {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                    `只能移除来自现场的出价`, {
                    name: 'bid',
                    operation: 'update',
                    data: row,
                });
            }
            return true;
        }),
        [bidAction.update]: BidGeneralUpdateControl([bidState.bidding, bidState.success, bidState.confirmed]),
        [bidAction.changePrice]: BidGeneralUpdateControl([bidState.success, bidState.confirmed],{},
            ({row}) => {
                if (row.checkOutId) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                        '已结算的拍品不能再修改价格', {
                            name: 'bid',
                            operation: 'update',
                            data: row,
                        });
                }
                return true;
            }),
        [bidAction.confirm]: BidGeneralUpdateControl([bidState.success, bidState.confirmed],{},
            ({row}) => {
                if (row.checkOutId) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                        '已结算的拍品不能再进行核对', {
                            name: 'bid',
                            operation: 'update',
                            data: row,
                        });
                }
                return true;
            }),
        [bidAction.violate]: BidGeneralUpdateControl([bidState.success, bidState.confirmed], {},
            ({row}) => {
                if (row.checkOutId) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                        '已结算的拍品不能再进行弃标', {
                            name: 'bid',
                            operation: 'update',
                            data: row,
                        });
                }
                return true;
            }),
        [bidAction.makeFailure]: {
            auths: [
                {
                    "#role": [Roles.ROOT.name],
                    '#data': [
                        BidDataCheckStateFn([bidState.bidding]),
                    ],
                }
            ]
        },
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
                    ],
                    '#unexists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    userId: actionData.paddle.userId || user.id,
                                    vendueId: actionData.paddle.vendueId,
                                }
                            },
                            message: '用户已经申领过一个号牌',
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    userId: user.id,
                                    auctionHouseId: {
                                        $in: {
                                            name: 'vendue',
                                            query: {
                                                id: actionData.paddle.vendueId,
                                            },
                                            projection: 'auctionHouseId',
                                        }
                                    },
                                }
                            },
                        },
                    ],
                    '#unexists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    userId: actionData.paddle.userId || user.id,
                                    vendueId: actionData.paddle.vendueId,
                                }
                            },
                            message: '用户已经申领过一个号牌',
                        },
                    ],
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
                    '#data': [{
                        check: ({ actionData, row }) => {
                            const { paddle } = actionData;
                            const totalDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                            const availableDeposit = paddle.availableDeposit + 1 || row.availableDeposit + 1;
                            assert(totalDeposit >= 1, `paddle「${row.id}」的totalDeposit必须大于等于0`);
                            assert(totalDeposit >= availableDeposit, `paddle「${row.id}」的totalDeposit必须大于等于availableDeposit`);
                        },
                    }]
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#data': [{
                        check: ({ actionData, row }) => {
                            const { paddle } = actionData;
                            const totalDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                            const availableDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                            assert(totalDeposit >= 1, `paddle「${row.id}」的totalDeposit必须大于等于0`);
                            assert(availableDeposit >= 1, `paddle「${row.id}」的availableDeposit必须大于等于0`);
                            assert(totalDeposit >= availableDeposit, `paddle「${row.id}」的totalDeposit必须大于等于availableDeposit`);
                        },
                    }],
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
                    '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许更新'),
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许更新'),
                },
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({ row, actionData }) => {
                                const { contract } = actionData;
                                if (contract.hasOwnProperty('price')) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同不能修改成交价', {
                                        name: 'contract',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                if (![contractState.convertible].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同当前状态不允许更新', {
                                        name: 'contract',
                                        operation: 'update',
                                        data: row,
                                    });
                                }

                                return true;
                            },
                        },
                    ],
                },
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': [
                        {
                            check: ({ row, actionData }) => {
                                const { contract } = actionData;
                                if (contract.hasOwnProperty('price')) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同不能修改成交价', {
                                        name: 'contract',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                if (![contractState.convertible].includes(row.state)) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同当前状态不允许更新', {
                                        name: 'contract',
                                        operation: 'update',
                                        data: row,
                                    });
                                }

                                return true;
                            },
                        },
                    ],
                },
            ],
        },
        [contractAction.changePrice]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
                    },
                    '#data': CheckContractDataState([contractState.contracted, contractState.convertible], '合同当前状态不允许改价'),
                },
            ],
        },
        [contractAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
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
                        attr: 'auctionHouse',
                    },
                    '#data': CheckContractDataState([contractState.convertible], '当前状态无法结算'),
                },
            ],
        },
        [contractAction.cancel]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auctionHouse',
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
                        attr: 'paddle.vendue.auctionHouse',
                    },
                },
                {
                    '#exists': [DepositExistsPaddleVendue, {
                        relation: 'paddle',
                        needData: true,
                        message: '同步拍保证金余额需大于2000元',
                        condition: ({ user, actionData }) => {
                            const { deposit } = actionData;
                            const { paddleId, price } = deposit;
                            return {
                                id: paddleId,
                                vendue: {
                                    state: {
                                        $in: [vendueState.ready, vendueState.ongoing],
                                    },
                                    category: vendueCategory.synchronous,
                                },
                                totalDeposit: {
                                    $gt: 1999.9 - price,
                                }
                            };
                        },
                    }],
                },
                {
                    '#exists': [DepositExistsPaddleVendue, {
                        relation: 'paddle',
                        needData: true,
                        message: '同步拍保证金余额需大于2000元',
                        condition: ({ user, actionData }) => {
                            const { deposit } = actionData;
                            const { paddleId, price } = deposit;
                            return {
                                id: paddleId,
                                vendue: {
                                    state: {
                                        $in: [vendueState.ready, vendueState.ongoing],
                                    },
                                    category: vendueCategory.delayed,
                                },
                                totalDeposit: {
                                    $gt: 999.9 - price,
                                }
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
        [checkOutAction.takeAway]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.takeAway, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.unpicked]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.takeAway, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.unpicked])
            ]
        },
        [checkOutAction.taPrepare]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]),
                CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping])
            ]
        },
        [checkOutAction.taCancel]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]),
                CheckOutVendueWorkerCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]),
            ]
        },
        [checkOutAction.taSend]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.taSend, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taSend, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]),
            ]
        },
        [checkOutAction.taAccept]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.taAccept, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsSending]),
            ]
        },
        // [checkOutAction.takeAway]: {
        //     auths: [
        //         CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing, checkOutTransportState.shipping]),
        //         CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, null, [checkOutTransportState.tsInPreparing, checkOutTransportState.shipping]),
        //     ]
        // },
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
        [checkOutAction.update]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]),
                CheckOutVendueWorkerCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]),
            ]
        },
        [checkOutAction.changePrice]: {
            auths: [
                CheckOutVendueWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid, checkOutState.legal2], null),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid, checkOutState.legal2], null),
            ]
        },
        [checkOutAction.confirmToPay]: {
            auths: [
                CheckOutGuestCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null),
                CheckOutVendueWorkerCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null),
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null),
            ]
        },
        [checkOutAction.makePaid]: {
            auths: [
                CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.makePaid, [checkOutState.init, checkOutState.unpaid], null),
            ]
        },
        [checkOutAction.complete]: {
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
        [cashInAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { cashIn } = actionData;
                                return {
                                    userId: user.id,
                                    auctionHouseId: cashIn.auctionHouseId,
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
                            message: '您未拥有当前号牌，请领取号牌或重新登录后再进行操作',
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
                            message: '该拍品已结束拍卖或尚在准备，不能进行委托',
                        },
                        {
                            relation: 'session',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { agent } = actionData;
                                const { auctionId } = agent;
                                const query = {
                                    state: {
                                        $in: [sessionState.ready, sessionState.ongoing],
                                    },
                                    id: {
                                        $in: {
                                            name: 'auction',
                                            query: {
                                                id: auctionId,
                                            },
                                            projection: 'sessionId',
                                        },
                                    },
                                };
                                return query;
                            },
                            message: '该拍品已结束拍卖或尚在准备，不能进行委托',
                        },
                    ],
                    '#unexists': [
                        {
                            relation: 'agent',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { agent } = actionData;
                                const { auctionId } = agent;
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
                        },
                        {
                            relation: 'bid',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { agent } = actionData;
                                const { auctionId, price } = agent;
                                const query = {
                                    price: {
                                        $gte: price,
                                    },
                                    state: bidState.bidding,
                                    auctionId,
                                };
                                return query;
                            },
                            message: '委托价必须高于当前最高价',
                        }
                    ],
                },
            ]
        },
        [agentAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, row, roleName }) => {
                                const { paddleId } = row;
                                const query = {
                                    id: paddleId,
                                };
                                if (!roleName || roleName !== Roles.ROOT.name) {
                                    assign(query, {
                                        userId: user.id,
                                    });
                                }
                                return query;
                            },
                            message: '您未拥有当前号牌，请领取号牌或重新登录后再进行操作',
                        },
                    ],
                    '#unexists': [
                        {
                            relation: 'bid',
                            needData: true,
                            condition: ({ user, actionData, row }) => {
                                const { agent } = actionData;
                                const { price: agentPrice } = agent;
                                const { auctionId } = row;
                                return {
                                    price: {
                                        $gt: agentPrice,
                                    },
                                    auctionId,
                                };
                            },
                            message: '委托不能低于当前最高价',
                        }
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                if (row.state !== agentState.normal) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '成交或失败的委托不能进行修改', {
                                        name: 'agent',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
                            }
                        },
                    ]
                },
            ]
        },
        // [agentAction.remove]: {
        //     auths: [
        //         {
        //             '#data': [
        //                 {
        //                     check: ({ row }) => {
        //                         return [agentState.normal].includes(row.state);
        //                     },
        //                     message: '已经成功或失败的委托不能取消',
        //                 }
        //             ],
        //             '#exists': [
        //                 {
        //                     relation: 'paddle',
        //                     condition: ({ user, row, roleName }) => {
        //                         // const { agent } = actionData;
        //                         const { paddleId } = row;
        //                         const query = {
        //                             id: paddleId,
        //                         };
        //                         if (roleName !== Roles.ROOT.name) {
        //                             assign(query, {
        //                                 userId: user.id,
        //                             });
        //                         }
        //                         return query;
        //                     },
        //                     message: '您未拥有当前号牌，请领取号牌或重新登录后再进行操作',
        //                 },
        //                 {
        //                     relation: 'auction',
        //                     condition: ({ user, row }) => {
        //                         const { auctionId } = row;
        //                         const query = {
        //                             id: auctionId,
        //                             state: auctionState.ready,
        //                         };
        //                         return query;
        //                     },
        //                     message: '拍品开始拍卖后不能取消委托',
        //                 },
        //             ],
        //         },
        //     ]
        // }
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
                    '#exists': CheckOutPushExistsCheckOut,
                    '#relation': {
                        attr: 'paddle.vendue',
                    },
                    '#unexists': CheckOutPushUnexistsRecentCheckOutPush,
                },
                {
                    '#exists': CheckOutPushExistsCheckOut,
                    '#relation': {
                        attr: 'paddle.vendue.auctionHouse',
                    },
                    '#unexists': CheckOutPushUnexistsRecentCheckOutPush,
                },
                {
                    '#exists': CheckOutPushExistsBid,
                    '#relation': {
                        attr: 'paddle.vendue',
                    },
                    '#unexists': CheckOutPushUnexistsRecentCheckOutPush,
                },
                {
                    '#exists': CheckOutPushExistsBid,
                    '#relation': {
                        attr: 'paddle.vendue.auctionHouse',
                    },
                    '#unexists': CheckOutPushUnexistsRecentCheckOutPush,
                }
            ]
        }
    },
    express: EXPRESS_AUTH_MATRIX,
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
    express: EXPRESS_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
