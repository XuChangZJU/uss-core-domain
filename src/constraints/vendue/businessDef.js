const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');

const {
    action: auctionHouseAction,
    state: auctionHouseState,
    STATE_TRAN_MATRIX: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    relation: auctionHouseRelation,
} = require('../../constants/vendue/auctionHouse');
const {
    COMMON_STATE_TRAN_MATRIX: DEPOSIT_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/deposit');
const {
    COMMON_STATE_TRAN_MATRIX: CHECKOUT_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/checkOut');
const {
    COMMON_STATE_TRAN_MATRIX: CASHIN_STATE_TRAN_MATRIX,
} = require('../../constants/vendue/cashIn');
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
} = require('../../constants/vendue/bid');
const {
    action: paddleAction,
    state: paddleState,
    relation: paddleRelation,
} = require('../../constants/vendue/paddle');

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
                    $in: [auctionHouseRelation.stockKeeper, auctionHouseRelation.guardian, auctionHouseRelation.manager, auctionHouseRelation.owner],
                },
            };
            return query;
        },
    },
];

const AuctionHouseOwnerAndManagerExists = [
    {
        relation: 'userAuctionHouse',
        condition: ({ user, row }) => {
            const { id:auctionHouseId } = row;
            const query = {
                userId: user.id,
                auctionHouseId,
                relation: {
                    $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager],
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

const CollectionOwnerAndGranteeOrAuctionHouseWorker = {
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
                                $in: [collectionRelation.owner, collectionRelation.grantee],
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
                                    $in: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.guardian, auctionHouseRelation.stockKeeper],
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
        [vendueAction.create]: {
            auths: [
                {
                    "exists": [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({user,actionData}) => {
                                const {auctionHouseId} = actionData;
                                return{
                                    userId: user.id,
                                    relation: {
                                        $exists: true,
                                    },
                                    auctionHouseId,
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
                                    relation: auctionHouseRelation.administrator,
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
                                return [vendueState.ready, vendueState.pausing].includes(row.state);
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
                                    relation: auctionHouseRelation.administrator,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.ready, vendueState.pausing].includes(row.state);
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
                                    relation: auctionHouseRelation.administrator,
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
                                return [vendueState.ongoing, vendueState.pausing].includes(row.state);
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
                                    relation: auctionHouseRelation.administrator,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [vendueState.ongoing, vendueState.pausing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        // [vendueAction.pause]: {
        //     auths: [
        //         {
        //             "#relation": {
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === vendueState.ongoing;
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userAuctionHouse',
        //                     condition: ({ user, row }) => {
        //                         const query = {
        //                             userId: user.id,
        //                             auctionHouseId: row.auctionHouseId,
        //                             relation: auctionHouseRelation.administrator,
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === vendueState.ongoing;
        //                     },
        //                 }
        //             ],
        //         }
        //     ]
        // },
        // [vendueAction.stop]: {
        //     auths: [
        //         {
        //             "#relation": {
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [vendueState.ongoing, vendueState.pausing, vendueState.ready, vendueState.preparing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             '#exists': [
        //                 {
        //                     relation: 'userAuctionHouse',
        //                     condition: ({ user, row }) => {
        //                         const query = {
        //                             userId: user.id,
        //                             auctionHouseId: row.auctionHouseId,
        //                             relation: auctionHouseRelation.administrator,
        //                         };
        //                         return query;
        //                     },
        //                 },
        //             ],
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return [vendueState.ongoing, vendueState.pausing, vendueState.ready, vendueState.preparing].includes(row.state);
        //                     },
        //                 }
        //             ],
        //         }
        //     ]
        // },
        [vendueAction.transfer]: {
            auths: [
                {
                    "#relation": {
                        relations: [vendueRelation.adminstrator],
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
                                    relation: auctionHouseRelation.administrator,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ]
        },
        [vendueAction.authGrant]: {
            auths: [
                {
                    "#relation": {
                        relations: [vendueRelation.administrator],
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
                                    relation: auctionHouseRelation.administrator,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ]
        },
        [vendueAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [vendueRelation.administrator],
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
                                    relation: auctionHouseRelation.administrator,
                                };
                                return query;
                            },
                        },
                    ],
                }
            ]
        }
    },
    session: {
        [sessionAction.create]: {
            auths: [
                {
                    "exists": [
                        {
                            relation: 'userVendue',
                            needData: true,
                            condition: ({user,actionData}) => {
                                if(actionData.biddingSchema){
                                    actionData.biddingSchema.forEach(
                                        (ele, index) => {
                                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                                            if(ele.type ===1 && ele.step)
                                            assert((ele.max-ele.min)> ele.step, '设置的步长过大');
                                            if(index > 0){
                                                if(ele.min !== actionData.biddingSchema[index-1].max){
                                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                                                }
                                            }
                                        }
                                    );
                                }
                                return{
                                    userId: user.id,
                                    vendueId: actionData.vendueId,
                                    relation: {
                                        $exists: true,
                                    },
                                };
                            }
                        }
                    ]
                },
                {
                    "exists": [
                        {
                            relation: 'userAuctionHouse',
                            needData: true,
                            condition: ({user,actionData}) => {
                                return{
                                    userId: user.id,
                                    auctionHouseId: actionData.vendue.auctionHouseId,
                                    relation: auctionHouseRelation.administrator,
                                };
                            }
                        }
                    ]
                }
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
                        relations: [vendueRelation.administrator]
                    }
                },
                {
                    '#relation': {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator]
                    }
                },
            ]
        },
        [sessionAction.start]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
        // [sessionAction.pause]: {
        //     auths: [
        //         {
        //             "#relation": {
        //             },
        //             '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === sessionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'vendue',
        //                 relations: [vendueRelation.administrator],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === sessionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         },
        //         {
        //             "#relation": {
        //                 attr: 'vendue.auctionHouse',
        //                 relations: [auctionHouseRelation.administrator],
        //             },
        //             '#data': [
        //                 {
        //                     check: ({user, row}) => {
        //                         return row.state === sessionState.ongoing;
        //                     },
        //                 }
        //             ],
        //         }
        //     ]
        // },
        [sessionAction.transfer]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                }
            ]
        },
        [sessionAction.authGrant]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                }
            ]
        },
        [sessionAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [sessionRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
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
                                if(actionData.biddingSchema){
                                    actionData.biddingSchema.forEach(
                                        (ele, index) => {
                                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                                            if(ele.type ===1 && ele.step)
                                                assert((ele.max-ele.min)> ele.step, '设置的步长过大');
                                            if(index > 0){
                                                if(ele.min !== actionData.biddingSchema[index-1].max){
                                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, `第${index}条的最小值与上一条最大值不同`);
                                                }
                                            }
                                        }
                                    );
                                }
                                return{
                                    userId: user.id,
                                    sessionId: actionData.sessionId,
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
                                return{
                                    userId: user.id,
                                    vendueId: actionData.session.vendueId,
                                    relation: vendueRelation.administrator,
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
                                return{
                                    userId: user.id,
                                    auctionHouseId: actionData.session.vendue.auctionHouseId,
                                    relation: auctionHouseRelation.administrator,
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
        //                 relations: [sessionRelation.administrator],
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
        //                 relations: [vendueRelation.administrator],
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
        //                 relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [auctionState.preparing, auctionState.pausing, auctionState.unsold].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.administrator],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [auctionState.preparing, auctionState.pausing, auctionState.unsold].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [auctionState.preparing, auctionState.pausing, auctionState.unsold].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [auctionAction.sold]: {
            auths: [
                {
                    "#relation": {
                        attr: 'session',
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
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
                        relations: [vendueRelation.administrator],
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
                        relations: [auctionHouseRelation.administrator],
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
        //                 relations: [sessionRelation.administrator, sessionRelation.auctioneer],
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
        //                 relations: [vendueRelation.administrator],
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
        //                 relations: [auctionHouseRelation.administrator],
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                }
            ]
        }
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
                                const {auction} = actionData;
                                return {
                                    id: auction.id,
                                    state: auctionState.ongoing,
                                };
                            },
                        },
                        {
                            relation: 'paddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const {paddle} = actionData;
                                return {
                                    id: paddle.id,
                                    state: paddleState.unsettled,
                                };
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
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                }
            ]
        },
        [bidAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'auction.session',
                        relations: [sessionRelation.administrator, sessionRelation.auctioneer],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue',
                        relations: [vendueRelation.administrator],
                    },
                },
                {
                    "#relation": {
                        attr: 'auction.session.vendue.auctionHouse',
                        relations: [auctionHouseRelation.administrator],
                    },
                }
            ]
        }
    },
    paddle: {
        [paddleAction.create]: {
            auths: [
                {
                    '#unexists': [
                        {
                            relation: 'userPaddle',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                return {
                                    paddle: {
                                        state: paddleState.unsettled
                                    },
                                    userId: user.id,
                                }
                            },
                        },
                    ],
                }
            ]
        },
    },
    auctionHouse: {
        [auctionHouseAction.create]: AllowEveryoneAuth,
        [auctionHouseAction.update]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndManagerExists,
                },
            ],
        },
        [auctionHouseAction.remove]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndManagerExists,
                },
            ],
        },
        [auctionHouseAction.enable]: {
            auths: [
                {
                    '#exists': AuctionHouseOwnerAndManagerExists,
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
                    '#exists': AuctionHouseOwnerAndManagerExists,
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
    },
    collection: {
        [collectionAction.create]: AllowEveryoneAuth,
        [collectionAction.update]: CollectionOwnerAndGranteeOrAuctionHouseWorker,
        [collectionAction.remove]: CollectionOwnerAndGranteeOrAuctionHouseWorker,
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
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};