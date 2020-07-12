'use strict';

var _vendue, _session, _auction, _bid, _paddle, _auctionHouse, _collection, _contract, _stock, _deposit, _checkOut, _cashIn, _license, _contractTerms, _agent, _qiniuFile;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/vendue/agent'),
    agentAction = _require2.action,
    agentState = _require2.state;

var _require3 = require('../../constants/vendue/deposit'),
    depositAction = _require3.action,
    depositState = _require3.state,
    DEPOSIT_STATE_TRAN_MATRIX = _require3.STATE_TRAN_MATRIX;

var _require4 = require('../../constants/vendue/checkOut'),
    checkOutAction = _require4.action,
    checkOutState = _require4.state,
    CHECKOUT_STATE_TRAN_MATRIX = _require4.STATE_TRAN_MATRIX;

var _require5 = require('../../constants/vendue/cashIn'),
    cashInAction = _require5.action,
    cashInState = _require5.state,
    CASHIN_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX;

var _require6 = require('../../constants/vendue/auctionHouse'),
    auctionHouseAction = _require6.action,
    auctionHouseState = _require6.state,
    AUCTIONHOUSE_STATE_TRAN_MATRIX = _require6.STATE_TRAN_MATRIX,
    auctionHouseRelation = _require6.relation;

var _require7 = require('../../constants/vendue/collection'),
    collectionAction = _require7.action,
    collectionState = _require7.state,
    collectionRelation = _require7.relation;

var _require8 = require('../../constants/vendue/contract'),
    contractAction = _require8.action,
    contractState = _require8.state,
    CONTRACT_STATE_TRAN_MATRIX = _require8.STATE_TRAN_MATRIX;

var _require9 = require('../../constants/vendue/stock'),
    stockAction = _require9.action,
    stockState = _require9.state,
    STOCK_STATE_TRAN_MATRIX = _require9.STATE_TRAN_MATRIX;

var _require10 = require('../../constants/vendue/vendue'),
    vendueAction = _require10.action,
    vendueState = _require10.state,
    VENDUE_STATE_TRAN_MATRIX = _require10.STATE_TRAN_MATRIX,
    vendueRelation = _require10.relation;

var _require11 = require('../../constants/vendue/session'),
    sessionAction = _require11.action,
    sessionState = _require11.state,
    SESSION_STATE_TRAN_MATRIX = _require11.STATE_TRAN_MATRIX,
    sessionRelation = _require11.relation;

var _require12 = require('../../constants/vendue/auction'),
    auctionAction = _require12.action,
    auctionState = _require12.state,
    AUCTION_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX,
    auctionRelation = _require12.relation;

var _require13 = require('../../constants/vendue/bid'),
    bidAction = _require13.action,
    bidState = _require13.state,
    bidRelation = _require13.relation,
    BID_STATE_TRAN_MATRIX = _require13.STATE_TRAN_MATRIX,
    bidCategory = _require13.category;

var _require14 = require('../../constants/vendue/paddle'),
    paddleAction = _require14.action,
    paddleRelation = _require14.relation,
    isPaddleOnline = _require14.isPaddleOnline;

var _require15 = require('../../constants/vendue/license'),
    licenseAction = _require15.action,
    license_STATE_TRAN_MATRIX = _require15.STATE_TRAN_MATRIX;

var _require16 = require('../../constants/vendue/contractTerms'),
    contractTermsAction = _require16.action,
    contractTermsState = _require16.state,
    CONTRACTTERMS_STATE_TRAN_MATRIX = _require16.COMMON_STATE_TRAN_MATRIX;

var _require17 = require('../../constants/vendue/qiniuFile'),
    qiniuFileAction = _require17.action,
    qiniuFileState = _require17.state;

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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator, auctionHouseRelation.manager]
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
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator, auctionHouseRelation.manager]
                        }
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

                    return [vendueState.ready].includes(row.state);
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
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [vendueState.ready].includes(row.state);
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
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
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

                    return [vendueState.ongoing].includes(row.state);
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
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return [vendueState.ongoing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.id,
                        relation: vendueRelation.owner
                    };
                    return query;
                }
            }, {
                relation: 'userAuctionHouse',
                condition: function condition(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.authGrantMulti2, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.id,
                        relation: {
                            $in: [vendueRelation.administrator, vendueRelation.owner]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.remove, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.authGrant, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.id,
                        relation: {
                            $in: [vendueRelation.administrator, vendueRelation.owner]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_vendue, vendueAction.authRevoke, {
        auths: [{
            '#exists': [{
                needData: true,
                relation: 'userVendue',
                condition: function condition(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row,
                        actionData = _ref25.actionData;
                    var userVendue = actionData.userVendue;

                    var query = {
                        userId: user.id,
                        vendueId: row.id,
                        relation: {
                            $lt: userVendue.relation - 99
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
                        }
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
                condition: function condition(_ref27) {
                    var user = _ref27.user,
                        actionData = _ref27.actionData;
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
        }]
    }), _defineProperty(_session, sessionAction.update, {
        auths: [{
            "#relation": {}
        }, {
            '#relation': {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            }
        }, {
            '#relation': {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            }
        }]
    }), _defineProperty(_session, sessionAction.start, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref29) {
                    var user = _ref29.user,
                        row = _ref29.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.finish, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.administrator, sessionRelation.auctioneer]
            },
            '#data': [{
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.pause, {
        auths: [{
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            },
            '#data': [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            },
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                condition: function condition(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    var query = {
                        userId: user.id,
                        sessionId: row.id,
                        relation: sessionRelation.owner
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.vendueId,
                        relation: {
                            $in: [vendueRelation.owner, vendueRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.authGrantMulti2, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                condition: function condition(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

                    var query = {
                        userId: user.id,
                        sessionId: row.id,
                        relation: {
                            $in: [sessionRelation.owner, sessionRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.vendueId,
                        relation: {
                            $in: [vendueRelation.owner, vendueRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.authGrant, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                condition: function condition(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    var query = {
                        userId: user.id,
                        sessionId: row.id,
                        relation: {
                            $in: [sessionRelation.owner, sessionRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.vendueId,
                        relation: {
                            $in: [vendueRelation.owner, vendueRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.authRevoke, {
        auths: [{
            '#exists': [{
                needData: 'true',
                relation: 'userSession',
                condition: function condition(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row,
                        actionData = _ref49.actionData;
                    var userSession = actionData.userSession;

                    var query = {
                        userId: user.id,
                        sessionId: row.id,
                        relation: {
                            $lt: userSession.relation - 99
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    var query = {
                        userId: user.id,
                        vendueId: row.vendueId,
                        relation: {
                            $in: [vendueRelation.owner, vendueRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_session, sessionAction.remove, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.administrator]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
            }
        }]
    }), _session),
    auction: (_auction = {}, _defineProperty(_auction, auctionAction.create, {
        auths: [{
            "exists": [{
                relation: 'userSession',
                needData: true,
                condition: function condition(_ref52) {
                    var user = _ref52.user,
                        actionData = _ref52.actionData;
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
                condition: function condition(_ref53) {
                    var user = _ref53.user,
                        actionData = _ref53.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        vendueId: auction.session.vendueId,
                        relation: {
                            $in: [vendueRelation.administrator, vendueRelation.owner]
                        }
                    };
                }
            }]
        }, {
            "exists": [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref54) {
                    var user = _ref54.user,
                        actionData = _ref54.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        auctionHouseId: auction.session.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
                        }
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
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
        }]
    }), _defineProperty(_auction, auctionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.start, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            }
            // '#data': [
            //     {
            //         check: ({user, row}) => {
            //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
            //         },
            //     }
            // ],
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
            // '#data': [
            //     {
            //         check: ({user, row}) => {
            //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
            //         },
            //     }
            // ],
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
            // '#data': [
            //     {
            //         check: ({user, row}) => {
            //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
            //         },
            //     }
            // ],
        }]
    }), _defineProperty(_auction, auctionAction.sold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref61) {
                    var user = _ref61.user,
                        row = _ref61.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.unsold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref62) {
                    var user = _ref62.user,
                        row = _ref62.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref63) {
                    var user = _ref63.user,
                        row = _ref63.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_auction, auctionAction.remove, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
        }]
    }), _auction),
    bid: (_bid = {}, _defineProperty(_bid, bidAction.create, {
        auths: [{
            '#exists': [{
                relation: 'auction',
                needData: true,
                condition: function condition(_ref65) {
                    var user = _ref65.user,
                        actionData = _ref65.actionData;
                    var bid = actionData.bid;

                    return {
                        id: bid.auctionId,
                        state: auctionState.ongoing
                    };
                }
            }]
        }]
    }), _defineProperty(_bid, bidAction.success, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref66) {
                    var row = _ref66.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref67) {
                    var row = _ref67.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref68) {
                    var row = _ref68.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), _defineProperty(_bid, bidAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
        }]
    }), _defineProperty(_bid, bidAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref69) {
                    var row = _ref69.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref70) {
                    var row = _ref70.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref71) {
                    var row = _ref71.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), _defineProperty(_bid, bidAction.update, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.administrator, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
        }]
    }), _bid),
    paddle: (_paddle = {}, _defineProperty(_paddle, paddleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                needData: true,
                condition: function condition(_ref72) {
                    var user = _ref72.user,
                        actionData = _ref72.actionData;

                    return {
                        userId: user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                }
            }]
        }, {
            '#unexists': [{
                needData: true,
                relation: 'userPaddle',
                condition: function condition(_ref73) {
                    var user = _ref73.user,
                        actionData = _ref73.actionData;
                    var userId = actionData.userId,
                        paddle = actionData.paddle;

                    if (userId) {
                        return {
                            paddle: {
                                vendueId: paddle.vendueId
                            },
                            userId: userId
                        };
                    } else {
                        return {
                            paddle: {
                                vendueId: paddle.vendueId
                            },
                            userId: user.id
                        };
                    }
                }
            }]
        }]
    }), _defineProperty(_paddle, paddleAction.update, {
        auths: [{
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.worker, vendueRelation.administrator, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref74) {
                    var row = _ref74.row;

                    if (row.number) {
                        return isPaddleOnline(row.number);
                    };
                    return true;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref75) {
                    var row = _ref75.row;

                    if (row.number) {
                        return isPaddleOnline(row.number);
                    };
                    return true;
                }
            }]
        }]
    }), _paddle),
    auctionHouse: (_auctionHouse = {}, _defineProperty(_auctionHouse, auctionHouseAction.create, AllowEveryoneAuth), _defineProperty(_auctionHouse, auctionHouseAction.update, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.remove, {
        auths: [{
            "#relation": {
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.owner]
            }
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.enable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref76) {
                    var row = _ref76.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndManagerExists,
            '#data': [{
                check: function check(_ref77) {
                    var row = _ref77.row;

                    return row.state === auctionHouseState.online;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref78) {
                    var user = _ref78.user,
                        row = _ref78.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.id,
                        relation: auctionHouseRelation.owner
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.authGrantMulti2, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref79) {
                    var user = _ref79.user,
                        row = _ref79.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.id,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.authGrant, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref80) {
                    var user = _ref80.user,
                        row = _ref80.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.id,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.administrator]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_auctionHouse, auctionHouseAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref81) {
                    var user = _ref81.user,
                        row = _ref81.row,
                        actionData = _ref81.actionData;
                    var userAuctionHouse = actionData.userAuctionHouse;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.id,
                        relation: {
                            $lt: userAuctionHouse.relation - 99
                        }
                    };
                    return query;
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
                check: function check(_ref82) {
                    var row = _ref82.row;

                    return row.state === contractState.legal;
                }
            }]
        }]
    }), _defineProperty(_contract, contractAction.abort, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref83) {
                    var row = _ref83.row;

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
                check: function check(_ref84) {
                    var row = _ref84.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref85) {
                    var row = _ref85.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.sell, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref86) {
                    var row = _ref86.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _defineProperty(_stock, stockAction.return, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref87) {
                    var row = _ref87.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _stock),
    deposit: (_deposit = {}, _defineProperty(_deposit, depositAction.create, AllowEveryoneAuth), _defineProperty(_deposit, depositAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), _deposit),
    checkOut: (_checkOut = {}, _defineProperty(_checkOut, checkOutAction.create, {
        auths: [{
            '#unexists': [{
                relation: 'checkOut',
                needData: true,
                condition: function condition(_ref88) {
                    var user = _ref88.user,
                        actionData = _ref88.actionData;
                    var checkOut = actionData.checkOut;

                    return {
                        paddleId: checkOut.paddleId,
                        state: {
                            $lt: checkOutState.legal
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_checkOut, checkOutAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), _defineProperty(_checkOut, checkOutAction.remove, {
        auths: [{
            "#relation": {
                attr: 'paddle',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), _checkOut),
    cashIn: (_cashIn = {}, _defineProperty(_cashIn, cashInAction.create, AllowEveryoneAuth), _defineProperty(_cashIn, cashInAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.administrator, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), _cashIn),
    license: (_license = {}, _defineProperty(_license, licenseAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                needData: true,
                condition: function condition(_ref89) {
                    var user = _ref89.user,
                        actionData = _ref89.actionData;

                    return {
                        userId: user.id,
                        sessionId: actionData.license.sessionId
                    };
                }
            }]
        }]
    }), _defineProperty(_license, licenseAction.update, {
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
    }), _defineProperty(_license, licenseAction.remove, {
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
    }), _license),
    contractTerms: (_contractTerms = {}, _defineProperty(_contractTerms, contractTermsAction.create, {
        auths: [{
            '#exists': [{
                needData: true,
                relation: 'userAuctionHouse',
                condition: function condition(_ref90) {
                    var user = _ref90.user,
                        actionData = _ref90.actionData;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_contractTerms, contractTermsAction.update, {
        auths: [{
            "#relation": {
                attr: 'contract.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.worker]
            }
        }]
    }), _defineProperty(_contractTerms, contractTermsAction.remove, {
        auths: [{
            "#relation": {
                attr: 'contract.auctionHouse',
                relations: [auctionHouseRelation.administrator, auctionHouseRelation.worker]
            }
        }]
    }), _contractTerms),
    agent: (_agent = {}, _defineProperty(_agent, agentAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPaddle',
                needData: true,
                condition: function condition(_ref91) {
                    var user = _ref91.user,
                        actionData = _ref91.actionData;
                    var agent = actionData.agent;

                    var query = {
                        userId: user.id,
                        paddleId: agent.paddleId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_agent, agentAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userPaddle',
                condition: function condition(_ref92) {
                    var user = _ref92.user,
                        row = _ref92.row;

                    var query = {
                        userId: user.id,
                        paddleId: row.paddleId
                    };
                    return query;
                }
            }]
        }]
    }), _agent),
    qiniuFile: (_qiniuFile = {}, _defineProperty(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), _defineProperty(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile)
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
    bid: BID_STATE_TRAN_MATRIX,
    contractTerms: CONTRACTTERMS_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};