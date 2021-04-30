'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _checkIn, _schedule, _limits, _appointment, _activity, _report, _question, _revisit, _signUp, _screening;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断
var assert = require('assert');
var omit = require('lodash/omit');
var xor = require('lodash/xor');

var _require = require('../../constants/action'),
    CommonAction = _require.action;

var _require2 = require('../../constants/lens/revisitQuestion'),
    revisitQuestionAction = _require2.action;

var _require3 = require('../../constants/lens/revisit'),
    revisitAction = _require3.action,
    revisitState = _require3.state,
    REVISIT_STATE_TRANS_MATRIX = _require3.STATE_TRANS_MATRIX;

var _require4 = require('../../constants/lens/question'),
    questionAction = _require4.action,
    category = _require4.category;

var _require5 = require('../../constants/lens/report'),
    reportAction = _require5.action;

var _require6 = require('../../constants/lens/appointment'),
    appointmentAction = _require6.action,
    APPOINTMENT_STATE_TRANS_MATRIX = _require6.STATE_TRANS_MATRIX,
    appointmentState = _require6.state,
    appointmentRelation = _require6.relation;

var _require7 = require('../../constants/lens/activity'),
    activityAction = _require7.action,
    activityCategory = _require7.category,
    ACTIVITY_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX,
    activityState = _require7.state;

var _require8 = require('../../constants/lens/qiniuFile'),
    qiniuFileAction = _require8.action,
    qiniuFileState = _require8.state;

var _require9 = require('../../constants/lens/checkIn'),
    CheckInAction = _require9.action,
    CheckInCategory = _require9.category;

var _require10 = require('../../constants/lens/schedule'),
    ScheduleAction = _require10.action;

var _require11 = require('../../constants/lens/limits'),
    LimitsAction = _require11.action,
    LimitsType = _require11.type;

var _require12 = require('../../constants/lens/trade'),
    TradeAction = _require12.action,
    TradeState = _require12.state,
    TradeGetMethodId = _require12.getMethodId,
    TradeCategoryId = _require12.categoryId,
    TRADE_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX,
    TradeTransportState = _require12.transportState,
    tradeBillState = _require12.billState;

var _require13 = require('../../constants/lens/workerOrder'),
    WorkerOrderAction = _require13.action,
    WorkerOrderRelation = _require13.relation,
    WorkerOrderState = _require13.state,
    WORKERORDER_STATE_TRAN_MATRIX = _require13.STATE_TRAN_MATRIX;

var _require14 = require('../../constants/lens/brand'),
    BrandAction = _require14.action,
    BrandRelation = _require14.relation;

var _require15 = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require15.action,
    DiagnosisState = _require15.state,
    DIAGNOSIS_STATE_TRANS_MATRIX = _require15.STATE_TRANS_MATRIX,
    DiagnosisRelation = _require15.relation;

var _require16 = require('../../constants/lens/recheck'),
    RecheckAction = _require16.action,
    RecheckState = _require16.state,
    RECHECK_STATE_TRANS_MATRIX = _require16.STATE_TRANS_MATRIX;

var _require17 = require('../../constants/lens/record'),
    RecordAction = _require17.action,
    RecordState = _require17.state,
    RecordRelation = _require17.relation;

var _require18 = require('../../constants/lens/patient'),
    PatientAction = _require18.action,
    PatientRelation = _require18.relation;

var _require19 = require('../../constants/lens/device'),
    DeviceAction = _require19.action,
    DeviceState = _require19.state,
    DEVICE_STATE_TRANS_MATRIX = _require19.STATE_TRANS_MATRIX;

var _require20 = require('../../constants/lens/organization'),
    OrganizationAction = _require20.action,
    OrganizationState = _require20.state,
    OrganizationRelation = _require20.relation,
    ORGANIZATION_STATE_TRANS_MATRIX = _require20.STATE_TRANS_MATRIX;

var _require21 = require('../../constants/lens/screening'),
    screeningAction = _require21.action,
    screeningState = _require21.state,
    SCREENING_STATE_TRANS_MATRIX = _require21.STATE_TRANS_MATRIX;

var _require22 = require('../../constants/lens/signUp'),
    signUpAction = _require22.action,
    signUpState = _require22.state,
    SIGNUP_STATE_TRANS_MATRIX = _require22.STATE_TRANS_MATRIX;

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

var _require23 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require23.action,
    TransmitterState = _require23.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require23.STATE_TRANS_MATRIX,
    TransmitterType = _require23.type;

var _require24 = require('../action'),
    AllowEveryoneAuth = _require24.AllowEveryoneAuth,
    OwnerRelationAuth = _require24.OwnerRelationAuth,
    AnyRelationAuth = _require24.AnyRelationAuth;

var _require25 = require('../../constants/lens/roles'),
    Roles = _require25.Roles;

var ErrorCode = require('../../constants/errorCode');

var Jobs = {
    guardian: 1, //守护者
    administrator: 2, //管理员
    doctor: 3,
    nurse: 4,
    superAdministrator: 5 // 超级管理员
};

var tradeTransportCheck = function tradeTransportCheck(states, transportStates, getMethodIds) {
    return [{
        check: function check(_ref) {
            var row = _ref.row,
                user = _ref.user;

            if (!states.includes(row.state)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前支付状态不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row
                });
            }
            if (!transportStates.includes(row.transportState)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前物流状态不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row
                });
            }
            if (!getMethodIds.includes(row.getMethodId)) {
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前取货方式不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row
                });
            }
            return true;
        }
    }];
};

var insideBrandRelation = [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff, BrandRelation.worker];

var OrganizationManagement = {
    auths: [{
        "#relation": {
            attr: 'brand',
            relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
        }
    }]
};

var AppointmentBrandUserFn = function AppointmentBrandUserFn(states, hasPatientId, hasNotPatientId) {
    return {
        "#relation": {
            attr: 'organization.brand'
        },
        '#data': [{
            check: function check(_ref2) {
                var row = _ref2.row;

                if (!states.includes(row.state) || hasPatientId === true && !row.patientId || hasNotPatientId === true && row.patientId) {
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约无效', {
                        name: 'appointment',
                        operation: 'update',
                        data: row
                    });
                }
                return true;
            }
        }]
    };
};

var RecheckRootFn = function RecheckRootFn(states, msg) {
    var auth = {
        "#role": [Roles.ROOT.name]
    };
    if (states) {
        (0, _assign2.default)(auth, {
            '#data': [{
                check: function check(_ref3) {
                    var row = _ref3.row;

                    if (!states.includes(row.state)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg || '状态无效', {
                            name: 'recheck',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        });
    }
    return auth;
};

var CheckInCreateBySelfCategory = function CheckInCreateBySelfCategory(category) {
    return {
        check: function check(_ref4) {
            var user = _ref4.user,
                row = _ref4.row,
                actionData = _ref4.actionData;
            var checkIn = actionData.checkIn;

            if (checkIn.userId === user.id && checkIn.category === category) {
                return false;
            }
            return true;
        }
    };
};

var AUTH_MATRIX = {
    qiniuFile: (_qiniuFile = {}, (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile),
    trade: (_trade = {}, (0, _defineProperty3.default)(_trade, TradeAction.issueBill, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && [tradeBillState.noBill, tradeBillState.pending].includes(row.billState);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && [tradeBillState.noBill, tradeBillState.pending].includes(row.billState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeBill, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref8) {
                    var user = _ref8.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return row.billState === tradeBillState.pending;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return row.billState === tradeBillState.pending;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.financialRefund, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref11) {
                    var user = _ref11.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeCheck, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref14) {
                    var user = _ref14.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization',
                relations: [OrganizationRelation.doctor]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.cancelCheck, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref18) {
                    var user = _ref18.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization',
                relations: [OrganizationRelation.doctor]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.makeAbandoned, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref23) {
                    var user = _ref23.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row;

                    return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                }
            }]
        }, {
            '#relation': { // 内部人员可以不受流转状态限制退单
                attr: 'diagnosis.organization.brand',
                relations: insideBrandRelation
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.allocWeChatQrCode, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref26) {
                    var user = _ref26.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref27) {
                    var user = _ref27.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref28) {
                    var user = _ref28.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref29) {
                    var user = _ref29.user;

                    return {
                        userId: user.id
                    };
                }
            }]
            // '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            //     {
            //         check: ({user, row}) => {
            //             return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
            //         },
            //     }
            // ],
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
            // '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            //     {
            //         check: ({user, row}) => {
            //             return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
            //         },
            //     }
            // ],
        }, {
            '#relation': {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref30) {
                    var row = _ref30.row,
                        actionData = _ref30.actionData;
                    var trade = actionData.trade;

                    if (trade && (trade.price || trade.categoryId)) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '不允许修改价格', {
                            name: 'trade',
                            operation: 'update',
                            data: row
                        });
                    }
                    if (row.transportState !== TradeTransportState.wdd) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前状态不能修改信息', {
                            name: 'trade',
                            operation: 'update',
                            data: row
                        });
                    }
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref31) {
                    var user = _ref31.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return row.diagnosis && !row.diagnosis.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmPick, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref33) {
                    var user = _ref33.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmArriveAtShop, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref36) {
                    var user = _ref36.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.taSend, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref39) {
                    var user = _ref39.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.taPrepare, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref40) {
                    var user = _ref40.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.wdd], [TradeGetMethodId.Express])
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.wdd], [TradeGetMethodId.Express])
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.taAccept, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref41) {
                    var user = _ref41.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.taReject, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref42) {
                    var user = _ref42.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.customConfirm, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref43) {
                    var user = _ref43.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref46) {
                    var user = _ref46.user;

                    return {
                        // tradeId: workerOrder.tradeId,    // workerOrder在create时没有多层数据，这里写不出来，写到definition中
                        // trade: {
                        //     transportState: TradeTransportState.yqj,
                        // },
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }, {
            "#relation": {
                attr: ''
            }
        }]
    }), (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.remove, {
        auths: [{
            "#relation": {
                attr: 'trade.patient'
            }
        }]
    }), (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.accept, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.refuse, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.resubmit, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.patient',
                relations: [PatientRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {

                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }]
    }), _workerOrder),
    brand: (_brand = {}, (0, _defineProperty3.default)(_brand, BrandAction.update, OwnerRelationAuth), (0, _defineProperty3.default)(_brand, BrandAction.transfer, OwnerRelationAuth), (0, _defineProperty3.default)(_brand, BrandAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_brand, BrandAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row,
                        actionData = _ref51.actionData;
                    var userBrand = actionData.userBrand;

                    if (userBrand.relation === BrandRelation.owner) {
                        return {
                            relation: -1
                        };
                    }
                    if (userBrand.relation === BrandRelation.manager || userBrand === BrandRelation.customerService) {
                        return {
                            userId: user.id,
                            brandId: row.id,
                            relation: {
                                $in: [BrandRelation.owner]
                            }
                        };
                    }

                    return {
                        userId: user.id,
                        brandId: row.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_brand, BrandAction.authAbandon, OwnerRelationAuth), (0, _defineProperty3.default)(_brand, BrandAction.remove, OwnerRelationAuth), (0, _defineProperty3.default)(_brand, BrandAction.assign, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _brand),
    patient: (_patient = {}, (0, _defineProperty3.default)(_patient, PatientAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_patient, PatientAction.update, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [PatientRelation.owner]
            }
        }, {
            '#exists': [
            // {
            //     relation: 'userOrganization',
            //     condition: ({user, row}) => {
            //         return {
            //             userId: user.id,
            //         }
            //     },
            // },
            {
                relation: 'userBrand',
                condition: function condition(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_patient, PatientAction.remove, OwnerRelationAuth), (0, _defineProperty3.default)(_patient, PatientAction.acquire, AllowEveryoneAuth), (0, _defineProperty3.default)(_patient, PatientAction.authAbandon, OwnerRelationAuth), (0, _defineProperty3.default)(_patient, PatientAction.assign, AllowEveryoneAuth), _patient),
    diagnosis: (_diagnosis = {}, (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.allocWeChatQrCode, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref53) {
                    var user = _ref53.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref54) {
                    var user = _ref54.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref55) {
                    var user = _ref55.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref56) {
                    var user = _ref56.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand'
            }
        }, {
            "#relation": {
                attr: ''
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.assign, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref57) {
                    var user = _ref57.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref58) {
                    var user = _ref58.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref59) {
                    var user = _ref59.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return !row.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, (0, _defineProperty3.default)(_recheck, RecheckAction.create, {
        auths: [RecheckRootFn()]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.activate, {
        auths: [RecheckRootFn([RecheckState.inactive])]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.confirm, {
        auths: [RecheckRootFn([RecheckState.active])]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            },
            '#data': function data(_ref61) {
                var actionData = _ref61.actionData,
                    row = _ref61.row;
                var recheck = actionData.recheck;

                assert(recheck);
                var beginsAt = recheck.beginsAt || row.beginsAt;
                var endsAt = recheck.endsAt || row.endsAt;
                assert(beginsAt < endsAt);
                var allowUpdateAttrs = ['beginsAt', 'endsAt'];
                assert(xor((0, _keys2.default)(recheck), allowUpdateAttrs).length === 0);

                return true;
            }
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.complete, {
        auths: [RecheckRootFn([RecheckState.inactive, RecheckState.active, RecheckState.confirmed, RecheckState.expired])]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.expire, {
        auths: [RecheckRootFn([RecheckState.active, RecheckState.confirmed])]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.makeDead, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.remove, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), _recheck),
    record: (_record = {}, (0, _defineProperty3.default)(_record, RecordAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref62) {
                    var user = _ref62.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_record, RecordAction.update, {
        auths: [{
            '#relation': {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_record, RecordAction.remove, {
        auths: [{
            '#relation': {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), _record),
    device: (_device = {}, (0, _defineProperty3.default)(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref63) {
                    var user = _ref63.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_device, DeviceAction.update, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_device, DeviceAction.enable, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_device, DeviceAction.disable, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref65) {
                    var user = _ref65.user,
                        row = _ref65.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, (0, _defineProperty3.default)(_organization, OrganizationAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref66) {
                    var user = _ref66.user,
                        actionData = _ref66.actionData;
                    var organization = actionData.organization;

                    var query = {
                        userId: user.id,
                        brandId: organization.brandId
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.bind, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref67) {
                    var row = _ref67.row;

                    return row.name === null;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.bind, OrganizationManagement), (0, _defineProperty3.default)(_organization, OrganizationAction.remove, OrganizationManagement), (0, _defineProperty3.default)(_organization, OrganizationAction.enable, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref68) {
                    var user = _ref68.user,
                        row = _ref68.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.assign, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.authRevoke, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_organization, OrganizationAction.disable, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref69) {
                    var user = _ref69.user,
                        row = _ref69.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    transmitter: (_transmitter = {}, (0, _defineProperty3.default)(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref70) {
                    var user = _ref70.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.updateUuid, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref71) {
                    var user = _ref71.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref72) {
                    var user = _ref72.user,
                        row = _ref72.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref73) {
                    var user = _ref73.user,
                        row = _ref73.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref74) {
                    var user = _ref74.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref75) {
                    var user = _ref75.user,
                        row = _ref75.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref76) {
                    var user = _ref76.user,
                        row = _ref76.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref77) {
                    var user = _ref77.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref78) {
                    var user = _ref78.user,
                        row = _ref78.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref79) {
                    var user = _ref79.user,
                        row = _ref79.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    checkIn: (_checkIn = {}, (0, _defineProperty3.default)(_checkIn, CheckInAction.create, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }, {
            // 营业员自己打上班卡
            '#data': [CheckInCreateBySelfCategory(CheckInCategory.start)],
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.seller, BrandRelation.doctor, BrandRelation.OKGlassesDoctor, BrandRelation.visionTrainingDoctor]
            },
            '#unexists': [{
                relation: 'checkIn',
                message: '每天上班打卡只能一次',
                condition: function condition(_ref80) {
                    var user = _ref80.user,
                        actionData = _ref80.actionData;
                    var checkIn = actionData.checkIn;
                    var organizationId = checkIn.organizationId;

                    var now = new Date();
                    now.setHours(0, 0, 0, 0);
                    var query = {
                        userId: user.id,
                        time: {
                            $gt: now.valueOf()
                        }
                    };
                    return query;
                }
            }]
        }, {
            // 营业员自己打下班卡
            '#data': [CheckInCreateBySelfCategory(CheckInCategory.off)],
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.seller, BrandRelation.doctor, BrandRelation.OKGlassesDoctor, BrandRelation.visionTrainingDoctor]
            },
            '#unexists': [{
                relation: 'checkIn',
                message: '每天下班打卡只能一次',
                condition: function condition(_ref81) {
                    var user = _ref81.user,
                        actionData = _ref81.actionData;
                    var checkIn = actionData.checkIn;
                    var organizationId = checkIn.organizationId;

                    var now = new Date();
                    now.setHours(0, 0, 0, 0);
                    var query = {
                        userId: user.id,
                        time: {
                            $gt: now.valueOf()
                        },
                        category: CheckInCategory.off
                    };
                    return query;
                }
            }],
            '#exists': [{
                relation: 'checkIn',
                message: '必须先打上班卡才能打下班卡',
                condition: function condition(_ref82) {
                    var user = _ref82.user,
                        actionData = _ref82.actionData;
                    var checkIn = actionData.checkIn;
                    var organizationId = checkIn.organizationId;

                    var now = new Date();
                    now.setHours(0, 0, 0, 0);
                    var query = {
                        userId: user.id,
                        time: {
                            $gt: now.valueOf()
                        },
                        category: CheckInCategory.start
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_checkIn, CheckInAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), (0, _defineProperty3.default)(_checkIn, CheckInAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), _checkIn),
    schedule: (_schedule = {}, (0, _defineProperty3.default)(_schedule, ScheduleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref83) {
                    var user = _ref83.user;

                    // 这里brandId取不到，权限判断写在definition里
                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_schedule, ScheduleAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), (0, _defineProperty3.default)(_schedule, ScheduleAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), _schedule),
    limits: (_limits = {}, (0, _defineProperty3.default)(_limits, LimitsAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref84) {
                    var user = _ref84.user;

                    // 需要根据类型判断，且需要actionData，过于复杂放在defination中
                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.seller, BrandRelation.worker, BrandRelation.financialStuff]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_limits, LimitsAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff]
                // 具体权限需要根据actionData
            }
        }]
    }), (0, _defineProperty3.default)(_limits, LimitsAction.remove, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff]
                // 具体权限需要根据actionData
            }
        }]
    }), _limits),
    appointment: (_appointment = {}, (0, _defineProperty3.default)(_appointment, appointmentAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_appointment, appointmentAction.update, {
        auths: [{
            '#data': [{
                check: function check(_ref85) {
                    var user = _ref85.user,
                        row = _ref85.row,
                        actionData = _ref85.actionData;

                    if (!row.state === appointmentState.normal && !row.patientId) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约已失效', {
                            name: 'appointment',
                            operation: 'update',
                            data: row
                        });
                    }
                    if (actionData) {
                        var appointment = actionData.appointment;

                        var appointment2 = omit(appointment, ['patientId', 'id']);
                        if ((0, _keys2.default)(appointment2).length !== 0 || !appointment.hasOwnProperty('patientId')) {
                            return new Error('数据非法');
                        }
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.cancel, {
        auths: [AppointmentBrandUserFn([appointmentState.normal]), {
            "#relation": {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref86) {
                    var user = _ref86.user,
                        row = _ref86.row;

                    if (!row.state === appointmentState.normal) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约已失效', {
                            name: 'appointment',
                            operation: 'update',
                            data: row
                        });
                    }
                    return true;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.regist, {
        auths: [AppointmentBrandUserFn([appointmentState.normal, appointmentState.late], true)]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.makeLate, {
        auths: [AppointmentBrandUserFn([appointmentState.normal], true)]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.makeAbsent, {
        auths: [AppointmentBrandUserFn([appointmentState.normal, appointmentState.late], true)]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), _appointment),
    activity: (_activity = {}, (0, _defineProperty3.default)(_activity, activityAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref87) {
                    var actionData = _ref87.actionData,
                        user = _ref87.user;
                    var activity = actionData.activity;

                    var query = {
                        userId: user.id,
                        brandId: activity.brandId
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_activity, activityAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref88) {
                    var user = _ref88.user,
                        row = _ref88.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_activity, activityAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref89) {
                    var user = _ref89.user,
                        row = _ref89.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_activity, activityAction.restart, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref90) {
                    var user = _ref90.user,
                        row = _ref90.row;

                    return row.state === activityState.cancelled;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_activity, activityAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref91) {
                    var user = _ref91.user,
                        row = _ref91.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), _activity),
    report: (_report = {}, (0, _defineProperty3.default)(_report, reportAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref92) {
                    var user = _ref92.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_report, reportAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userBrand',
                condition: function condition(_ref93) {
                    var user = _ref93.user,
                        row = _ref93.row;

                    return {
                        userId: user.id,
                        brandId: {
                            $in: {
                                name: 'organization',
                                query: {
                                    id: {
                                        $in: {
                                            name: 'diagnosis',
                                            query: {
                                                id: {
                                                    $in: {
                                                        name: 'trade',
                                                        query: {
                                                            reportId: row.id
                                                        },
                                                        projection: 'diagnosisId'
                                                    }
                                                }
                                            },
                                            projection: 'organizationId'
                                        }
                                    }
                                },
                                projection: 'brandId'
                            }
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_report, reportAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userBrand',
                condition: function condition(_ref94) {
                    var user = _ref94.user,
                        row = _ref94.row;

                    return {
                        userId: user.id,
                        brandId: {
                            $in: {
                                name: 'organization',
                                query: {
                                    id: {
                                        $in: {
                                            name: 'diagnosis',
                                            query: {
                                                id: {
                                                    $in: {
                                                        name: 'trade',
                                                        query: {
                                                            reportId: row.id
                                                        },
                                                        projection: 'diagnosisId'
                                                    }
                                                }
                                            },
                                            projection: 'organizationId'
                                        }
                                    }
                                },
                                projection: 'brandId'
                            }
                        }
                    };
                }
            }]
        }]
    }), _report),
    question: (_question = {}, (0, _defineProperty3.default)(_question, questionAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref95) {
                    var user = _ref95.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_question, questionAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _question),
    revisit: (_revisit = {}, (0, _defineProperty3.default)(_revisit, revisitAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref96) {
                    var user = _ref96.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_revisit, revisitAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter]
            }
        }]
    }), (0, _defineProperty3.default)(_revisit, revisitAction.manage, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref97) {
                    var user = _ref97.user,
                        row = _ref97.row;

                    return [revisitState.pending].includes(row.state);
                }
            }]
        }]
    }), _revisit),
    revisitQuestion: (0, _defineProperty3.default)({}, revisitQuestionAction.update, {
        auths: [{
            "#relation": {
                attr: 'question.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }, {
            '#exists': [{
                relation: 'revisit',
                condition: function condition(_ref98) {
                    var user = _ref98.user,
                        row = _ref98.row;

                    return {
                        userId: user.id,
                        id: row.revisitId
                    };
                }
            }]
        }]
    }),
    signUp: (_signUp = {}, (0, _defineProperty3.default)(_signUp, signUpAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_signUp, signUpAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_signUp, signUpAction.cancel, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref99) {
                    var user = _ref99.user,
                        row = _ref99.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref100) {
                    var user = _ref100.user,
                        row = _ref100.row;

                    return row.state === signUpState.normal;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_signUp, signUpAction.regist, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref101) {
                    var user = _ref101.user,
                        row = _ref101.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref102) {
                    var user = _ref102.user,
                        row = _ref102.row;

                    return row.state === appointmentState.normal && !!row.patientId;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_signUp, signUpAction.allocWeChatQrCode, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref103) {
                    var user = _ref103.user,
                        row = _ref103.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _signUp),
    screening: (_screening = {}, (0, _defineProperty3.default)(_screening, screeningAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref104) {
                    var user = _ref104.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref105) {
                    var user = _ref105.user,
                        row = _ref105.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.cancel, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref106) {
                    var user = _ref106.user,
                        row = _ref106.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref107) {
                    var user = _ref107.user,
                        row = _ref107.row;

                    return row.state === screeningState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.restart, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref108) {
                    var user = _ref108.user,
                        row = _ref108.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref109) {
                    var user = _ref109.user,
                        row = _ref109.row;

                    return row.state === screeningState.cancelled;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.allocWeChatQrCode, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref110) {
                    var user = _ref110.user,
                        row = _ref110.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref111) {
                    var user = _ref111.user,
                        row = _ref111.row;

                    return row.state === screeningState.ongoing;
                }
            }]
        }]
    }), _screening),
    organizationCategory: (0, _defineProperty3.default)({}, CommonAction.create, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    })
};

var STATE_TRAN_MATRIX = {
    appointment: APPOINTMENT_STATE_TRANS_MATRIX,
    recheck: RECHECK_STATE_TRANS_MATRIX,
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
    workerOrder: WORKERORDER_STATE_TRAN_MATRIX,
    trade: TRADE_STATE_TRAN_MATRIX,
    activity: ACTIVITY_STATE_TRANS_MATRIX,
    revisit: REVISIT_STATE_TRANS_MATRIX,
    screening: SCREENING_STATE_TRANS_MATRIX,
    signUp: SIGNUP_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};