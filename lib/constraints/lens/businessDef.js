'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _checkIn, _schedule, _limits, _appointment, _activity, _report, _question, _revisit, _signUp, _screening;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断
var _require = require('../../constants/lens/revisitQuestion'),
    revisitQuestionAction = _require.action;

var _require2 = require('../../constants/lens/revisit'),
    revisitAction = _require2.action,
    revisitState = _require2.state,
    REVISIT_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var _require3 = require('../../constants/lens/question'),
    questionAction = _require3.action;

var _require4 = require('../../constants/lens/report'),
    reportAction = _require4.action;

var _require5 = require('../../constants/lens/appointment'),
    appointmentAction = _require5.action,
    APPOINTMENT_STATE_TRANS_MATRIX = _require5.STATE_TRANS_MATRIX,
    appointmentState = _require5.state,
    appointmentRelation = _require5.relation;

var _require6 = require('../../constants/lens/activity'),
    activityAction = _require6.action,
    activityCategory = _require6.category,
    ACTIVITY_STATE_TRANS_MATRIX = _require6.STATE_TRANS_MATRIX,
    activityState = _require6.state;

var _require7 = require('../../constants/lens/qiniuFile'),
    qiniuFileAction = _require7.action,
    qiniuFileState = _require7.state;

var _require8 = require('../../constants/lens/checkIn'),
    CheckInAction = _require8.action,
    CheckInCategory = _require8.category;

var _require9 = require('../../constants/lens/schedule'),
    ScheduleAction = _require9.action;

var _require10 = require('../../constants/lens/limits'),
    LimitsAction = _require10.action,
    LimitsType = _require10.type;

var _require11 = require('../../constants/lens/trade'),
    TradeAction = _require11.action,
    TradeState = _require11.state,
    TradeGetMethod = _require11.getMethod,
    TRADE_STATE_TRAN_MATRIX = _require11.STATE_TRAN_MATRIX,
    TradeTransportState = _require11.transportState,
    tradeBillState = _require11.billState;

var _require12 = require('../../constants/lens/workerOrder'),
    WorkerOrderAction = _require12.action,
    WorkerOrderRelation = _require12.relation,
    WorkerOrderState = _require12.state,
    WORKERORDER_STATE_TRAN_MATRIX = _require12.STATE_TRAN_MATRIX;

var _require13 = require('../../constants/lens/brand'),
    BrandAction = _require13.action,
    BrandRelation = _require13.relation;

var _require14 = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require14.action,
    DiagnosisState = _require14.state,
    DIAGNOSIS_STATE_TRANS_MATRIX = _require14.STATE_TRANS_MATRIX,
    DiagnosisRelation = _require14.relation;

var _require15 = require('../../constants/lens/recheck'),
    RecheckAction = _require15.action,
    RecheckState = _require15.state,
    RECHECK_STATE_TRANS_MATRIX = _require15.STATE_TRANS_MATRIX;

var _require16 = require('../../constants/lens/record'),
    RecordAction = _require16.action,
    RecordState = _require16.state,
    RecordRelation = _require16.relation;

var _require17 = require('../../constants/lens/patient'),
    PatientAction = _require17.action,
    PatientRelation = _require17.relation;

var _require18 = require('../../constants/lens/device'),
    DeviceAction = _require18.action,
    DeviceState = _require18.state,
    DEVICE_STATE_TRANS_MATRIX = _require18.STATE_TRANS_MATRIX;

var _require19 = require('../../constants/lens/organization'),
    OrganizationAction = _require19.action,
    OrganizationState = _require19.state,
    OrganizationRelation = _require19.relation,
    ORGANIZATION_STATE_TRANS_MATRIX = _require19.STATE_TRANS_MATRIX;

var _require20 = require('../../constants/lens/screening'),
    screeningAction = _require20.action,
    screeningState = _require20.state,
    SCREENING_STATE_TRANS_MATRIX = _require20.STATE_TRANS_MATRIX;

var _require21 = require('../../constants/lens/signUp'),
    signUpAction = _require21.action,
    signUpState = _require21.state,
    SIGNUP_STATE_TRANS_MATRIX = _require21.STATE_TRANS_MATRIX;

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

var _require22 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require22.action,
    TransmitterState = _require22.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require22.STATE_TRANS_MATRIX,
    TransmitterType = _require22.type;

var _require23 = require('../action'),
    AllowEveryoneAuth = _require23.AllowEveryoneAuth,
    OwnerRelationAuth = _require23.OwnerRelationAuth,
    AnyRelationAuth = _require23.AnyRelationAuth;

var _require24 = require('../../constants/lens/roles'),
    Roles = _require24.Roles;

var Jobs = {
    guardian: 1, //守护者
    administrator: 2, //管理员
    doctor: 3,
    nurse: 4,
    superAdministrator: 5 // 超级管理员
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

var AUTH_MATRIX = {
    qiniuFile: (_qiniuFile = {}, (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile),
    trade: (_trade = {}, (0, _defineProperty3.default)(_trade, TradeAction.issueBill, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref) {
                    var user = _ref.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && [tradeBillState.noBill, tradeBillState.pending].includes(row.billState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeBill, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref3) {
                    var user = _ref3.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return row.billState === tradeBillState.pending;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.financialRefund, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeCheck, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref7) {
                    var user = _ref7.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

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
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.cancelCheck, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

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
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.makeAbandoned, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref14) {
                    var user = _ref14.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

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
                condition: function condition(_ref16) {
                    var user = _ref16.user;

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
                condition: function condition(_ref17) {
                    var user = _ref17.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref18) {
                    var user = _ref18.user;

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
                condition: function condition(_ref19) {
                    var user = _ref19.user;

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
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref22) {
                    var user = _ref22.user;

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
                check: function check(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    return row.diagnosis && !row.diagnosis.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.updateFeedback, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref24) {
                    var user = _ref24.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmPick, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref25) {
                    var user = _ref25.user;

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
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmArriveAtShop, {
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
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.send, {
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
        }, {
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmGet, {
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
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return [TradeTransportState.yfh].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.customConfirm, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref33) {
                    var user = _ref33.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref35) {
                    var user = _ref35.user;

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
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

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
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

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

                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

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
                condition: function condition(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row,
                        actionData = _ref40.actionData;
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
                condition: function condition(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

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
                condition: function condition(_ref42) {
                    var user = _ref42.user;

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
                condition: function condition(_ref43) {
                    var user = _ref43.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref44) {
                    var user = _ref44.user;

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
                condition: function condition(_ref45) {
                    var user = _ref45.user;

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
                condition: function condition(_ref46) {
                    var user = _ref46.user;

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
                condition: function condition(_ref47) {
                    var user = _ref47.user;

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
                condition: function condition(_ref48) {
                    var user = _ref48.user;

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
                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return !row.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, (0, _defineProperty3.default)(_recheck, RecheckAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }, {
            "#relation": {
                attr: 'trade.diagnosis.patient',
                relations: [PatientRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.confirm, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.patient',
                relations: [PatientRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return row.state === RecheckState.active;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.kill, {
        auths: [{
            '#relation': {
                attr: 'trade.diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }, {
            '#relation': {
                attr: 'trade.diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return row.state === RecheckState.expired;
                }
            }]
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
                condition: function condition(_ref53) {
                    var user = _ref53.user;

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
                condition: function condition(_ref54) {
                    var user = _ref54.user;

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
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

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
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

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
                condition: function condition(_ref57) {
                    var user = _ref57.user,
                        actionData = _ref57.actionData;
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
                check: function check(_ref58) {
                    var row = _ref58.row;

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
                check: function check(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

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
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    transmitter: (_transmitter = {}, (0, _defineProperty3.default)(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref61) {
                    var user = _ref61.user;

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
                condition: function condition(_ref62) {
                    var user = _ref62.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref63) {
                    var user = _ref63.user,
                        row = _ref63.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref65) {
                    var user = _ref65.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref66) {
                    var user = _ref66.user,
                        row = _ref66.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref67) {
                    var user = _ref67.user,
                        row = _ref67.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref68) {
                    var user = _ref68.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref69) {
                    var user = _ref69.user,
                        row = _ref69.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref70) {
                    var user = _ref70.user,
                        row = _ref70.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    checkIn: (_checkIn = {}, (0, _defineProperty3.default)(_checkIn, CheckInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref71) {
                    var user = _ref71.user;

                    // actionData取不到brandId,目前写到definition中
                    var query = {
                        userId: user.id
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
        }, {
            '#data': [{
                check: function check(_ref72) {
                    var user = _ref72.user,
                        row = _ref72.row;

                    return user.id === row.userId && row.category === CheckInCategory.off;
                }
            }]
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
                condition: function condition(_ref73) {
                    var user = _ref73.user;

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
                condition: function condition(_ref74) {
                    var user = _ref74.user;

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
    appointment: (_appointment = {}, (0, _defineProperty3.default)(_appointment, appointmentAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_appointment, appointmentAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_appointment, appointmentAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref75) {
                    var user = _ref75.user,
                        row = _ref75.row;

                    return row.state === appointmentState.normal;
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref76) {
                    var user = _ref76.user,
                        row = _ref76.row;

                    return row.state === appointmentState.normal;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_appointment, appointmentAction.regist, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref77) {
                    var user = _ref77.user,
                        row = _ref77.row;

                    return row.state === appointmentState.normal && !!row.patientId;
                }
            }]
        }]
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
                condition: function condition(_ref78) {
                    var actionData = _ref78.actionData,
                        user = _ref78.user;
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
                check: function check(_ref79) {
                    var user = _ref79.user,
                        row = _ref79.row;

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
                check: function check(_ref80) {
                    var user = _ref80.user,
                        row = _ref80.row;

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
                check: function check(_ref81) {
                    var user = _ref81.user,
                        row = _ref81.row;

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
                check: function check(_ref82) {
                    var user = _ref82.user,
                        row = _ref82.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), _activity),
    report: (_report = {}, (0, _defineProperty3.default)(_report, reportAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref83) {
                    var user = _ref83.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_report, reportAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_report, reportAction.remove, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }]
    }), _report),
    question: (_question = {}, (0, _defineProperty3.default)(_question, questionAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref84) {
                    var user = _ref84.user;

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
                condition: function condition(_ref85) {
                    var user = _ref85.user;

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
                check: function check(_ref86) {
                    var user = _ref86.user,
                        row = _ref86.row;

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
                condition: function condition(_ref87) {
                    var user = _ref87.user,
                        row = _ref87.row;

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
                condition: function condition(_ref88) {
                    var user = _ref88.user,
                        row = _ref88.row;

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
                check: function check(_ref89) {
                    var user = _ref89.user,
                        row = _ref89.row;

                    return row.state === signUpState.normal;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_signUp, signUpAction.regist, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref90) {
                    var user = _ref90.user,
                        row = _ref90.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref91) {
                    var user = _ref91.user,
                        row = _ref91.row;

                    return row.state === appointmentState.normal && !!row.patientId;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_signUp, signUpAction.allocWeChatQrCode, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref92) {
                    var user = _ref92.user,
                        row = _ref92.row;

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
                condition: function condition(_ref93) {
                    var user = _ref93.user;

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
                condition: function condition(_ref94) {
                    var user = _ref94.user,
                        row = _ref94.row;

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
                condition: function condition(_ref95) {
                    var user = _ref95.user,
                        row = _ref95.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref96) {
                    var user = _ref96.user,
                        row = _ref96.row;

                    return row.state === screeningState.ongoing;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.restart, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref97) {
                    var user = _ref97.user,
                        row = _ref97.row;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [{
                check: function check(_ref98) {
                    var user = _ref98.user,
                        row = _ref98.row;

                    return row.state === screeningState.cancelled;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_screening, screeningAction.allocWeChatQrCode, {
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
            }],
            '#data': [{
                check: function check(_ref100) {
                    var user = _ref100.user,
                        row = _ref100.row;

                    return row.state === screeningState.ongoing;
                }
            }]
        }]
    }), _screening)
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