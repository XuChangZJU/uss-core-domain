'use strict';

var _vendue, _session, _auctionHouse, _collection, _contract, _stock;

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
    vendueRelation = _require6.relation;

var _require7 = require('../../constants/vendue/session'),
    sessionAction = _require7.action,
    sessionState = _require7.state,
    SESSION_STATE_TRAN_MATRIX = _require7.STATE_TRAN_MATRIX,
    sessionRelation = _require7.relation;

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
    vendue: (_vendue = {}, _defineProperty(_vendue, vendueAction.create, {
        auths: [{
            "exists": [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.update, {
        auths: [{
            "#relation": {
                'relations': [vendueRelation.owner]
            }
        }]
    }), _defineProperty(_vendue, vendueAction.start, {
        auths: [{
            "#relation": {
                'relations': [vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [vendueState.ready, vendueState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.ready, {
        auths: [{
            "#relation": {
                'relations': [vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return [vendueState.preparing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.finish, {
        auths: [{
            "#relation": {
                'relations': [vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return [vendueState.ongoing, vendueState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.pause, {
        auths: [{
            "#relation": {
                'relations': [vendueRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return row.state === vendueState.ongoing;
                }
            }]
        }]
    }), _vendue),
    session: (_session = {}, _defineProperty(_session, sessionAction.create, {
        auths: [{
            "exists": [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

                    return {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.guardian, auctionHouseRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.update, {
        auths: [{
            "#relation": {
                'relations': [sessionRelation.owner]
            }
        }]
    }), _defineProperty(_session, sessionAction.start, {
        auths: [{
            "#relation": {
                'relations': [sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.ready, {
        auths: [{
            "#relation": {
                'relations': [sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.finish, {
        auths: [{
            "#relation": {
                'relations': [sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.pause, {
        auths: [{
            "#relation": {
                'relations': [sessionRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }]
    }), _session),
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
                check: function check(_ref15) {
                    var row = _ref15.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref16) {
                    var row = _ref16.row;

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
                check: function check(_ref17) {
                    var row = _ref17.row;

                    return row.state === contractState.init;
                }
            }]
        }, {
            // 收藏品拥有者也可以确认签署
            '#exists': [{
                relation: 'userCollection',
                condition: function condition(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;
                    var collectionId = row.collectionId;

                    var query = {
                        userId: user.id,
                        collectionId: collectionId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref19) {
                    var row = _ref19.row;

                    return row.state === contractState.init;
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.abort, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref20) {
                    var row = _ref20.row;

                    return [contractState.init, contractState.legal].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.performance, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref21) {
                    var row = _ref21.row;

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
                check: function check(_ref22) {
                    var row = _ref22.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref23) {
                    var row = _ref23.row;

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