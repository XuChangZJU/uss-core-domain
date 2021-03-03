'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _checkIn, _schedule, _limits, _appointment, _activity, _report, _question, _revisit;

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

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

var _require20 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require20.action,
    TransmitterState = _require20.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require20.STATE_TRANS_MATRIX,
    TransmitterType = _require20.type;

var _require21 = require('../action'),
    AllowEveryoneAuth = _require21.AllowEveryoneAuth,
    OwnerRelationAuth = _require21.OwnerRelationAuth,
    AnyRelationAuth = _require21.AnyRelationAuth;

var _require22 = require('../../constants/lens/roles'),
    Roles = _require22.Roles;

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
            '#relation': {
                attr: 'organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && row.billState === tradeBillState.noBill;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeBill, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return row.billState === tradeBillState.pending;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.financialRefund, {
        auths: [{
            '#relation': {
                attr: 'organization.brand',
                relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.completeCheck, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization',
                relations: [OrganizationRelation.doctor]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref5) {
                    var user = _ref5.user,
                        row = _ref5.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.cancelCheck, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization',
                relations: [OrganizationRelation.doctor]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.makeAbandoned, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                }
            }]
        }, {
            '#relation': { // 内部人员可以不受流转状态限制退单
                attr: 'organization.brand',
                relations: insideBrandRelation
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.update, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return row.diagnosis && !row.diagnosis.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.updateFeedback, {
        auths: [{
            "#relation": {
                attr: 'patient'
            }
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmPick, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmArriveAtShop, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.send, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.confirmGet, {
        auths: [{
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return [TradeTransportState.yfh].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_trade, TradeAction.customConfirm, {
        auths: [{
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, (0, _defineProperty3.default)(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref19) {
                    var user = _ref19.user;

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
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

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
                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

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

                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

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
                condition: function condition(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row,
                        actionData = _ref24.actionData;
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
                condition: function condition(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_patient, PatientAction.remove, OwnerRelationAuth), (0, _defineProperty3.default)(_patient, PatientAction.acquire, AllowEveryoneAuth), (0, _defineProperty3.default)(_patient, PatientAction.authAbandon, OwnerRelationAuth), (0, _defineProperty3.default)(_patient, PatientAction.assign, AllowEveryoneAuth), _patient),
    diagnosis: (_diagnosis = {}, (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref26) {
                    var user = _ref26.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.update, {
        auths: [{
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
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.authRevoke, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_diagnosis, DiagnosisAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return !row.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, (0, _defineProperty3.default)(_recheck, RecheckAction.update, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
        }, {
            "#relation": {
                attr: 'diagnosis.patient',
                relations: [PatientRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.confirm, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.patient',
                relations: [PatientRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return row.state === RecheckState.active;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.kill, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref29) {
                    var user = _ref29.user,
                        row = _ref29.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_recheck, RecheckAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
        }]
    }), _recheck),
    record: (_record = {}, (0, _defineProperty3.default)(_record, RecordAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref31) {
                    var user = _ref31.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_record, RecordAction.update, {
        auths: [{
            '#relation': {
                attr: 'trade.organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_record, RecordAction.remove, {
        auths: [{
            '#relation': {
                attr: 'trade.organization.brand'
            }
        }]
    }), _record),
    device: (_device = {}, (0, _defineProperty3.default)(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref32) {
                    var user = _ref32.user;

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
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            }
        }]
    }), (0, _defineProperty3.default)(_device, DeviceAction.enable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_device, DeviceAction.disable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

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
                condition: function condition(_ref35) {
                    var user = _ref35.user,
                        actionData = _ref35.actionData;
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
                check: function check(_ref36) {
                    var row = _ref36.row;

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
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

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
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    transmitter: (_transmitter = {}, (0, _defineProperty3.default)(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref39) {
                    var user = _ref39.user;

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
                condition: function condition(_ref40) {
                    var user = _ref40.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref43) {
                    var user = _ref43.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref46) {
                    var user = _ref46.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    checkIn: (_checkIn = {}, (0, _defineProperty3.default)(_checkIn, CheckInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref49) {
                    var user = _ref49.user;

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
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

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
                condition: function condition(_ref51) {
                    var user = _ref51.user;

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
                condition: function condition(_ref52) {
                    var user = _ref52.user;

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
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return row.state === appointmentState.normal;
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

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
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

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
                condition: function condition(_ref56) {
                    var actionData = _ref56.actionData,
                        user = _ref56.user;
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
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

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
                check: function check(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

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
                check: function check(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

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
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), _activity),
    report: (_report = {}, (0, _defineProperty3.default)(_report, reportAction.create, {
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
    }), (0, _defineProperty3.default)(_report, reportAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.organization.brand'
            }
        }]
    }), (0, _defineProperty3.default)(_report, reportAction.remove, {
        auths: [{
            "#relation": {
                attr: 'trade.organization.brand'
            }
        }]
    }), _report),
    question: (_question = {}, (0, _defineProperty3.default)(_question, questionAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref62) {
                    var user = _ref62.user;

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
                condition: function condition(_ref63) {
                    var user = _ref63.user;

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
                check: function check(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row;

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
                condition: function condition(_ref65) {
                    var user = _ref65.user,
                        row = _ref65.row;

                    return {
                        userId: user.id,
                        id: row.revisitId
                    };
                }
            }]
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
    revisit: REVISIT_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};