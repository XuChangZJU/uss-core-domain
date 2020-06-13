'use strict';

var _vendue, _session, _auction, _bid, _auctionHouse, _collection, _contract, _stock;

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

var _require3 = require('../../constants/vendue/deposit'),
    DEPOSIT_STATE_TRAN_MATRIX = _require3.COMMON_STATE_TRAN_MATRIX;

var _require4 = require('../../constants/vendue/checkOut'),
    CHECKOUT_STATE_TRAN_MATRIX = _require4.COMMON_STATE_TRAN_MATRIX;

var _require5 = require('../../constants/vendue/cashIn'),
    CASHIN_STATE_TRAN_MATRIX = _require5.COMMON_STATE_TRAN_MATRIX;

var _require6 = require('../../constants/vendue/collection'),
    collectionAction = _require6.action,
    collectionState = _require6.state,
    collectionRelation = _require6.relation;

var _require7 = require('../../constants/vendue/contract'),
    contractAction = _require7.action,
    contractState = _require7.state,
    CONTRACT_STATE_TRAN_MATRIX = _require7.STATE_TRAN_MATRIX;

var _require8 = require('../../constants/vendue/stock'),
    stockAction = _require8.action,
    stockState = _require8.state,
    STOCK_STATE_TRAN_MATRIX = _require8.STATE_TRAN_MATRIX;

var _require9 = require('../../constants/vendue/vendue'),
    vendueAction = _require9.action,
    vendueState = _require9.state,
    VENDUE_STATE_TRAN_MATRIX = _require9.STATE_TRAN_MATRIX,
    vendueRelation = _require9.relation;

var _require10 = require('../../constants/vendue/session'),
    sessionAction = _require10.action,
    sessionState = _require10.state,
    SESSION_STATE_TRAN_MATRIX = _require10.STATE_TRAN_MATRIX,
    sessionRelation = _require10.relation;

var _require11 = require('../../constants/vendue/auction'),
    auctionAction = _require11.action,
    auctionState = _require11.state,
    AUCTION_STATE_TRAN_MATRIX = _require11.STATE_TRAN_MATRIX,
    auctionRelation = _require11.relation;

var _require12 = require('../../constants/vendue/bid'),
    bidAction = _require12.action,
    bidState = _require12.state,
    bidRelation = _require12.relation,
    BID_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX,
    bidCategory = _require12.category;

var _require13 = require('../../constants/vendue/paddle'),
    paddleAction = _require13.action,
    paddleState = _require13.state,
    paddleRelation = _require13.relation;

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
            auctionHouseId: auctionHouseId,
            relation: {
                $in: [auctionHouseRelation.stockKeeper, auctionHouseRelation.guardian, auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
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

var CollectionOwnerAndGranteeOrAuctionHouseWorker = {
    auths: [{
        'exists': [{
            relation: 'userCollection',
            condition: function condition(_ref5) {
                var user = _ref5.user,
                    row = _ref5.row;
                var collectionId = row.id;

                var query = {
                    userId: user.id,
                    collectionId: collectionId,
                    relation: {
                        $in: [collectionRelation.owner, collectionRelation.grantee]
                    }
                };
                return query;
            }
        }]
    }, {
        'exists': [{
            relation: 'stock',
            condition: function condition(_ref6) {
                var user = _ref6.user,
                    row = _ref6.row;
                var stockId = row.id;

                var query = {
                    stockId: stockId
                };
                var has = {
                    name: 'userAuctionHouse',
                    projection: {
                        id: 1
                    },
                    query: {
                        userId: user.id,
                        collectionId: {
                            $ref: query,
                            $attr: 'auctionHouseId'
                        },
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.guardian, auctionHouseRelation.stockKeeper]
                        }
                    }
                };
                Object.assign(query, { $has: has });
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
                needData: true,
                condition: function condition(_ref7) {
                    var user = _ref7.user,
                        actionData = _ref7.actionData;
                    var auctionHouse = actionData.auctionHouse;

                    return {
                        userId: user.id,
                        relation: {
                            $exists: true
                        },
                        auctionHouseId: auctionHouse.id
                    };
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.update, {
        auths: [{
            "#relation": {}
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.start, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [vendueState.ready, vendueState.pausing].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [vendueState.ready, vendueState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [vendueState.preparing].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return [vendueState.preparing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.finish, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return [vendueState.ongoing, vendueState.pausing].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return [vendueState.ongoing, vendueState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.transfer, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.adminstrator]
            }
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.authGrant, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.administrator]
            }
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.remove, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.administrator]
            }
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                    return query;
                }
            }]
        }]
    }), _vendue),
    session: (_session = {}, _defineProperty(_session, sessionAction.create, {
        auths: [{
            "exists": [{
                relation: 'userVendue',
                needData: true,
                condition: function condition(_ref21) {
                    var user = _ref21.user,
                        actionData = _ref21.actionData;
                    var session = actionData.session;

                    if (session.biddingSchema) {
                        session.biddingSchema.forEach(function (ele, index) {
                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                            if (ele.type === 1 && ele.step) assert(ele.max - ele.min > ele.step, '设置的步长过大');
                            if (index > 0) {
                                if (ele.min !== session.biddingSchema[index - 1].max) {
                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '\u7B2C' + index + '\u6761\u7684\u6700\u5C0F\u503C\u4E0E\u4E0A\u4E00\u6761\u6700\u5927\u503C\u4E0D\u540C');
                                }
                            }
                        });
                    }
                    return {
                        userId: user.id,
                        vendueId: session.vendueId,
                        relation: {
                            $exists: true
                        }
                    };
                }
            }]
        }, {
            "exists": [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref22) {
                    var user = _ref22.user,
                        actionData = _ref22.actionData;
                    var session = actionData.session;

                    return {
                        userId: user.id,
                        auctionHouseId: session.vendue.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.update, {
        auths: [{
            "#relation": {}
        }, {
            '#relation': {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            '#relation': {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_session, sessionAction.start, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.finish, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref29) {
                    var user = _ref29.user,
                        row = _ref29.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.pause, {
        auths: [{
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.transfer, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_session, sessionAction.authGrant, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_session, sessionAction.remove, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _session),
    auction: (_auction = {}, _defineProperty(_auction, auctionAction.create, {
        auths: [{
            "exists": [{
                relation: 'userSession',
                needData: true,
                condition: function condition(_ref35) {
                    var user = _ref35.user,
                        actionData = _ref35.actionData;
                    var auction = actionData.auction;

                    if (auction.biddingSchema) {
                        auction.biddingSchema.forEach(function (ele, index) {
                            assert(ele.type < 3, '目前仅支持顺序递增和258拍');
                            if (ele.type === 1 && ele.step) assert(ele.max - ele.min > ele.step, '设置的步长过大');
                            if (index > 0) {
                                if (ele.min !== auction.biddingSchema[index - 1].max) {
                                    throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '\u7B2C' + index + '\u6761\u7684\u6700\u5C0F\u503C\u4E0E\u4E0A\u4E00\u6761\u6700\u5927\u503C\u4E0D\u540C');
                                }
                            }
                        });
                    }
                    return {
                        userId: user.id,
                        sessionId: auction.sessionId,
                        relation: {
                            $exists: true
                        }
                    };
                }
            }]
        }, {
            "exists": [{
                relation: 'userVendue',
                needData: true,
                condition: function condition(_ref36) {
                    var user = _ref36.user,
                        actionData = _ref36.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        vendueId: auction.session.vendueId,
                        relation: vendueRelation.administrator
                    };
                }
            }]
        }, {
            "exists": [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref37) {
                    var user = _ref37.user,
                        actionData = _ref37.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        auctionHouseId: auction.session.vendue.auctionHouseId,
                        relation: auctionHouseRelation.administrator
                    };
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.update, {
        auths: [{
            "#relation": {}
        }, {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_auction, auctionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator]
            },
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.start, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

                    return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.sold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.unsold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.remove, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _auction),
    bid: (_bid = {}, _defineProperty(_bid, bidAction.create, {
        auths: [{
            '#exists': [{
                relation: 'auction',
                needData: true,
                condition: function condition(_ref51) {
                    var user = _ref51.user,
                        actionData = _ref51.actionData;
                    var bid = actionData.bid;

                    return {
                        id: bid.auctionId,
                        state: auctionState.ongoing
                    };
                }
            }, {
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref52) {
                    var user = _ref52.user,
                        actionData = _ref52.actionData;
                    var bid = actionData.bid;

                    if (bid.category === bidCategory.bid && bid.isOnline) {
                        return {
                            id: bid.paddleId,
                            state: paddleState.unsettled
                        };
                    }
                    return {
                        state: paddleState.unsettled
                    };
                }
            }]
        }]
    }), _defineProperty(_bid, bidAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_bid, bidAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref53) {
                    var row = _ref53.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref54) {
                    var row = _ref54.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref55) {
                    var row = _ref55.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), _defineProperty(_bid, bidAction.update, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator]
            }
        }]
    }), _bid),
    paddle: _defineProperty({}, paddleAction.create, {
        auths: [{
            '#unexists': [{
                relation: 'userPaddle',
                condition: function condition(_ref56) {
                    var user = _ref56.user;

                    return {
                        paddle: {
                            state: paddleState.unsettled
                        },
                        userId: user.id
                    };
                }
            }]
        }]
    }),
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
                check: function check(_ref57) {
                    var row = _ref57.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref58) {
                    var row = _ref58.row;

                    return row.state === auctionHouseState.online;
                }
            }]
        }]
    }), _auctionHouse),
    collection: (_collection = {}, _defineProperty(_collection, collectionAction.create, AllowEveryoneAuth), _defineProperty(_collection, collectionAction.update, CollectionOwnerAndGranteeOrAuctionHouseWorker), _defineProperty(_collection, collectionAction.remove, CollectionOwnerAndGranteeOrAuctionHouseWorker), _collection),
    contract: (_contract = {}, _defineProperty(_contract, contractAction.create, AnyAuctionHouseWorker), _defineProperty(_contract, contractAction.update, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), _defineProperty(_contract, contractAction.remove, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), _defineProperty(_contract, contractAction.complete, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref59) {
                    var row = _ref59.row;

                    return row.state === contractState.legal;
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.abort, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref60) {
                    var row = _ref60.row;

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
                check: function check(_ref61) {
                    var row = _ref61.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref62) {
                    var row = _ref62.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.sell, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref63) {
                    var row = _ref63.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.return, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref64) {
                    var row = _ref64.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _stock)
};

var STATE_TRAN_MATRIX = {
    auctionHouse: AUCTIONHOUSE_STATE_TRAN_MATRIX,
    contract: CONTRACT_STATE_TRAN_MATRIX,
    stock: STOCK_STATE_TRAN_MATRIX,
    vendue: VENDUE_STATE_TRAN_MATRIX,
    session: SESSION_STATE_TRAN_MATRIX,
    auction: AUCTION_STATE_TRAN_MATRIX,
    deposit: DEPOSIT_STATE_TRAN_MATRIX,
    checkOut: CHECKOUT_STATE_TRAN_MATRIX,
    cashIn: CASHIN_STATE_TRAN_MATRIX,
    bid: BID_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};