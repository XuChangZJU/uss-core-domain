'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _vendue, _session, _auction, _bid, _paddle, _auctionHouse, _collection, _contract, _stock, _deposit, _checkOut, _cashIn, _license, _contractTerms, _agent, _qiniuFile, _paymentRecord, _banner;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth,
    CommonAction = _require.action;

var _require2 = require('../../constants/vendue/banner'),
    bannerAction = _require2.action;

var _require3 = require('../../constants/vendue/agent'),
    agentAction = _require3.action,
    agentState = _require3.state;

var _require4 = require('../../constants/vendue/deposit'),
    depositAction = _require4.action,
    depositState = _require4.state,
    DEPOSIT_STATE_TRAN_MATRIX = _require4.STATE_TRAN_MATRIX;

var _require5 = require('../../constants/vendue/checkOut'),
    checkOutAction = _require5.action,
    checkOutState = _require5.state,
    checkOutTransportState = _require5.transportState,
    CHECKOUT_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX;

var _require6 = require('../../constants/vendue/cashIn'),
    cashInAction = _require6.action,
    cashInState = _require6.state,
    CASHIN_STATE_TRAN_MATRIX = _require6.STATE_TRAN_MATRIX;

var _require7 = require('../../constants/vendue/auctionHouse'),
    auctionHouseAction = _require7.action,
    auctionHouseState = _require7.state,
    AUCTIONHOUSE_STATE_TRAN_MATRIX = _require7.STATE_TRAN_MATRIX,
    auctionHouseRelation = _require7.relation;

var _require8 = require('../../constants/vendue/collection'),
    collectionAction = _require8.action,
    collectionState = _require8.state,
    collectionRelation = _require8.relation;

var _require9 = require('../../constants/vendue/contract'),
    contractAction = _require9.action,
    contractState = _require9.state,
    CONTRACT_STATE_TRAN_MATRIX = _require9.STATE_TRAN_MATRIX;

var _require10 = require('../../constants/vendue/stock'),
    stockAction = _require10.action,
    stockState = _require10.state,
    STOCK_STATE_TRAN_MATRIX = _require10.STATE_TRAN_MATRIX;

var _require11 = require('../../constants/vendue/vendue'),
    vendueAction = _require11.action,
    vendueState = _require11.state,
    VENDUE_STATE_TRAN_MATRIX = _require11.STATE_TRAN_MATRIX,
    vendueRelation = _require11.relation;

var _require12 = require('../../constants/vendue/session'),
    sessionAction = _require12.action,
    sessionState = _require12.state,
    SESSION_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX,
    sessionRelation = _require12.relation;

var _require13 = require('../../constants/vendue/auction'),
    auctionAction = _require13.action,
    auctionState = _require13.state,
    AUCTION_STATE_TRAN_MATRIX = _require13.STATE_TRAN_MATRIX,
    auctionRelation = _require13.relation;

var _require14 = require('../../constants/vendue/bid'),
    bidAction = _require14.action,
    bidState = _require14.state,
    bidRelation = _require14.relation,
    BID_STATE_TRAN_MATRIX = _require14.STATE_TRAN_MATRIX,
    bidCategory = _require14.category;

var _require15 = require('../../constants/vendue/paddle'),
    paddleAction = _require15.action,
    paddleRelation = _require15.relation,
    isPaddleOnline = _require15.isPaddleOnline;

var _require16 = require('../../constants/vendue/license'),
    licenseAction = _require16.action,
    license_STATE_TRAN_MATRIX = _require16.STATE_TRAN_MATRIX;

var _require17 = require('../../constants/vendue/contractTerms'),
    contractTermsAction = _require17.action,
    contractTermsState = _require17.state,
    CONTRACTTERMS_STATE_TRAN_MATRIX = _require17.COMMON_STATE_TRAN_MATRIX;

var _require18 = require('../../constants/vendue/qiniuFile'),
    qiniuFileAction = _require18.action,
    qiniuFileState = _require18.state;

var _require19 = require('../../constants/vendue/paymentRecord'),
    paymentRecordAction = _require19.action;

var _require20 = require('../../constants/vendue/express'),
    expressAction = _require20.action;

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
                $in: [auctionHouseRelation.stockKeeper, auctionHouseRelation.owner, auctionHouseRelation.manager]
            }
        };
        return query;
    }
}];

var AuctionHouseOwnerAndmanagerExists = [{
    relation: 'userAuctionHouse',
    condition: function condition(_ref3) {
        var user = _ref3.user,
            row = _ref3.row;
        var auctionHouseId = row.id;

        var query = {
            userId: user.id,
            auctionHouseId: auctionHouseId,
            relation: {
                $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
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

var CollectionOwnerOrAuctionHouseWorker = {
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
                        $in: [collectionRelation.owner]
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.stockKeeper]
                        }
                    }
                };
                (0, _assign2.default)(query, { $has: has });
                return query;
            }

        }]
    }]
};

var AUTH_MATRIX = {
    vendue: (_vendue = {}, (0, _defineProperty3.default)(_vendue, vendueAction.assign, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.create, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        },
                        auctionHouseId: auctionHouse.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.update, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.start, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
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
    }), (0, _defineProperty3.default)(_vendue, vendueAction.ready, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
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
    }), (0, _defineProperty3.default)(_vendue, vendueAction.finish, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
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
    }), (0, _defineProperty3.default)(_vendue, vendueAction.transfer, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.authGrantMulti2, {
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
                            $in: [vendueRelation.manager, vendueRelation.owner]
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.remove, {
        auths: [{
            "#relation": {
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            "#data": [{
                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return [vendueState.preparing, vendueState.ready].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }],
            "#data": [{
                check: function check(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return [vendueState.preparing, vendueState.ready].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.authRevoke, {
        auths: [{
            '#exists': [{
                needData: true,
                relation: 'userVendue',
                condition: function condition(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row,
                        actionData = _ref25.actionData;
                    var userVendue = actionData.userVendue;

                    if (!userVendue.relation) {
                        return {
                            userId: user.id,
                            vendueId: row.id,
                            relation: {
                                $in: [vendueRelation.manager, vendueRelation.owner]
                            }
                        };
                    }
                    if (userVendue.relation === vendueRelation.owner) {
                        return {
                            relation: -1
                        };
                    }
                    if (userVendue.relation === vendueRelation.manager) {
                        return {
                            userId: user.id,
                            vendueId: row.id,
                            relation: {
                                $in: [vendueRelation.owner]
                            }
                        };
                    }
                    if (userVendue.relation === vendueRelation.worker) {
                        return {
                            userId: user.id,
                            vendueId: row.id,
                            relation: {
                                $in: [vendueRelation.manager, vendueRelation.owner]
                            }
                        };
                    }
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
                            $in: [auctionHouseRelation.manager, auctionHouseRelation.owner]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _vendue),
    session: (_session = {}, (0, _defineProperty3.default)(_session, sessionAction.assign, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.manager, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.create, {
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
    }), (0, _defineProperty3.default)(_session, sessionAction.update, {
        auths: [{
            "#relation": {}
        }, {
            '#relation': {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            }
        }, {
            '#relation': {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.start, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.manager, sessionRelation.auctioneer]
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
                relations: [vendueRelation.owner, vendueRelation.manager]
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
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.ready, {
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
                relations: [vendueRelation.owner, vendueRelation.manager]
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
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.finish, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.manager, sessionRelation.auctioneer]
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
                relations: [vendueRelation.owner, vendueRelation.manager]
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
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.pause, {
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
                relations: [vendueRelation.owner, vendueRelation.manager]
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
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.transfer, {
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
                            $in: [vendueRelation.owner, vendueRelation.manager]
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.authGrantMulti2, {
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
                            $in: [sessionRelation.owner, sessionRelation.manager]
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
                            $in: [vendueRelation.owner, vendueRelation.manager]
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.authRevoke, {
        auths: [{
            '#exists': [{
                needData: 'true',
                relation: 'userSession',
                condition: function condition(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row,
                        actionData = _ref46.actionData;
                    var userSession = actionData.userSession;

                    if (!userSession.relation) {
                        return {
                            userId: user.id,
                            sessionId: row.id,
                            relation: {
                                $in: [sessionRelation.owner, sessionRelation.manager]
                            }
                        };
                    }
                    if (userSession.relation === sessionRelation.owner) {
                        return {
                            userId: user.id,
                            sessionId: row.id,
                            relation: -1
                        };
                    }
                    if (userSession.relation === sessionRelation.manager) {
                        return {
                            userId: user.id,
                            sessionId: row.id,
                            relation: {
                                $in: [sessionRelation.owner]
                            }
                        };
                    }
                    if (userSession.relation === sessionRelation.worker) {
                        return {
                            userId: user.id,
                            sessionId: row.id,
                            relation: {
                                $in: [sessionRelation.owner, sessionRelation.manager]
                            }
                        };
                    }
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
                            $in: [vendueRelation.owner, vendueRelation.manager]
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.remove, {
        auths: [{
            "#relation": {
                relations: [sessionRelation.owner, sessionRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            }
        }]
    }), _session),
    auction: (_auction = {}, (0, _defineProperty3.default)(_auction, auctionAction.create, {
        auths: [{
            "exists": [{
                relation: 'userSession',
                needData: true,
                condition: function condition(_ref49) {
                    var user = _ref49.user,
                        actionData = _ref49.actionData;
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
                condition: function condition(_ref50) {
                    var user = _ref50.user,
                        actionData = _ref50.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        vendueId: auction.session.vendueId,
                        relation: {
                            $in: [vendueRelation.manager, vendueRelation.owner]
                        }
                    };
                }
            }]
        }, {
            "exists": [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref51) {
                    var user = _ref51.user,
                        actionData = _ref51.actionData;
                    var auction = actionData.auction;

                    return {
                        userId: user.id,
                        auctionHouseId: auction.session.vendue.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.manager, auctionHouseRelation.owner]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.update, {
        auths: [{
            "#relation": {}
        }, {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

                    return row.state === auctionState.preparing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.start, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
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
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
            // '#data': [
            //     {
            //         check: ({user, row}) => {
            //             return [auctionState.ready, auctionState.pausing, auctionState.unsold].includes(row.state);
            //         },
            //     }
            // ],
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.sold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.unsold, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
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
                relations: [vendueRelation.manager, vendueRelation.owner]
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
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref61) {
                    var user = _ref61.user,
                        row = _ref61.row;

                    return row.state === auctionState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.remove, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.assign, AllowEveryoneAuth), (0, _defineProperty3.default)(_auction, auctionAction.authRevoke, AllowEveryoneAuth), _auction),
    bid: (_bid = {}, (0, _defineProperty3.default)(_bid, bidAction.create, {
        auths: [{
            '#exists': [{
                relation: 'auction',
                needData: true,
                condition: function condition(_ref62) {
                    var user = _ref62.user,
                        actionData = _ref62.actionData;
                    var bid = actionData.bid;

                    return {
                        id: bid.auctionId,
                        state: auctionState.ongoing
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.success, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref63) {
                    var row = _ref63.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref64) {
                    var row = _ref64.row;

                    return row.state === bidState.bidding;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref65) {
                    var row = _ref65.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
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
                relations: [vendueRelation.manager, vendueRelation.owner]
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
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref68) {
                    var row = _ref68.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.cancelBidding, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
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
                relations: [vendueRelation.manager, vendueRelation.owner]
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
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref71) {
                    var row = _ref71.row;

                    return row.state === bidState.bidding;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.cancelSuccess, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#data': [{
                check: function check(_ref72) {
                    var row = _ref72.row;

                    return row.state === bidState.success;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref73) {
                    var row = _ref73.row;

                    return row.state === bidState.success;
                }
            }]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref74) {
                    var row = _ref74.row;

                    return row.state === bidState.success;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.update, {
        auths: [{
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), _bid),
    paddle: (_paddle = {}, (0, _defineProperty3.default)(_paddle, paddleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                needData: true,
                condition: function condition(_ref75) {
                    var user = _ref75.user,
                        actionData = _ref75.actionData;

                    return {
                        userId: user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                }
            }]
        }, {
            '#unexists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref76) {
                    var user = _ref76.user,
                        actionData = _ref76.actionData;

                    return {
                        userId: user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_paddle, paddleAction.update, {
        auths: [{
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), _paddle),
    auctionHouse: (_auctionHouse = {}, (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.assign, {
        auths: [{
            "#relation": {
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.update, {
        auths: [{
            '#exists': AuctionHouseOwnerAndmanagerExists
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.remove, {
        auths: [{
            "#relation": {
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.enable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndmanagerExists,
            '#data': [{
                check: function check(_ref77) {
                    var row = _ref77.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndmanagerExists,
            '#data': [{
                check: function check(_ref78) {
                    var row = _ref78.row;

                    return row.state === auctionHouseState.online;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref79) {
                    var user = _ref79.user,
                        row = _ref79.row;

                    var query = {
                        userId: user.id,
                        auctionHouseId: row.id,
                        relation: auctionHouseRelation.owner
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.authGrantMulti2, {
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
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref81) {
                    var user = _ref81.user,
                        row = _ref81.row,
                        actionData = _ref81.actionData;
                    var userAuctionHouse = actionData.userAuctionHouse;

                    if (!userAuctionHouse.relation) {
                        return {
                            userId: user.id,
                            auctionHouseId: row.id,
                            relation: {
                                $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                            }
                        };
                    }
                    if (userAuctionHouse.relation === auctionHouseRelation.owner) {
                        return {
                            relation: -1
                        };
                    }
                    if (userAuctionHouse.relation === auctionHouseRelation.manager) {
                        return {
                            userId: user.id,
                            auctionHouseId: row.id,
                            relation: {
                                $in: [auctionHouseRelation.owner]
                            }
                        };
                    }

                    if ([auctionHouseRelation.worker, auctionHouseRelation.auctioneer, auctionHouseRelation.settler, auctionHouseRelation.stockKeeper].includes(userAuctionHouse.relation)) {
                        return {
                            userId: user.id,
                            auctionHouseId: row.id,
                            relation: {
                                $in: [auctionHouseRelation.owner, auctionHouseRelation.manager]
                            }
                        };
                    }
                }
            }]
        }]
    }), _auctionHouse),
    collection: (_collection = {}, (0, _defineProperty3.default)(_collection, collectionAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_collection, collectionAction.update, CollectionOwnerOrAuctionHouseWorker), (0, _defineProperty3.default)(_collection, collectionAction.remove, CollectionOwnerOrAuctionHouseWorker), _collection),
    contract: (_contract = {}, (0, _defineProperty3.default)(_contract, contractAction.create, AnyAuctionHouseWorker), (0, _defineProperty3.default)(_contract, contractAction.update, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.remove, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.complete, {
        auths: [{
            '#exists': ContractAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref82) {
                    var row = _ref82.row;

                    return row.state === contractState.legal;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.abort, {
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
    stock: (_stock = {}, (0, _defineProperty3.default)(_stock, stockAction.create, AnyAuctionHouseWorker), (0, _defineProperty3.default)(_stock, stockAction.update, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.remove, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.inStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref84) {
                    var row = _ref84.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref85) {
                    var row = _ref85.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.sell, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref86) {
                    var row = _ref86.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.return, {
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
    deposit: (_deposit = {}, (0, _defineProperty3.default)(_deposit, depositAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_deposit, depositAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), _deposit),
    checkOut: (_checkOut = {}, (0, _defineProperty3.default)(_checkOut, checkOutAction.prepare, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref88) {
                    var user = _ref88.user,
                        row = _ref88.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref89) {
                    var user = _ref89.user,
                        row = _ref89.row;

                    return [checkOutTransportState.keeping].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref90) {
                    var user = _ref90.user,
                        row = _ref90.row;

                    return [checkOutTransportState.keeping].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.cancelPrepare, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref91) {
                    var user = _ref91.user,
                        row = _ref91.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref92) {
                    var user = _ref92.user,
                        row = _ref92.row;

                    return [checkOutTransportState.preparing].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref93) {
                    var user = _ref93.user,
                        row = _ref93.row;

                    return [checkOutTransportState.keeping].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.ship, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.stockKeeper, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref94) {
                    var user = _ref94.user,
                        row = _ref94.row;

                    return [checkOutTransportState.preparing].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.cancelShip, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.stockKeeper, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref95) {
                    var user = _ref95.user,
                        row = _ref95.row;

                    return [checkOutTransportState.shipped].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.receive, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref96) {
                    var user = _ref96.user,
                        row = _ref96.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref97) {
                    var user = _ref97.user,
                        row = _ref97.row;

                    return [checkOutTransportState.shipped].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.takeAway, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.stockKeeper, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref98) {
                    var user = _ref98.user,
                        row = _ref98.row;

                    return [checkOutTransportState.keeping].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.create, {
        auths: [{
            '#unexists': [{
                relation: 'checkOut',
                needData: true,
                condition: function condition(_ref99) {
                    var user = _ref99.user,
                        actionData = _ref99.actionData;
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
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref100) {
                    var user = _ref100.user,
                        row = _ref100.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref101) {
                    var user = _ref101.user,
                        row = _ref101.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref102) {
                    var user = _ref102.user,
                        row = _ref102.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref103) {
                    var user = _ref103.user,
                        row = _ref103.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.cancel, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref104) {
                    var user = _ref104.user,
                        row = _ref104.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref105) {
                    var user = _ref105.user,
                        row = _ref105.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }, {

            "#relation": {
                attr: 'paddle.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref106) {
                    var user = _ref106.user,
                        row = _ref106.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'paddle.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref107) {
                    var user = _ref107.user,
                        row = _ref107.row;

                    return [checkOutState.init, checkOutState.unpaid].includes(row.state);
                }
            }]
        }]
    }), _checkOut),
    cashIn: (_cashIn = {}, (0, _defineProperty3.default)(_cashIn, cashInAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_cashIn, cashInAction.makePaid, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref108) {
                    var user = _ref108.user,
                        row = _ref108.row;

                    return {
                        userId: user.id,
                        auctionHouseId: row.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler]
                        }
                    };
                }
            }]
        }]
    }), _cashIn),
    license: (_license = {}, (0, _defineProperty3.default)(_license, licenseAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                needData: true,
                condition: function condition(_ref109) {
                    var user = _ref109.user,
                        actionData = _ref109.actionData;

                    return {
                        userId: user.id,
                        sessionId: actionData.license.sessionId
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userVendue',
                condition: function condition(_ref110) {
                    var user = _ref110.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref111) {
                    var user = _ref111.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_license, licenseAction.update, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.owner, sessionRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler]
            }
        }]
    }), (0, _defineProperty3.default)(_license, licenseAction.remove, {
        auths: [{
            "#relation": {
                attr: 'session',
                relations: [sessionRelation.owner, sessionRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'session.vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler]
            }
        }]
    }), _license),
    contractTerms: (_contractTerms = {}, (0, _defineProperty3.default)(_contractTerms, contractTermsAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref112) {
                    var user = _ref112.user;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_contractTerms, contractTermsAction.update, {
        auths: [{
            "#relation": {
                attr: 'contract.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_contractTerms, contractTermsAction.remove, {
        auths: [{
            "#relation": {
                attr: 'contract.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.worker]
            }
        }]
    }), _contractTerms),
    agent: (_agent = {}, (0, _defineProperty3.default)(_agent, agentAction.create, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref113) {
                    var user = _ref113.user,
                        actionData = _ref113.actionData;
                    var agent = actionData.agent;

                    var query = {
                        userId: user.id,
                        id: agent.paddleId
                    };
                    return query;
                }
            }, {
                relation: 'auction',
                needData: true,
                condition: function condition(_ref114) {
                    var user = _ref114.user,
                        actionData = _ref114.actionData;
                    var agent = actionData.agent;
                    var auctionId = agent.auctionId;

                    var query = {
                        state: {
                            $in: [auctionState.ready, auctionState.ongoing]
                        },
                        id: auctionId
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_agent, agentAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                condition: function condition(_ref115) {
                    var user = _ref115.user,
                        row = _ref115.row;

                    var query = {
                        userId: user.id,
                        id: row.paddleId
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref116) {
                    var user = _ref116.user,
                        row = _ref116.row;

                    return [agentState.failed].includes(row.state) || row.state === agentState.normal && row.auction.state !== auctionState.ongoing;
                }
            }]
        }]
    }), _agent),
    qiniuFile: (_qiniuFile = {}, (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile),
    paymentRecord: (_paymentRecord = {}, (0, _defineProperty3.default)(_paymentRecord, paymentRecordAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_paymentRecord, paymentRecordAction.remove, AllowEveryoneAuth), _paymentRecord),
    banner: (_banner = {}, (0, _defineProperty3.default)(_banner, bannerAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref117) {
                    var user = _ref117.user;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_banner, bannerAction.update, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            }
        }]
    }), (0, _defineProperty3.default)(_banner, bannerAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            }
        }]
    }), _banner),
    checkOutPush: (0, _defineProperty3.default)({}, CommonAction.create, {
        auths: [{
            '#exists': [{
                relation: 'checkOut',
                needData: true,
                condition: function condition(_ref118) {
                    var user = _ref118.user,
                        actionData = _ref118.actionData;
                    var checkOutPush = actionData.checkOutPush;
                    var checkOutId = checkOutPush.checkOutId;

                    var query = {
                        state: {
                            $in: [checkOutState.unpaid, checkOutState.paying]
                        },
                        id: checkOutId
                    };
                    return query;
                }
            }]
        }]
    })
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