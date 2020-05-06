'use strict';

var _auctionHouse, _collection, _contract, _stock;

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

var AnyAuctionHouseWorker = {
    auths: [{
        '#exists': [{
            relation: 'userAuctionHouse',
            condition: function condition(_ref4) {
                var user = _ref4.user;

                var query = {
                    userId: user.id
                };
                return query;
            }
        }]
    }]
};

var AUTH_MATRIX = {
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
                check: function check(_ref5) {
                    var row = _ref5.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref6) {
                    var row = _ref6.row;

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
                check: function check(_ref7) {
                    var row = _ref7.row;

                    return row.state === contractState.init;
                }
            }]
        }, {
            // 收藏品拥有者也可以确认签署
            '#exists': [{
                relation: 'userCollection',
                condition: function condition(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;
                    var collectionId = row.collectionId;

                    var query = {
                        userId: user.id,
                        collectionId: collectionId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref9) {
                    var row = _ref9.row;

                    return row.state === contractState.init;
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.abort, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref10) {
                    var row = _ref10.row;

                    return [contractState.init, contractState.legal].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.performance, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref11) {
                    var row = _ref11.row;

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
                check: function check(_ref12) {
                    var row = _ref12.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref13) {
                    var row = _ref13.row;

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