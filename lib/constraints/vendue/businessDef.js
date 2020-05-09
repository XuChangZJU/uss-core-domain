'use strict';

var _vendue, _auctionHouse, _collection, _contract, _stock;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/vendue/auctionHouse'),
    auctionHouseAction = _require2.action,
    auctionHouseState = _require2.state,
    AUCTIONHOUSE_STATE_TRAN_MATRIX = _require2.STATE_TRAN_MATRIX,
    auctionHouseRelation = _require2.relation;

var _require3 = require('../../constants/vendue/collection'),
    collectionAction = _require3.action,
    collectionState = _require3.state,
    collectionRelation = _require3.relation;

var _require4 = require('../../constants/vendue/contract'),
    contractAction = _require4.action,
    contractState = _require4.state,
    CONTRACT_STATE_TRAN_MATRIX = _require4.STATE_TRAN_MATRIX;

var _require5 = require('../../constants/vendue/stock'),
    stockAction = _require5.action,
    stockState = _require5.state,
    STOCK_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX;

var _require6 = require('../../constants/vendue/vendue'),
    vendueAction = _require6.action,
    vendueState = _require6.state,
    VENDUE_STATE_TRAN_MATRIX = _require6.STATE_TRAN_MATRIX,
    vendueHouseRelation = _require6.relation;

var _require7 = require('../../constants/vendue/session'),
    sessionAction = _require7.action,
    sessionState = _require7.state,
    SESSION_STATE_TRAN_MATRIX = _require7.STATE_TRAN_MATRIX,
    sessionHouseRelation = _require7.relation;

var _require8 = require('../../constants/vendue/auction'),
    auctionAction = _require8.action,
    auctionState = _require8.state,
    AUCTION_STATE_TRAN_MATRIX = _require8.STATE_TRAN_MATRIX,
    auctionRelation = _require8.relation;

var _require9 = require('../../constants/vendue/bid'),
    bidAction = _require9.action,
    bidState = _require9.state,
    bidRelation = _require9.relation;

var _require10 = require('../../constants/vendue/paddle'),
    paddleAction = _require10.action,
    paddleState = _require10.state,
    paddleRelation = _require10.relation;

var ContractAuctionHouseWorkerExists = [{
    relation: 'userAuctionHouse',
    condition: function condition(_ref) {
        var user = _ref.user,
            row = _ref.row;
        var auctionHouseId = row.auctionHouseId;

        var query = {
            userId: user.id,
            auctionHouseId: auctionHouseId
        };
        return query;
    }
}];

var StockAuctionHouseWorkerExists = [{
    relation: 'userAuctionHouse',
    condition: function condition(_ref2) {
        var user = _ref2.user,
            row = _ref2.row;
        var auctionHouseId = row.auctionHouseId;

        var query = {
            userId: user.id,
            auctionHouseId: auctionHouseId
        };
        return query;
    }
}];

var AuctionHouseOwnerAndManagerExists = [{
    relation: 'userAuctionHouse',
    condition: function condition(_ref3) {
        var user = _ref3.user,
            row = _ref3.row;
        var auctionHouseId = row.id;

        var query = {
            userId: user.id,
            auctionHouseId: auctionHouseId,
            relation: {
                $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager]
            }
        };
        return query;
    }
}];

var AuctionHouseWorkerExists = [{
    relation: 'userAuctionHouse',
    needData: true,
    condition: function condition(_ref4) {
        var user = _ref4.user,
            row = _ref4.row,
            actionData = _ref4.actionData;
        var auctionHouseId = actionData.auctionHouseId;

        var query = {
            userId: user.id,
            auctionHouseId: auctionHouseId,
            relation: {
                $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager, auctionHouseRelation.worker]
            }
        };
        return query;
    }
}];

var AnyAuctionHouseWorker = {
    auths: [{
        '#exists': [{
            relation: 'userAuctionHouse',
            condition: function condition(_ref5) {
                var user = _ref5.user;

                var query = {
                    userId: user.id
                };
                return query;
            }
        }]
    }]
};

var AUTH_MATRIX = {
    vendue: (_vendue = {}, _defineProperty(_vendue, vendueAction.create, {
        auths: [{
            '#exists': Auth
        }]
    }), _defineProperty(_vendue, vendueAction.update, {}), _vendue),
    auctionHouse: (_auctionHouse = {}, _defineProperty(_auctionHouse, auctionHouseAction.create, AllowEveryoneAuth), _defineProperty(_auctionHouse, auctionHouseAction.update, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.remove, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.enable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref6) {
                    var row = _ref6.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref7) {
                    var row = _ref7.row;

                    return row.state === auctionHouseState.online;
                }
            }]
        }]
    }), _auctionHouse),
    collection: (_collection = {}, _defineProperty(_collection, collectionAction.create, AllowEveryoneAuth), _defineProperty(_collection, collectionAction.update, OwnerRelationAuth), _defineProperty(_collection, collectionAction.remove, OwnerRelationAuth), _collection),
    contract: (_contract = {}, _defineProperty(_contract, contractAction.create, AnyAuctionHouseWorker), _defineProperty(_contract, contractAction.update, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), _defineProperty(_contract, contractAction.remove, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), _defineProperty(_contract, contractAction.sign, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref8) {
                    var row = _ref8.row;

                    return row.state === contractState.init;
                }
            }]
        }, {
            // 收藏品拥有者也可以确认签署
            '#exists': [{
                relation: 'userCollection',
                condition: function condition(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;
                    var collectionId = row.collectionId;

                    var query = {
                        userId: user.id,
                        collectionId: collectionId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref10) {
                    var row = _ref10.row;

                    return row.state === contractState.init;
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.abort, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref11) {
                    var row = _ref11.row;

                    return [contractState.init, contractState.legal].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.performance, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref12) {
                    var row = _ref12.row;

                    return row.state === contractState.legal;
                }
            }]
        }]
    }), _contract),
    stock: (_stock = {}, _defineProperty(_stock, stockAction.create, AnyAuctionHouseWorker), _defineProperty(_stock, stockAction.update, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists
        }]
    }), _defineProperty(_stock, stockAction.remove, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists
        }]
    }), _defineProperty(_stock, stockAction.inStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref13) {
                    var row = _ref13.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref14) {
                    var row = _ref14.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _stock)
};

var STATE_TRAN_MATRIX = {
    auctionHouse: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    contract: CONTRACT_STATE_TRAN_MATRIX,
    stock: STOCK_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};