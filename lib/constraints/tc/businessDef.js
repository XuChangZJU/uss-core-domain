'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _vendue, _session, _auction, _bid, _paddle, _auctionHouse, _collection, _contract, _stock, _deposit, _checkOut, _cashIn, _license, _agent, _qiniuFile, _paymentRecord, _banner, _paymentType, _blackList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = require('lodash/assign');
var assert = require('assert');

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/action'),
    CommonAction = _require2.action;

var _require3 = require('../../constants/tc/banner'),
    bannerAction = _require3.action;

var _require4 = require('../../constants/tc/agent'),
    agentAction = _require4.action,
    agentState = _require4.state;

var _require5 = require('../../constants/tc/deposit'),
    depositAction = _require5.action,
    depositState = _require5.state,
    DEPOSIT_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX;

var _require6 = require('../../constants/tc/checkOut'),
    checkOutAction = _require6.action,
    checkOutState = _require6.state,
    checkOutTransportState = _require6.transportState,
    CHECKOUT_STATE_TRAN_MATRIX = _require6.STATE_TRAN_MATRIX,
    decodeCheckOutAction = _require6.decodeAction;

var _require7 = require('../../constants/tc/cashIn'),
    cashInAction = _require7.action,
    cashInState = _require7.state,
    CASHIN_STATE_TRAN_MATRIX = _require7.STATE_TRAN_MATRIX;

var _require8 = require('../../constants/tc/auctionHouse'),
    auctionHouseAction = _require8.action,
    auctionHouseState = _require8.state,
    AUCTIONHOUSE_STATE_TRAN_MATRIX = _require8.STATE_TRAN_MATRIX,
    auctionHouseRelation = _require8.relation;

var _require9 = require('../../constants/tc/collection'),
    collectionAction = _require9.action,
    collectionState = _require9.state,
    collectionRelation = _require9.relation;

var _require10 = require('../../constants/tc/contract'),
    contractAction = _require10.action,
    contractState = _require10.state,
    CONTRACT_STATE_TRAN_MATRIX = _require10.STATE_TRAN_MATRIX;

var _require11 = require('../../constants/tc/stock'),
    stockAction = _require11.action,
    stockState = _require11.state,
    STOCK_STATE_TRAN_MATRIX = _require11.STATE_TRAN_MATRIX;

var _require12 = require('../../constants/tc/vendue'),
    vendueAction = _require12.action,
    vendueState = _require12.state,
    VENDUE_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX,
    vendueRelation = _require12.relation,
    vendueCategory = _require12.category;

var _require13 = require('../../constants/tc/session'),
    sessionAction = _require13.action,
    sessionState = _require13.state,
    SESSION_STATE_TRAN_MATRIX = _require13.STATE_TRAN_MATRIX,
    sessionRelation = _require13.relation;

var _require14 = require('../../constants/tc/auction'),
    auctionAction = _require14.action,
    auctionState = _require14.state,
    AUCTION_STATE_TRAN_MATRIX = _require14.STATE_TRAN_MATRIX,
    auctionRelation = _require14.relation;

var _require15 = require('../../constants/tc/bid'),
    bidAction = _require15.action,
    bidState = _require15.state,
    bidRelation = _require15.relation,
    BID_STATE_TRAN_MATRIX = _require15.STATE_TRAN_MATRIX,
    bidCategory = _require15.category;

var _require16 = require('../../constants/tc/paddle'),
    paddleAction = _require16.action,
    paddleRelation = _require16.relation,
    isPaddleOnline = _require16.isPaddleOnline;

var _require17 = require('../../constants/tc/license'),
    licenseAction = _require17.action,
    license_STATE_TRAN_MATRIX = _require17.STATE_TRAN_MATRIX;

var _require18 = require('../../constants/tc/contractTerms'),
    contractTermsAction = _require18.action,
    contractTermsState = _require18.state,
    CONTRACTTERMS_STATE_TRAN_MATRIX = _require18.COMMON_STATE_TRAN_MATRIX;

var _require19 = require('../../constants/tc/qiniuFile'),
    qiniuFileAction = _require19.action,
    qiniuFileState = _require19.state;

var _require20 = require('../../constants/tc/paymentRecord'),
    paymentRecordAction = _require20.action;

var _require21 = require('../../constants/tc/express'),
    expressAction = _require21.action;

var _require22 = require('../../constants/express'),
    EXPRESS_AUTH_MATRIX = _require22.AUTH_MATRIX,
    EXPRESS_STATE_TRANS_MATRIX = _require22.STATE_TRANS_MATRIX;

var ErrorCode = require('../../constants/errorCode');

var _require23 = require('../../constants/roleConstant2'),
    Roles = _require23.Roles;

var omit = require('lodash/omit');

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

var AuctionDataCheck = function AuctionDataCheck(states, msg) {
    return [{
        check: function check(_ref3) {
            var actionData = _ref3.actionData,
                row = _ref3.row;
            var auction = actionData.auction;

            if (auction.biddingSchema) {
                auction.biddingSchema.forEach(function (ele, index) {
                    if (ele.type >= 3) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '目前仅支持顺序递增和258拍');
                    }
                    if (ele.type === 1 && ele.step && !(ele.max - ele.min > ele.step)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '设置的步长过大');
                    }
                    if (index > 0) {
                        if (ele.min !== auction.biddingSchema[index - 1].max) {
                            return ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '\u7B2C' + index + '\u6761\u7684\u6700\u5C0F\u503C\u4E0E\u4E0A\u4E00\u6761\u6700\u5927\u503C\u4E0D\u540C');
                        }
                    }
                });
            }
            if (states) {
                assert(row);

                if (!states.includes(row.state)) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                        name: 'auction',
                        operation: 'update',
                        data: row
                    });
                }
            }
            return true;
        }
    }];
};

var AuctionGeneralStateChangeFn = function AuctionGeneralStateChangeFn(state, msg, extraConstraint) {
    var control = [{
        '#relation': {
            attr: 'session'
        },
        '#data': AuctionDataCheck(state, msg)
    }, {
        '#relation': {
            attr: 'session.vendue'
        },
        '#data': AuctionDataCheck(state, msg)
    }, {
        '#relation': {
            attr: 'session.vendue.auctionHouse'
        },
        '#data': AuctionDataCheck(state, msg)
    }];
    if (extraConstraint) {
        control.forEach(function (con) {
            return (0, _assign2.default)(con, extraConstraint);
        });
    }

    return control;
};

var AuctionCanCreate = [{
    relation: 'session',
    condition: function condition(_ref4) {
        var actionData = _ref4.actionData;
        var auction = actionData.auction;

        var query = {
            id: auction.sessionId,
            state: {
                $in: [sessionState.preparing, sessionState.ready, sessionState.ongoing]
            }
        };
        return query;
    }
}, {
    relation: 'contract',
    condition: function condition(_ref5) {
        var actionData = _ref5.actionData;
        var auction = actionData.auction;

        var query = {
            id: auction.contractId,
            state: contractState.contracted
        };
        return query;
    }
}];

var AuctionNoOtherAuctionOnSameContract = [{
    relation: 'auction',
    condition: function condition(_ref6) {
        var actionData = _ref6.actionData;
        var auction = actionData.auction;
        var contractId = auction.contractId;

        var query = {
            state: {
                $in: [auctionState.sold, auctionState.ready, auctionState.ongoing]
            },
            contractId: contractId
        };
        return query;
    },
    message: '该拍品已经在另一个有效的拍卖当中'
}, {
    relation: 'auction',
    condition: function condition(_ref7) {
        var actionData = _ref7.actionData;
        var auction = actionData.auction;
        var contractId = auction.contractId,
            sessionId = auction.sessionId;

        var query = {
            contractId: contractId,
            sessionId: sessionId
        };
        return query;
    },
    message: '该拍品已经存在于同一个拍卖当中'
}];

var AuctionCreateControl = {
    auths: [{
        '#relation': {
            attr: 'session',
            relation: [sessionRelation.owner]
        },
        '#exists': AuctionCanCreate,
        '#unexists': AuctionNoOtherAuctionOnSameContract
    }, {
        '#relation': {
            attr: 'session.vendue'
        },
        '#exists': AuctionCanCreate,
        '#unexists': AuctionNoOtherAuctionOnSameContract
    }, {
        '#relation': {
            attr: 'session.vendue.auctionHouse'
        },
        '#exists': AuctionCanCreate,
        '#unexists': AuctionNoOtherAuctionOnSameContract
    }]
};

var AuctionUnexistsBid = [{
    relation: 'bid',
    condition: function condition(_ref8) {
        var row = _ref8.row,
            actionData = _ref8.actionData;
        var auction = actionData.auction;


        if (auction.hasOwnProperty('id') && _keys2.default.length === 1) {
            return {
                id: -1
            };
        }
        return {
            auctionId: row.id
        };
    },
    message: '该拍品上已经有人出价'
}];

var AuctionCheckBidUnexistedControl = {
    auths: [{
        '#relation': {
            attr: 'session',
            relation: [sessionRelation.owner]
        },
        '#unexists': AuctionUnexistsBid
    }, {
        '#relation': {
            attr: 'session.vendue'
        },
        '#unexists': AuctionUnexistsBid
    }, {
        '#relation': {
            attr: 'session.vendue.auctionHouse'
        },
        '#unexists': AuctionUnexistsBid
    }]
};

var AuctionHouseOwnerAndmanagerExists = [{
    relation: 'userAuctionHouse',
    condition: function condition(_ref9) {
        var user = _ref9.user,
            row = _ref9.row;
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
            condition: function condition(_ref10) {
                var user = _ref10.user;

                var query = {
                    userId: user.id
                };
                return query;
            }
        }]
    }]
};

var CheckContractDataState = function CheckContractDataState(states, msg) {
    return [{
        check: function check(_ref11) {
            var row = _ref11.row,
                actionData = _ref11.actionData;
            var contract = actionData.contract;
            // if (contract.hasOwnProperty('price')) {
            //     assert(contract.price >= 0, `合同「${row.id}」的价格必须大于等于0`);
            // }

            if (!states.includes(row.state)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                    name: 'contract',
                    operation: 'update',
                    data: row
                });
            }

            return true;
        }
    }];
};

var CheckContractAuctionInactive = function CheckContractAuctionInactive(message) {
    return [{
        relation: 'auction',
        condition: function condition(_ref12) {
            var row = _ref12.row,
                actionData = _ref12.actionData;
            var id = row.id;

            return {
                contractId: id,
                state: {
                    $gt: auctionState.ongoing
                }
            };
        },
        message: message
    }];
};

var BidDataCheckStateFn = function BidDataCheckStateFn(states, checkDataFn) {
    return {
        check: function check(_ref13) {
            var row = _ref13.row,
                actionData = _ref13.actionData;
            var bid = actionData.bid;

            if (bid && bid.hasOwnProperty('price')) {
                assert(bid.price >= 0, 'bid\u300C' + row.id + '\u300D\u7684\u4EF7\u683C\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E0');
            }
            if (!states.includes(row.state)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u72B6\u6001\u4E0D\u652F\u6301\u6B64\u64CD\u4F5C', {
                    name: 'bid',
                    operation: 'update',
                    data: row
                });
            }
            if (checkDataFn) {
                return checkDataFn({ row: row, actionData: actionData });
            }
            return true;
        }
    };
};

var BidGeneralUpdateControl = function BidGeneralUpdateControl(states, extra, checkDataFn) {
    var DataCheck = BidDataCheckStateFn(states, checkDataFn);
    var Auth1 = assign({
        "#relation": {
            attr: 'auction.session',
            relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
        },
        '#data': [DataCheck]
    }, extra);
    var Auth2 = assign({
        "#relation": {
            attr: 'auction.session.vendue',
            relations: [vendueRelation.manager, vendueRelation.owner]
        },
        '#data': [DataCheck]
    }, extra);
    var Auth3 = assign({
        "#relation": {
            attr: 'auction.session.vendue.auctionHouse',
            relations: [auctionHouseRelation.manager, auctionHouseRelation.owner, auctionHouseRelation.auctioneer, auctionHouseRelation.settler]
        },
        '#data': [DataCheck]
    }, extra);

    return {
        auths: [Auth1, Auth2, Auth3]
    };
};

var DepositExistsPaddleVendue = {
    relation: 'paddle',
    needData: true,
    condition: function condition(_ref14) {
        var actionData = _ref14.actionData;
        var deposit = actionData.deposit;
        var paddleId = deposit.paddleId,
            price = deposit.price;

        return {
            id: paddleId,
            vendue: {
                state: {
                    $in: [vendueState.ready, vendueState.ongoing]
                }
            }
        };
    }
};

var CollectionOwnerOrAuctionHouseWorker = {
    auths: [{
        'exists': [{
            relation: 'userCollection',
            condition: function condition(_ref15) {
                var user = _ref15.user,
                    row = _ref15.row;
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
            condition: function condition(_ref16) {
                var user = _ref16.user,
                    row = _ref16.row;
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

var paddleRefundDataCheck = function paddleRefundDataCheck(isSuperUser) {
    return [{
        check: function check(_ref17) {
            var row = _ref17.row,
                actionData = _ref17.actionData,
                user = _ref17.user;
            var paddle = actionData.paddle,
                paymentMethod = actionData.paymentMethod;
            var refundingDeposit = paddle.refundingDeposit,
                id = paddle.id;
            var onlineDeposit = row.onlineDeposit;

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
        }
    }];
};

var paddleRefundUnexistsAuth = [{
    relation: 'bid',
    condition: function condition(_ref18) {
        var row = _ref18.row;

        return {
            paddleId: row.id,
            state: {
                $in: [bidState.bidding, bidState.success, bidState.confirmed]
            },
            checkOutId: {
                $exists: false
            }
        };
    },
    message: '该号牌上有待进行结算的拍卖'
}, {
    relation: 'bid',
    condition: function condition(_ref19) {
        var row = _ref19.row;

        return {
            paddleId: row.id,
            state: {
                $in: [bidState.success, bidState.confirmed]
            },
            checkOut: {
                state: {
                    $in: [checkOutState.unpaid, checkOutState.paying]
                }
            }
        };
    },
    message: '该号牌上有待进行结算的订单'
}, {
    relation: 'agent',
    condition: function condition(_ref20) {
        var row = _ref20.row;

        return {
            paddleId: row.id,
            state: {
                $in: [agentState.normal]
            }
        };
    },
    message: '该号牌上有生效中的委托'
}];

var CheckOutCheckDataFn = function CheckOutCheckDataFn(action, states, transportStates) {
    return {
        check: function check(_ref21) {
            var row = _ref21.row,
                actionData = _ref21.actionData;

            if (transportStates && !transportStates.includes(row.transportState)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u7269\u6D41\u72B6\u6001\u4E0D\u652F\u6301' + decodeCheckOutAction(action) + '\u64CD\u4F5C', {
                    name: 'checkOut',
                    operation: 'update',
                    data: row
                });
            };
            if (states && !states.includes(row.state)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u72B6\u6001\u4E0D\u652F\u6301' + decodeCheckOutAction(action) + '\u64CD\u4F5C', {
                    name: 'checkOut',
                    operation: 'update',
                    data: row
                });
            };

            var checkOut = actionData.checkOut;

            if (checkOut && checkOut.hasOwnProperty('price')) {
                assert(checkOut.price >= 0, 'checkOut\u7684\u4EF7\u683C\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E0');
            }
            return true;
        }
    };
};

var CheckOutGuestCheckFn = function CheckOutGuestCheckFn(action, states, transportStates) {
    return {
        '#exists': [{
            relation: 'paddle',
            condition: function condition(_ref22) {
                var user = _ref22.user,
                    row = _ref22.row,
                    roleName = _ref22.roleName;

                var query = {
                    id: row.paddleId
                };
                if (roleName !== Roles.ROOT.name) {
                    assign(query, {
                        userId: user.id
                    });
                }
                return query;
            }
        }],
        '#data': [CheckOutCheckDataFn(action, states, transportStates)]
    };
};

var CheckOutVendueWorkerCheckFn = function CheckOutVendueWorkerCheckFn(action, states, transportStates) {
    return {
        "#relation": {
            attr: 'paddle.vendue.auctionHouse',
            relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
        },
        '#data': [CheckOutCheckDataFn(action, states, transportStates)]
    };
};

var CheckOutVendueAuctionHouseWorkerCheckFn = function CheckOutVendueAuctionHouseWorkerCheckFn(action, states, transportStates) {
    return {
        "#relation": {
            attr: 'paddle.vendue.auctionHouse',
            relations: [auctionHouseRelation.manager, auctionHouseRelation.settler, auctionHouseRelation.owner]
        },
        '#data': [CheckOutCheckDataFn(action, states, transportStates)]
    };
};

var LicenseOperationControl = {
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
};

var CheckOutPushExistsCheckOut = [{
    relation: 'checkOut',
    needData: true,
    condition: function condition(_ref23) {
        var actionData = _ref23.actionData;
        var checkOutPush = actionData.checkOutPush;
        var paddleId = checkOutPush.paddleId;

        var query = {
            state: {
                $in: [checkOutState.unpaid, checkOutState.paying]
            },
            paddleId: paddleId
        };
        return query;
    }
}];

var CheckOutPushExistsBid = [{
    relation: 'bid',
    needData: true,
    condition: function condition(_ref24) {
        var actionData = _ref24.actionData;
        var checkOutPush = actionData.checkOutPush;
        var paddleId = checkOutPush.paddleId;

        var query = {
            checkOutId: {
                $exists: false
            },
            state: bidState.success,
            paddleId: paddleId
        };
        return query;
    }
}];

var CheckOutPushUnexistsRecentCheckOutPush = [{
    relation: 'checkOutPush',
    needData: true,
    condition: function condition(_ref25) {
        var actionData = _ref25.actionData;
        var checkOutPush = actionData.checkOutPush;
        var paddleId = checkOutPush.paddleId;

        var query = {
            paddleId: paddleId,
            _createAt_: {
                $gt: Date.now() - 3600 * 1000
            }
        };
        return query;
    },
    message: '一小时以内请勿重复打扰客户'
}];

var UnexistsActiveAuctionInSession = {
    relation: 'auction',
    condition: function condition(_ref26) {
        var user = _ref26.user,
            row = _ref26.row;

        return {
            sessionId: row.id,
            state: {
                $nin: [auctionState.unsold, auctionState.sold, auctionState.revoke]
            }
        };
    },
    message: '请将拍卖会中所有拍品流拍或成交后再将拍卖会结束'
};

var ExistsAuctionForBidCreation = {
    relation: 'auction',
    needData: true,
    condition: function condition(_ref27) {
        var user = _ref27.user,
            actionData = _ref27.actionData;
        var bid = actionData.bid;

        if (bid.agentId) {
            return {
                id: bid.auctionId,
                state: {
                    $in: [auctionState.ongoing, auctionState.ready]
                }
            };
        }
        return {
            id: bid.auctionId,
            state: {
                $in: [auctionState.ongoing]
            }
        };
    }
};

var SessionStateForBidCreation = {
    relation: 'session',
    needData: true,
    condition: function condition(_ref28) {
        var user = _ref28.user,
            actionData = _ref28.actionData;
        var bid = actionData.bid;

        if (bid.agentId) {
            return {
                id: {
                    $in: {
                        name: 'auction',
                        query: {
                            id: bid.auctionId
                        },
                        projection: 'sessionId'
                    }
                },
                state: {
                    $in: [auctionState.ongoing, auctionState.ready]
                }
            };
        }
        return {
            id: {
                $in: {
                    name: 'auction',
                    query: {
                        id: bid.auctionId
                    },
                    projection: 'sessionId'
                }
            },
            state: {
                $in: [auctionState.ongoing]
            }
        };
    },
    message: '专场尚未开始，不能出价'
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
                condition: function condition(_ref29) {
                    var user = _ref29.user,
                        actionData = _ref29.actionData;
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
            "#relation": {
                attr: 'auctionHouse'
            }
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.start, {
        auths: [{
            "#role": [Roles.ROOT.name],
            '#data': [{
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    if (![vendueState.ready].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.ready, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    if (![vendueState.preparing].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }, {
            "#relation": {},
            '#data': [{
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    if (![vendueState.preparing].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.finish, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    if (![vendueState.ongoing].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法结束拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }, {
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': [{
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

                    if (![vendueState.ongoing].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法结束拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.transfer, {
        auths: [{
            "#relation": {}
        }, {
            "#relation": {
                attr: 'auctionHouse'
            }
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.authGrantMulti2, {
        auths: [{
            "#relation": {}
        }, {
            "#relation": {
                attr: 'auctionHouse'
            }
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            "#data": [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    if (![vendueState.preparing, vendueState.ready].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }, {
            "#relation": {},
            "#data": [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    if (![vendueState.preparing, vendueState.ready].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态无法开始拍卖会', {
                            name: 'vendue',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_vendue, vendueAction.authRevoke, {
        auths: [{
            '#exists': [{
                needData: true,
                relation: 'userVendue',
                condition: function condition(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row,
                        actionData = _ref37.actionData;
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
                condition: function condition(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

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
                condition: function condition(_ref39) {
                    var user = _ref39.user,
                        actionData = _ref39.actionData;
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
                check: function check(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }],
            '#exists': [{
                relation: 'vendue',
                condition: function condition(_ref41) {
                    var row = _ref41.row;

                    var query = {
                        id: row.vendueId,
                        state: {
                            $in: [vendueState.ready, vendueState.ongoing]
                        }
                    };
                    return query;
                }
            }, {
                relation: 'auction',
                condition: function condition(_ref42) {
                    var row = _ref42.row;

                    var query = {
                        sessionId: row.id,
                        state: {
                            $in: [auctionState.ready, auctionState.pausing, auctionState.ongoing]
                        }
                    };
                    return query;
                },
                message: '专场中没有预展的拍品，不能开拍'
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            },
            '#data': [{
                check: function check(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }],
            '#exists': [{
                relation: 'vendue',
                condition: function condition(_ref44) {
                    var row = _ref44.row;

                    var query = {
                        id: row.vendueId,
                        state: {
                            $in: [vendueState.ready, vendueState.ongoing]
                        }
                    };
                    return query;
                }
            }, {
                relation: 'auction',
                condition: function condition(_ref45) {
                    var row = _ref45.row;

                    var query = {
                        sessionId: row.id,
                        state: {
                            $in: [auctionState.ready, auctionState.pausing]
                        }
                    };
                    return query;
                },
                message: '专场中没有预展的拍品，不能开拍'
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return [sessionState.ready, sessionState.pausing].includes(row.state);
                }
            }],
            '#exists': [{
                relation: 'vendue',
                condition: function condition(_ref47) {
                    var row = _ref47.row;

                    var query = {
                        id: row.vendueId,
                        state: {
                            $in: [vendueState.ready, vendueState.ongoing]
                        }
                    };
                    return query;
                }
            }, {
                relation: 'auction',
                condition: function condition(_ref48) {
                    var row = _ref48.row;

                    var query = {
                        sessionId: row.id,
                        state: {
                            $in: [auctionState.ready, auctionState.pausing, auctionState.ongoing]
                        }
                    };
                    return query;
                },
                message: '专场中没有预展的拍品，不能开拍'
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.ready, {
        auths: [{
            "#relation": {},
            '#data': [{
                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            },
            '#data': [{
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return [sessionState.preparing].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

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
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }],
            '#unexists': [UnexistsActiveAuctionInSession]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            },
            '#data': [{
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }],
            '#unexists': [UnexistsActiveAuctionInSession]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return [sessionState.ongoing, sessionState.pausing].includes(row.state);
                }
            }],
            '#unexists': [UnexistsActiveAuctionInSession]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.pause, {
        auths: [{
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.owner, vendueRelation.manager]
            },
            '#data': [{
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.owner, auctionHouseRelation.manager]
            },
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.state === sessionState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_session, sessionAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userSession',
                condition: function condition(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

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
                condition: function condition(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

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
                condition: function condition(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

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
                condition: function condition(_ref61) {
                    var user = _ref61.user,
                        row = _ref61.row;

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
                condition: function condition(_ref62) {
                    var user = _ref62.user,
                        row = _ref62.row;

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
                condition: function condition(_ref63) {
                    var user = _ref63.user,
                        row = _ref63.row;

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
                condition: function condition(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row,
                        actionData = _ref64.actionData;
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
                condition: function condition(_ref65) {
                    var user = _ref65.user,
                        row = _ref65.row;

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
                condition: function condition(_ref66) {
                    var user = _ref66.user,
                        row = _ref66.row;

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
    auction: (_auction = {}, (0, _defineProperty3.default)(_auction, auctionAction.create, AuctionCreateControl), (0, _defineProperty3.default)(_auction, auctionAction.update, AuctionCheckBidUnexistedControl), (0, _defineProperty3.default)(_auction, auctionAction.ready, {
        auths: AuctionGeneralStateChangeFn([auctionState.preparing], '非准备状态的展品不能就绪')
    }), (0, _defineProperty3.default)(_auction, auctionAction.start, {
        auths: AuctionGeneralStateChangeFn([auctionState.ready, auctionState.pausing], '非预展和暂停的展品不能进入拍卖')
    }), (0, _defineProperty3.default)(_auction, auctionAction.restart, {
        auths: AuctionGeneralStateChangeFn([auctionState.unsold], '非流拍的展品不能重拍')
    }), (0, _defineProperty3.default)(_auction, auctionAction.pause, {
        auths: AuctionGeneralStateChangeFn([auctionState.ongoing], '非拍卖状态的展品不能暂停')
    }), (0, _defineProperty3.default)(_auction, auctionAction.sold, {
        auths: [{
            '#role': [Roles.ROOT.name]
        }]
    }), (0, _defineProperty3.default)(_auction, auctionAction.unsold, {
        auths: AuctionGeneralStateChangeFn([auctionState.ongoing], '非拍卖状态的展品不能流拍', {
            '#unexists': [{
                relation: 'bid',
                condition: function condition(_ref67) {
                    var row = _ref67.row;

                    return {
                        auctionId: row.id
                    };
                },
                message: '拍品上已有出价，无法流拍'
            }]
        })
    }), (0, _defineProperty3.default)(_auction, auctionAction.remove, AuctionCheckBidUnexistedControl), (0, _defineProperty3.default)(_auction, auctionAction.assign, AllowEveryoneAuth), (0, _defineProperty3.default)(_auction, auctionAction.authRevoke, AllowEveryoneAuth), (0, _defineProperty3.default)(_auction, auctionAction.makeReady, {
        auths: AuctionGeneralStateChangeFn([auctionState.unsold], '非流拍的展品不能重拍')
    }), (0, _defineProperty3.default)(_auction, auctionAction.revoke, {
        auths: AuctionGeneralStateChangeFn([auctionState.ready, auctionState.resolded], '已开拍的拍品不能撤拍')
    }), (0, _defineProperty3.default)(_auction, auctionAction.resold, {
        auths: [{
            "#relation": {
                attr: 'session.vendue.auctionHouse',
                relations: [auctionRelation.owner, auctionRelation.manager]
            },
            "#data": [{
                check: function check(_ref68) {
                    var user = _ref68.user,
                        row = _ref68.row;

                    if (row.state !== auctionState.unsold) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u5F53\u524D\u72B6\u6001\u4E0D\u652F\u6301\u6B64\u64CD\u4F5C', {
                            name: 'bid',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }],
            '#exists': [{
                relation: 'vendue',
                condition: function condition(_ref69) {
                    var user = _ref69.user,
                        row = _ref69.row;

                    return {
                        id: row.session.vendueId,
                        category: vendueCategory.delayed
                    };
                },
                message: '当前拍卖类型不允许重拍'
            }]
        }]
    }), _auction),
    bid: (_bid = {}, (0, _defineProperty3.default)(_bid, bidAction.create, {
        auths: [{
            '#exists': [ExistsAuctionForBidCreation, {
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref70) {
                    var user = _ref70.user,
                        actionData = _ref70.actionData;
                    var bid = actionData.bid;

                    var query = {
                        userId: user.id
                    };
                    if (bid.paddleId) {
                        assign(query, {
                            id: bid.paddleId
                        });
                    }
                    return query;
                }
            }, SessionStateForBidCreation]
        }, {
            "#relation": {
                attr: 'auction.session',
                relations: [sessionRelation.manager, sessionRelation.auctioneer, sessionRelation.owner]
            },
            '#exists': [ExistsAuctionForBidCreation]
        }, {
            "#relation": {
                attr: 'auction.session.vendue',
                relations: [vendueRelation.manager, vendueRelation.owner]
            },
            '#exists': [ExistsAuctionForBidCreation, SessionStateForBidCreation]
        }, {
            "#relation": {
                attr: 'auction.session.vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#exists': [{
                relation: 'auction',
                needData: true,
                condition: function condition(_ref71) {
                    var actionData = _ref71.actionData;
                    var bid = actionData.bid;

                    return {
                        id: bid.auctionId,
                        state: auctionState.ongoing
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_bid, bidAction.success, BidGeneralUpdateControl([bidState.bidding], {
        '#unexists': [{
            relation: 'bid',
            condition: function condition(_ref72) {
                var row = _ref72.row;

                return {
                    id: {
                        $gt: row.id
                    },
                    auctionId: row.auctionId,
                    state: bidState.bidding
                };
            },
            message: '当前出价已经更新，请重新落槌'
        }]
    })), (0, _defineProperty3.default)(_bid, bidAction.remove, BidGeneralUpdateControl([bidState.bidding], {
        '#unexists': [{
            relation: 'bid',
            condition: function condition(_ref73) {
                var row = _ref73.row;

                return {
                    id: {
                        $gt: row.id
                    },
                    auctionId: row.auctionId,
                    state: bidState.bidding
                };
            },
            message: '只能移除最后一条出价'
        }]
    }, function (_ref74) {
        var row = _ref74.row;

        if (row.isOnline || row.agentId) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '\u53EA\u80FD\u79FB\u9664\u6765\u81EA\u73B0\u573A\u7684\u51FA\u4EF7', {
                name: 'bid',
                operation: 'update',
                data: row
            });
        }
        return true;
    })), (0, _defineProperty3.default)(_bid, bidAction.update, BidGeneralUpdateControl([bidState.bidding, bidState.success, bidState.confirmed])), (0, _defineProperty3.default)(_bid, bidAction.changePrice, BidGeneralUpdateControl([bidState.success, bidState.confirmed], {}, function (_ref75) {
        var row = _ref75.row;

        if (row.checkOutId) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '已结算的拍品不能再修改价格', {
                name: 'bid',
                operation: 'update',
                data: row
            });
        }
        return true;
    })), (0, _defineProperty3.default)(_bid, bidAction.confirm, BidGeneralUpdateControl([bidState.success, bidState.confirmed], {}, function (_ref76) {
        var row = _ref76.row;

        if (row.checkOutId) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '已结算的拍品不能再进行核对', {
                name: 'bid',
                operation: 'update',
                data: row
            });
        }
        return true;
    })), (0, _defineProperty3.default)(_bid, bidAction.violate, BidGeneralUpdateControl([bidState.success, bidState.confirmed], {}, function (_ref77) {
        var row = _ref77.row;

        if (row.checkOutId) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '已结算的拍品不能再进行弃标', {
                name: 'bid',
                operation: 'update',
                data: row
            });
        }
        return true;
    })), (0, _defineProperty3.default)(_bid, bidAction.makeFailure, {
        auths: [{
            "#role": [Roles.ROOT.name],
            '#data': [BidDataCheckStateFn([bidState.bidding])]
        }]
    }), _bid),
    paddle: (_paddle = {}, (0, _defineProperty3.default)(_paddle, paddleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userVendue',
                needData: true,
                condition: function condition(_ref78) {
                    var user = _ref78.user,
                        actionData = _ref78.actionData;

                    return {
                        userId: user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                }
            }],
            '#unexists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref79) {
                    var user = _ref79.user,
                        actionData = _ref79.actionData;

                    return {
                        userId: actionData.paddle.userId || user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                },
                message: '用户已经申领过一个号牌'
            }]
        }, {
            '#exists': [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref80) {
                    var user = _ref80.user,
                        actionData = _ref80.actionData;

                    return {
                        userId: user.id,
                        auctionHouseId: {
                            $in: {
                                name: 'vendue',
                                query: {
                                    id: actionData.paddle.vendueId
                                },
                                projection: 'auctionHouseId'
                            }
                        }
                    };
                }
            }],
            '#unexists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref81) {
                    var user = _ref81.user,
                        actionData = _ref81.actionData;

                    return {
                        userId: actionData.paddle.userId || user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                },
                message: '用户已经申领过一个号牌'
            }]
        }, {
            '#unexists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref82) {
                    var user = _ref82.user,
                        actionData = _ref82.actionData;

                    return {
                        userId: user.id,
                        vendueId: actionData.paddle.vendueId
                    };
                },
                message: '用户已经申领过一个号牌'
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
    }), (0, _defineProperty3.default)(_paddle, paddleAction.changePrice, {
        auths: [{
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner]
            },
            '#data': [{
                check: function check(_ref83) {
                    var actionData = _ref83.actionData,
                        row = _ref83.row;
                    var paddle = actionData.paddle;

                    var totalDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                    var availableDeposit = paddle.availableDeposit + 1 || row.availableDeposit + 1;
                    assert(totalDeposit >= 1, 'paddle\u300C' + row.id + '\u300D\u7684totalDeposit\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E0');
                    assert(totalDeposit >= availableDeposit, 'paddle\u300C' + row.id + '\u300D\u7684totalDeposit\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8EavailableDeposit');
                }
            }]
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': [{
                check: function check(_ref84) {
                    var actionData = _ref84.actionData,
                        row = _ref84.row;
                    var paddle = actionData.paddle;

                    var totalDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                    var availableDeposit = paddle.totalDeposit + 1 || row.totalDeposit + 1;
                    assert(totalDeposit >= 1, 'paddle\u300C' + row.id + '\u300D\u7684totalDeposit\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E0');
                    assert(availableDeposit >= 1, 'paddle\u300C' + row.id + '\u300D\u7684availableDeposit\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8E0');
                    assert(totalDeposit >= availableDeposit, 'paddle\u300C' + row.id + '\u300D\u7684totalDeposit\u5FC5\u987B\u5927\u4E8E\u7B49\u4E8EavailableDeposit');
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_paddle, paddleAction.refund, {
        auths: [{
            "#relation": {
                attr: 'vendue',
                relations: [vendueRelation.worker, vendueRelation.manager, vendueRelation.owner]
            },
            '#data': paddleRefundDataCheck(true),
            '#unexists': paddleRefundUnexistsAuth
        }, {
            "#relation": {
                attr: 'vendue.auctionHouse',
                relations: [auctionHouseRelation.manager, auctionHouseRelation.owner]
            },
            '#data': paddleRefundDataCheck(true),
            '#unexists': paddleRefundUnexistsAuth
        }, {
            '#exists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref85) {
                    var user = _ref85.user,
                        actionData = _ref85.actionData;
                    var paddle = actionData.paddle;

                    return {
                        id: paddle.id,
                        userId: user.id
                    };
                }
            }],
            '#data': paddleRefundDataCheck(false),
            '#unexists': paddleRefundUnexistsAuth
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
                check: function check(_ref86) {
                    var row = _ref86.row;

                    return row.state === auctionHouseState.offline;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.disable, {
        auths: [{
            '#exists': AuctionHouseOwnerAndmanagerExists,
            '#data': [{
                check: function check(_ref87) {
                    var row = _ref87.row;

                    return row.state === auctionHouseState.online;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_auctionHouse, auctionHouseAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref88) {
                    var user = _ref88.user,
                        row = _ref88.row;

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
                condition: function condition(_ref89) {
                    var user = _ref89.user,
                        row = _ref89.row;

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
                condition: function condition(_ref90) {
                    var user = _ref90.user,
                        row = _ref90.row,
                        actionData = _ref90.actionData;
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
            "#relation": {},
            '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许更新')
        }, {
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许更新')
        }, {
            "#relation": {},
            '#data': [{
                check: function check(_ref91) {
                    var row = _ref91.row,
                        actionData = _ref91.actionData;
                    var contract = actionData.contract;

                    if (contract.hasOwnProperty('price')) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同不能修改成交价', {
                            name: 'contract',
                            operation: 'update',
                            data: row
                        });
                    }
                    if (![contractState.convertible].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同当前状态不允许更新', {
                            name: 'contract',
                            operation: 'update',
                            data: row
                        });
                    }

                    return true;
                }
            }]
        }, {
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': [{
                check: function check(_ref92) {
                    var row = _ref92.row,
                        actionData = _ref92.actionData;
                    var contract = actionData.contract;

                    if (contract.hasOwnProperty('price')) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同不能修改成交价', {
                            name: 'contract',
                            operation: 'update',
                            data: row
                        });
                    }
                    if (![contractState.convertible].includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '合同当前状态不允许更新', {
                            name: 'contract',
                            operation: 'update',
                            data: row
                        });
                    }

                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.changePrice, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': CheckContractDataState([contractState.contracted, contractState.convertible], '合同当前状态不允许改价')
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.remove, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': CheckContractDataState([contractState.contracted], '合同当前状态不允许删除'),
            '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法删除')
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.pay, {
        auths: [{
            '#data': CheckContractDataState([contractState.contracted], '当前状态无法支付成功')
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.complete, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': CheckContractDataState([contractState.convertible], '当前状态无法结算')
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'auctionHouse'
            },
            '#data': CheckContractDataState([contractState.contracted], '当前状态无法取消'),
            '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法取消')
        }]
    }), (0, _defineProperty3.default)(_contract, contractAction.abort, {
        auths: [{
            "#relation": {},
            '#data': CheckContractDataState([contractState.contracted], '当前状态无法中止'),
            '#unexisted': CheckContractAuctionInactive('拍卖已经开始，无法中止')
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
                check: function check(_ref93) {
                    var row = _ref93.row;

                    return row.state === stockState.notStored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.outStore, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref94) {
                    var row = _ref94.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.sell, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref95) {
                    var row = _ref95.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_stock, stockAction.return, {
        auths: [{
            '#exists': StockAuctionHouseWorkerExists,
            '#data': [{
                check: function check(_ref96) {
                    var row = _ref96.row;

                    return row.state === stockState.stored;
                }
            }]
        }]
    }), _stock),
    deposit: (_deposit = {}, (0, _defineProperty3.default)(_deposit, depositAction.create, {
        auths: [{
            '#exists': [DepositExistsPaddleVendue],
            "#relation": {
                attr: 'paddle.vendue.auctionHouse'
            }
        }, {
            '#exists': [DepositExistsPaddleVendue, {
                relation: 'paddle',
                needData: true,
                message: '同步拍保证金余额需大于2000元',
                condition: function condition(_ref97) {
                    var user = _ref97.user,
                        actionData = _ref97.actionData;
                    var deposit = actionData.deposit;
                    var paddleId = deposit.paddleId,
                        price = deposit.price;

                    return {
                        id: paddleId,
                        vendue: {
                            state: {
                                $in: [vendueState.ready, vendueState.ongoing]
                            },
                            category: vendueCategory.synchronous
                        },
                        totalDeposit: {
                            $gt: 1999.9 - price
                        }
                    };
                }
            }]
        }, {
            '#exists': [DepositExistsPaddleVendue, {
                relation: 'paddle',
                needData: true,
                message: '同步拍保证金余额需大于2000元',
                condition: function condition(_ref98) {
                    var user = _ref98.user,
                        actionData = _ref98.actionData;
                    var deposit = actionData.deposit;
                    var paddleId = deposit.paddleId,
                        price = deposit.price;

                    return {
                        id: paddleId,
                        vendue: {
                            state: {
                                $in: [vendueState.ready, vendueState.ongoing]
                            },
                            category: vendueCategory.delayed
                        },
                        totalDeposit: {
                            $gt: 999.9 - price
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_deposit, depositAction.makePaid, {
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
    checkOut: (_checkOut = {}, (0, _defineProperty3.default)(_checkOut, checkOutAction.takeAway, {
        auths: [CheckOutVendueWorkerCheckFn(checkOutAction.takeAway, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.unpicked]), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.takeAway, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.unpicked])]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.taPrepare, {
        auths: [CheckOutGuestCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]), CheckOutVendueWorkerCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taPrepare, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping])]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.taCancel, {
        auths: [CheckOutGuestCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]), CheckOutVendueWorkerCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taCancel, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing])]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.taSend, {
        auths: [CheckOutVendueWorkerCheckFn(checkOutAction.taSend, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing]), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.taSend, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsInPreparing])]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.taAccept, {
        auths: [CheckOutGuestCheckFn(checkOutAction.taAccept, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.tsSending])]
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
                            $in: [checkOutState.unpaid, checkOutState.paying]
                        }
                    };
                },
                message: '存在尚未完成的结算，请先完成或撤销'
            }]
            // todo 检查bid是否都是success状态且未结算，这个似乎不太好写，目前是写在service/checkOut.js的trigger里
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.update, {
        auths: [CheckOutGuestCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]), CheckOutVendueWorkerCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping]), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.update, [checkOutState.legal, checkOutState.legal2], [checkOutTransportState.shipping])]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.changePrice, {
        auths: [CheckOutVendueWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid, checkOutState.legal2], null), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.changePrice, [checkOutState.init, checkOutState.unpaid, checkOutState.legal2], null)]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.confirmToPay, {
        auths: [CheckOutGuestCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null), CheckOutVendueWorkerCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.confirmToPay, [checkOutState.init], null)]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.makePaid, {
        auths: [CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.makePaid, [checkOutState.init, checkOutState.unpaid], null)]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.complete, {
        auths: [{
            '#role': [Roles.ROOT.name]
        }]
    }), (0, _defineProperty3.default)(_checkOut, checkOutAction.cancel, {
        auths: [CheckOutGuestCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null), CheckOutVendueWorkerCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null), CheckOutVendueAuctionHouseWorkerCheckFn(checkOutAction.cancel, [checkOutState.init, checkOutState.unpaid, checkOutState.paying], null)]
    }), _checkOut),
    cashIn: (_cashIn = {}, (0, _defineProperty3.default)(_cashIn, cashInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                needData: true,
                condition: function condition(_ref100) {
                    var user = _ref100.user,
                        actionData = _ref100.actionData;
                    var cashIn = actionData.cashIn;

                    return {
                        userId: user.id,
                        auctionHouseId: cashIn.auctionHouseId,
                        relation: {
                            $in: [auctionHouseRelation.owner, auctionHouseRelation.manager, auctionHouseRelation.settler]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_cashIn, cashInAction.makePaid, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref101) {
                    var user = _ref101.user,
                        row = _ref101.row;

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
    license: (_license = {}, (0, _defineProperty3.default)(_license, licenseAction.create, LicenseOperationControl), (0, _defineProperty3.default)(_license, licenseAction.update, LicenseOperationControl), (0, _defineProperty3.default)(_license, licenseAction.remove, LicenseOperationControl), _license),
    agent: (_agent = {}, (0, _defineProperty3.default)(_agent, agentAction.create, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref102) {
                    var user = _ref102.user,
                        actionData = _ref102.actionData,
                        roleName = _ref102.roleName;
                    var agent = actionData.agent;

                    var query = {
                        id: agent.paddleId
                    };
                    if (roleName !== Roles.ROOT.name) {
                        assign(query, {
                            userId: user.id
                        });
                    }
                    return query;
                },
                message: '您未拥有当前号牌，请领取号牌或重新登录后再进行操作'
            }, {
                relation: 'auction',
                needData: true,
                condition: function condition(_ref103) {
                    var user = _ref103.user,
                        actionData = _ref103.actionData;
                    var agent = actionData.agent;
                    var auctionId = agent.auctionId;

                    var query = {
                        state: {
                            $in: [auctionState.ready, auctionState.ongoing]
                        },
                        id: auctionId
                    };
                    return query;
                },
                message: '该拍品已结束拍卖或尚在准备，不能进行委托'
            }, {
                relation: 'session',
                needData: true,
                condition: function condition(_ref104) {
                    var user = _ref104.user,
                        actionData = _ref104.actionData;
                    var agent = actionData.agent;
                    var auctionId = agent.auctionId;

                    var query = {
                        state: {
                            $in: [sessionState.ready, sessionState.ongoing]
                        },
                        id: {
                            $in: {
                                name: 'auction',
                                query: {
                                    id: auctionId
                                },
                                projection: 'sessionId'
                            }
                        }
                    };
                    return query;
                },
                message: '该拍品已结束拍卖或尚在准备，不能进行委托'
            }],
            '#unexists': [{
                relation: 'agent',
                needData: true,
                condition: function condition(_ref105) {
                    var user = _ref105.user,
                        actionData = _ref105.actionData;
                    var agent = actionData.agent;
                    var auctionId = agent.auctionId;

                    var query = {
                        paddle: {
                            userId: user.id
                        },
                        state: agentState.normal,
                        auctionId: auctionId
                    };
                    return query;
                },
                message: '您在此拍品上已有一个委托，不可重复委托'
            }, {
                relation: 'bid',
                needData: true,
                condition: function condition(_ref106) {
                    var user = _ref106.user,
                        actionData = _ref106.actionData;
                    var agent = actionData.agent;
                    var auctionId = agent.auctionId,
                        price = agent.price;

                    var query = {
                        price: {
                            $gte: price
                        },
                        state: bidState.bidding,
                        auctionId: auctionId
                    };
                    return query;
                },
                message: '委托价必须高于当前最高价'
            }]
        }]
    }), (0, _defineProperty3.default)(_agent, agentAction.update, {
        auths: [{
            '#exists': [{
                relation: 'paddle',
                needData: true,
                condition: function condition(_ref107) {
                    var user = _ref107.user,
                        row = _ref107.row,
                        roleName = _ref107.roleName;
                    var paddleId = row.paddleId;

                    var query = {
                        id: paddleId
                    };
                    if (!roleName || roleName !== Roles.ROOT.name) {
                        assign(query, {
                            userId: user.id
                        });
                    }
                    return query;
                },
                message: '您未拥有当前号牌，请领取号牌或重新登录后再进行操作'
            }],
            '#unexists': [{
                relation: 'bid',
                needData: true,
                condition: function condition(_ref108) {
                    var user = _ref108.user,
                        actionData = _ref108.actionData,
                        row = _ref108.row;
                    var agent = actionData.agent;
                    var agentPrice = agent.price;
                    var auctionId = row.auctionId;

                    return {
                        price: {
                            $gt: agentPrice
                        },
                        auctionId: auctionId
                    };
                },
                message: '委托不能低于当前最高价'
            }],
            '#data': [{
                check: function check(_ref109) {
                    var user = _ref109.user,
                        row = _ref109.row;

                    if (row.state !== agentState.normal) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '成交或失败的委托不能进行修改', {
                            name: 'agent',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
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
                condition: function condition(_ref110) {
                    var user = _ref110.user;

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
            '#exists': CheckOutPushExistsCheckOut,
            '#relation': {
                attr: 'paddle.vendue'
            },
            '#unexists': CheckOutPushUnexistsRecentCheckOutPush
        }, {
            '#exists': CheckOutPushExistsCheckOut,
            '#relation': {
                attr: 'paddle.vendue.auctionHouse'
            },
            '#unexists': CheckOutPushUnexistsRecentCheckOutPush
        }, {
            '#exists': CheckOutPushExistsBid,
            '#relation': {
                attr: 'paddle.vendue'
            },
            '#unexists': CheckOutPushUnexistsRecentCheckOutPush
        }, {
            '#exists': CheckOutPushExistsBid,
            '#relation': {
                attr: 'paddle.vendue.auctionHouse'
            },
            '#unexists': CheckOutPushUnexistsRecentCheckOutPush
        }]
    }),
    express: EXPRESS_AUTH_MATRIX,
    paymentType: (_paymentType = {}, (0, _defineProperty3.default)(_paymentType, CommonAction.create, {
        auths: [{
            '#relation': {
                attr: 'auctionHouse'
            }
        }]
    }), (0, _defineProperty3.default)(_paymentType, CommonAction.update, {
        auths: [{
            '#relation': {
                attr: 'auctionHouse'
            }
        }]
    }), _paymentType),
    auctionRefund: (0, _defineProperty3.default)({}, CommonAction.create, {
        auths: [{
            '#relation': {
                attr: 'checkOut.paddle.vendue.auctionHouse'
            }
        }]
    }),
    contractRefund: (0, _defineProperty3.default)({}, CommonAction.create, {
        auths: [{
            '#relation': {
                attr: 'cashIn.auctionHouse'
            }
        }]
    }),
    blackList: (_blackList = {}, (0, _defineProperty3.default)(_blackList, CommonAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref111) {
                    var user = _ref111.user;

                    var query = {
                        userId: user.id,
                        relation: auctionRelation.owner
                    };
                    return query;
                }
            }]
        }, {
            "#role": [Roles.ROOT.name]
        }]
    }), (0, _defineProperty3.default)(_blackList, CommonAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userAuctionHouse',
                condition: function condition(_ref112) {
                    var user = _ref112.user;

                    var query = {
                        userId: user.id,
                        relation: auctionRelation.owner
                    };
                    return query;
                }
            }]
        }, {
            "#role": [Roles.ROOT.name]
        }]
    }), _blackList)
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
    contractTerms: CONTRACTTERMS_STATE_TRAN_MATRIX,
    express: EXPRESS_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};