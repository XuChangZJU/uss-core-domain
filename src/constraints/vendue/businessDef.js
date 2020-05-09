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
    relation: vendueHouseRelation,
} = require('../../constants/vendue/vendue');
const {
    action: sessionAction,
    state: sessionState,
    STATE_TRAN_MATRIX: SESSION_STATE_TRAN_MATRIX,
    relation: sessionHouseRelation,
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

const AuctionHouseWorkerExists = [
    {
        relation: 'userAuctionHouse',
        needData: true,
        condition: ({ user, row, actionData}) => {
            const { auctionHouseId } = actionData;
            const query = {
                userId: user.id,
                auctionHouseId,
                relation: {
                    $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager, auctionHouseRelation.worker],
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

const AUTH_MATRIX = {
    vendue: {
        [vendueAction.create]: {
            auths: [
                {
                    '#exists': Auth
                }
            ]
        },
        [vendueAction.update]: {

        }
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
        [collectionAction.update]: OwnerRelationAuth,
        [collectionAction.remove]: OwnerRelationAuth,
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
        [contractAction.sign]: {
            auths: [
                {
                    '#exists': ContractAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === contractState.init;
                            },
                        },
                    ],
                },
                {
                    // 收藏品拥有者也可以确认签署
                    '#exists': [
                        {
                            relation: 'userCollection',
                            condition: ({ user, row }) => {
                                const { collectionId } = row;
                                const query = {
                                    userId: user.id,
                                    collectionId,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.state === contractState.init;
                            },
                        },
                    ],
                }
            ],
        },
        [contractAction.abort]: {
            auths: [
                {
                    '#exists': ContractAuctionHouseWorkerExists,
                    '#data': [
                        {
                            check: ({ row }) => {
                                return [contractState.init, contractState.legal].includes(row.state);
                            },
                        },
                    ],
                },
            ],
        },
        [contractAction.performance]: {
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
    },
};

const STATE_TRAN_MATRIX = {
    auctionHouse: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    contract: CONTRACT_STATE_TRAN_MATRIX,
    stock: STOCK_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};