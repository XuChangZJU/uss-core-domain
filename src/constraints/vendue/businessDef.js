const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');
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
    STATE_TRAN_MATRIX: CHECKOUT_STATE_TRAN_MATRIX,
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

const AuctionHouseOwnerAndmanagerExists = [
    {
        relation: 'userAuctionHouse',
        condition: ({ user, row }) => {
            const { id:auctionHouseId } = row;
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
                            condition: ({user,actionData}) => {
                                const {auctionHouse} = actionData;
                                return{
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
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
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
                            check: ({user, row}) => {
                                return [vendueState.ready].includes(row.state);
                            },
                        }
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
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.ready].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [vendueAction.ready]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.preparing].includes(row.state);
                            },
                        }
                    ]
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
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.preparing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [vendueAction.finish]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.ongoing].includes(row.state);
                            },
                        }
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
                                        $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.ongoing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [vendueAction.transfer]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({user, row}) => {
                                const query = {
                                    userId: user.id,
                                    vendueId: row.id,
                                    relation: vendueRelation.owner,
                                };
                                return query;
                            },
                        },
                        {
                            relation: 'userAuctionHouse',
                            condition: ({user, row}) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
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
        [vendueAction.authGrantMulti2]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({user, row}) => {
                                const query = {
                                    userId: user.id,
                                    vendueId: row.id,
                                    relation: {
                                        $in: [vendueRelation.manager, vendueRelation.owner],
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
                            condition: ({user, row}) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
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
        [vendueAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({user, row}) => {
                                const query = {
                                    userId: user.id,
                                    auctionHouseId: row.auctionHouseId,
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
                            condition: ({user, row, actionData}) => {
                                const { userVendue } = actionData;
                                if(!userVendue.relation){
                                    return {
                                        userId: user.id,
                                        vendueId: row.id,
                                        relation: {
                                            $in: [vendueRelation.manager, vendueRelation.owner],
                                        },
                                    }
                                }
                                if(userVendue.relation === vendueRelation.owner){
                                    return {
                                        relation: -1,
                                    }
                                }
                                if(userVendue.relation === vendueRelation.manager){
                                    return{
                                        userId: user.id,
                                        vendueId: row.id,
                                        relation: {
                                            $in: [vendueRelation.owner],
                                        },
                                    }
                                }
                                if(userVendue.relation === vendueRelation.worker){
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
                            condition: ({user, row}) => {
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
                            condition: ({user,actionData}) => {
                                const {session} = actionData;
                                if(session.biddingSchema){
                                    session.biddingSchema.forEach(
                                        (ele, index) => {
                                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                                            if(ele.type ===1 && ele.step)
                                            assert((ele.max-ele.min)> ele.step, '设置的步长过大');
                                            if(index > 0){
                                                if(ele.min !== session.biddingSchema[index-1].max){
                                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                                                }
                                            }
                                        }
                                    );
                                }
                                return{
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            check: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row, actionData}) => {
                                const { userSession } = actionData;
                                if(!userSession.relation){
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: {
                                            $in: [sessionRelation.owner, sessionRelation.manager]
                                        },
                                    }
                                }
                                if(userSession.relation === sessionRelation.owner){
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: -1,
                                    }
                                }
                                if(userSession.relation === sessionRelation.manager){
                                    return {
                                        userId: user.id,
                                        sessionId: row.id,
                                        relation: {
                                            $in: [sessionRelation.owner],
                                        },
                                    }
                                }
                                if(userSession.relation === sessionRelation.worker){
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
                            condition: ({user, row}) => {
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
                            condition: ({user, row}) => {
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
        [auctionAction.create]: {
            auths: [
                {
                    "exists": [
                        {
                            relation: 'userSession',
                            needData: true,
                            condition: ({user,actionData}) => {
                                const {auction} = actionData
                                if(auction.biddingSchema){
                                    auction.biddingSchema.forEach(
                                        (ele, index) => {
                                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                                            if(ele.type ===1 && ele.step)
                                                assert((ele.max-ele.min)> ele.step, '设置的步长过大');
                                            if(index > 0){
                                                if(ele.min !== auction.biddingSchema[index-1].max){
                                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                                                }
                                            }
                                        }
                                    );
                                }
                                return{
                                    userId: user.id,
                                    sessionId: auction.sessionId,
                                    relation: {
                                        $exists: true,
                                    },
                                };
                            }
                        },
                    ]
                },
                {
                    "exists": [
                        {
                            relation: 'userVendue',
                            needData: true,
                            condition: ({user,actionData}) => {
                                const {auction} = actionData;
                                return{
                                    userId: user.id,
                                    vendueId: auction.session.vendueId,
                                    relation: {
                                        $in: [vendueRelation.manager, vendueRelation.owner],
                                    },
                                };
                            }
                        },
                    ]
                },
                {
                    "exists": [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({user,actionData}) => {
                                const {auction} = actionData;
                                return{
                                    userId: user.id,
                                    auctionHouseId: auction.session.vendue.auctionHouseId,
                                    relation: {
                                        $in: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                                    },
                                };
                            }
                        },
                    ]
                },
            ]
        },
        // [auctionAction.cancel]: {
        //     auths: [
        //         {
        //             "#relation": {
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [auctionState.preparing, auctionState.ready, auctionState.ongoing, auctionState.pausing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'session',
        //                 relations: [sessionRelation.manager],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [auctionState.preparing, auctionState.ready, auctionState.ongoing, auctionState.pausing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'session.vendue',
        //                 relations: [vendueRelation.manager],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [auctionState.preparing, auctionState.ready, auctionState.ongoing, auctionState.pausing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'session.vendue.auctionHouse',
        //                 relations: [auctionHouseRelation.manager],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [auctionState.preparing, auctionState.ready, auctionState.ongoing, auctionState.pausing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         }
        //     ]
        // },
        [auctionAction.update]: {
            auths: [
                {
                    "#relation": {
                    }
                },
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                }
            ]
        },
        [auctionAction.ready]: {
            auths: [
                {
                    "#relation": {
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.preparing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.preparing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.preparing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.preparing;
                            },
                        }
                    ],
                }
            ]
        },
        [auctionAction.start]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    // '#data': [
                    //     {
                    //         check: ({user, row}) => {
                    //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                    //         },
                    //     }
                    // ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    // '#data': [
                    //     {
                    //         check: ({user, row}) => {
                    //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                    //         },
                    //     }
                    // ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    // '#data': [
                    //     {
                    //         check: ({user, row}) => {
                    //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                    //         },
                    //     }
                    // ],
                }
            ]
        },
        [auctionAction.sold]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                }
            ]
        },
        [auctionAction.unsold]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.state === auctionState.ongoing;
                            },
                        }
                    ],
                }
            ]
        },
        // [auctionAction.pause]: {
        //     auths: [
        //         {
        //             "#relation": {
        //                 attr: 'session',
        //                 relations: [sessionRelation.manager, sessionRelation.auctioneer],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === auctionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'session.vendue',
        //                 relations: [vendueRelation.manager],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === auctionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'session.vendue.auctionHouse',
        //                 relations: [auctionHouseRelation.manager],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === auctionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         }
        //     ]
        // },
        [auctionAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                }
            ]
        },
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
                                const {bid} = actionData;
                                    return {
                                        id: bid.auctionId,
                                        state: auctionState.ongoing,
                                    };
                            },
                        },
                    ],
                }
            ]
        },
        [bidAction.success]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === bidState.bidding;
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
                                return row.state === bidState.bidding;
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
                                return row.state === bidState.bidding;
                            },
                        },
                    ],
                }
            ]
        },
        [bidAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                }
            ]
        },
        [bidAction.cancel]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === bidState.bidding;
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
                                return row.state === bidState.bidding;
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
                                return row.state === bidState.bidding;
                            },
                        },
                    ],
                }
            ]
        },
        [bidAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.manager, vendueRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.manager, auctionHouseRelation.owner],
                    },
                }
            ]
        }
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
        }
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
                                if(!userAuctionHouse.relation){
                                    return {
                                        userId: user.id,
                                        auctionHouseId: row.id,
                                        relation: {
                                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager],
                                        },
                                    }
                                }
                                if(userAuctionHouse.relation === auctionHouseRelation.owner){
                                    return {
                                        relation: -1,
                                    }
                                }
                                if(userAuctionHouse.relation === auctionHouseRelation.manager){
                                    return {
                                        userId: user.id,
                                        auctionHouseId: row.id,
                                        relation: {
                                            $in: [auctionHouseRelation.owner],
                                        },
                                    }
                                }

                                if([auctionHouseRelation.worker, auctionHouseRelation.auctioneer, auctionHouseRelation.settler, auctionHouseRelation.stockKeeper].includes(userAuctionHouse.relation)){
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
                    '#exists': ContractAuctionHouseWorkerExists,
                },
            ],
        },
        [contractAction.remove]: {
            auths: [
                {
                    '#exists': ContractAuctionHouseWorkerExists,
                },
            ],
        },
        [contractAction.complete]:{
            auths: [
                {
                    '#exists': ContractAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === contractState.legal;
                            },
                        },
                    ],
                },
            ],
        },
        [contractAction.abort]: {
            auths: [
                {
                    '#exists': ContractAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === contractState.legal;
                            },
                        },
                    ],
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
        [depositAction.create]: AllowEveryoneAuth,
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
        [checkOutAction.create]: {
            auths: [
                {
                    '#unexists': [
                        {
                            relation: 'checkOut',
                            needData: true,
                            condition: ({user, actionData}) => {
                                const {checkOut} = actionData;
                                return {
                                    paddleId: checkOut.paddleId,
                                    state: {
                                        $lt: checkOutState.legal,
                                    },
                                };
                            },
                        },
                    ],
                }
            ],
        },
        [checkOutAction.makePaid]: {
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
        [checkOutAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'paddle',
                    },
                },
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
        [checkOutAction.cancel]: {
            auths: [
                {
                    "#relation": {
                        attr: 'paddle',
                    },
                },
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
    cashIn: {
        [cashInAction.create]: AllowEveryoneAuth,
        [cashInAction.makePaid]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({user, row}) => {
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
        [licenseAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userSession',
                            needData: true,
                            condition: ({user, actionData}) => {
                                return {
                                    userId: user.id,
                                    sessionId: actionData.license.sessionId,
                                }
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userVendue',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                }
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            },
                        },
                    ],
                },
                // {
                //     "#relation": {
                //         attr: 'session',
                //         relations: [sessionRelation.owner, sessionRelation.manager],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'session.vendue',
                //         relations: [vendueRelation.owner, vendueRelation.manager],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'session.vendue.auctionHouse',
                //         relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler],
                //     },
                // }
            ]
        },
        [licenseAction.update]: {
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
        },
        [licenseAction.remove]: {
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
        },
    },
    contractTerms: {
        [contractTermsAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userAuctionHouse',
                            condition: ({user}) => {
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
        [contractTermsAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'contract.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.worker],
                    },
                },
            ]
        },
        [contractTermsAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'contract.auctionHouse',
                        relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.worker],
                    },
                },
            ]
        }
    },
    agent: {
        [agentAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { agent } = actionData;
                                const query = {
                                    userId: user.id,
                                    id: agent.paddleId,
                                };
                                return query;
                            },
                        },
                    ],
                },
                // {
                //     "#relation": {
                //         attr: 'auction.session',
                //         relations: [sessionRelation.manager, sessionRelation.worker],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'auction.session.vendue',
                //         relations: [vendueRelation.manager],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'auction.session.vendue.auctionHouse',
                //         relations: [auctionHouseRelation.manager],
                //     },
                // },
            ]
        },
        [agentAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'paddle',
                            condition: ({ user, row }) => {
                                const query = {
                                    userId: user.id,
                                    id: row.paddleId,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [agentState.failed].includes(row.state) || (row.state === agentState.normal && row.auction.state!== auctionState.ongoing);
                            },
                        }
                    ],
                },
                // {
                //     "#relation": {
                //         attr: 'auction.session',
                //         relations: [sessionRelation.manager, sessionRelation.worker],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'auction.session.vendue',
                //         relations: [vendueRelation.manager],
                //     },
                // },
                // {
                //     "#relation": {
                //         attr: 'auction.session.vendue.auctionHouse',
                //         relations: [auctionHouseRelation.manager],
                //     },
                // },
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