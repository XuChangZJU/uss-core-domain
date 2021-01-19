'use strict';

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _checkIn, _schedule, _limits, _appointment, _activity, _report, _question, _revisit;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断

var _require = require('../../constants/lens/revisitQuestion'),
    revisitQuestionAction = _require.action;

var _require2 = require('../../constants/lens/revisit'),
    revisitAction = _require2.action,
    revisitRelation = _require2.relation,
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
    TradeTransportState = _require11.transportState;

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

var OrganizationManagement = {
    auths: [{
        "#relation": {
            attr: 'brand',
            relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
        }
    }]
};

var AUTH_MATRIX = {
    qiniuFile: (_qiniuFile = {}, _defineProperty(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), _defineProperty(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile),
    trade: (_trade = {}, _defineProperty(_trade, TradeAction.financialRefund, {
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

                    return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.completeCheck, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

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
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.cancelCheck, {
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
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [TradeTransportState.checkInQueue].includes(row.transportState);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.makeAbandoned, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_trade, TradeAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref8) {
                    var user = _ref8.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.update, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return row.diagnosis && !row.diagnosis.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.updateFeedback, {
        auths: [{
            "#relation": {
                attr: 'patient'
            }
        }]
    }), _defineProperty(_trade, TradeAction.confirmPick, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.confirmArriveAtShop, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.send, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.confirmGet, {
        auths: [{
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return [TradeTransportState.yfh].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.customConfirm, {
        auths: [{
            "#relation": {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, _defineProperty(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref17) {
                    var user = _ref17.user;

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
    }), _defineProperty(_workerOrder, WorkerOrderAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand'
            }
        }, {
            "#relation": {
                attr: ''
            }
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.remove, {
        auths: [{
            "#relation": {
                attr: 'trade.patient'
            }
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.accept, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.refuse, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.resubmit, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.patient',
                relations: [PatientRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {

                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }]
    }), _workerOrder),
    brand: (_brand = {}, _defineProperty(_brand, BrandAction.update, OwnerRelationAuth), _defineProperty(_brand, BrandAction.transfer, OwnerRelationAuth), _defineProperty(_brand, BrandAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_brand, BrandAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row,
                        actionData = _ref22.actionData;
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
    }), _defineProperty(_brand, BrandAction.authAbandon, OwnerRelationAuth), _defineProperty(_brand, BrandAction.remove, OwnerRelationAuth), _defineProperty(_brand, BrandAction.assign, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _brand),
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, {
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
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_patient, PatientAction.remove, OwnerRelationAuth), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.authAbandon, OwnerRelationAuth), _defineProperty(_patient, PatientAction.assign, AllowEveryoneAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref24) {
                    var user = _ref24.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            }
        }, {
            "#relation": {
                attr: ''
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.assign, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.authRevoke, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row;

                    return !row.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, _defineProperty(_recheck, RecheckAction.update, {
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
    }), _defineProperty(_recheck, RecheckAction.confirm, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.patient',
                relations: [PatientRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return row.state === RecheckState.active;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.kill, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
        }]
    }), _recheck),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref29) {
                    var user = _ref29.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.update, {
        auths: [{
            '#relation': {
                attr: 'trade.organization.brand'
            }
        }]
    }), _defineProperty(_record, RecordAction.remove, {
        auths: [{
            '#relation': {
                attr: 'trade.organization.brand'
            }
        }]
    }), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref30) {
                    var user = _ref30.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.update, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.allocWeChatQrCode, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref33) {
                    var user = _ref33.user,
                        actionData = _ref33.actionData;
                    var organization = actionData.organization;

                    var query = {
                        userId: user.id,
                        brandId: organization.brandId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.bind, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref34) {
                    var row = _ref34.row;

                    return row.name === null;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.bind, OrganizationManagement), _defineProperty(_organization, OrganizationAction.remove, OrganizationManagement), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.assign, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.authRevoke, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    transmitter: (_transmitter = {}, _defineProperty(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref37) {
                    var user = _ref37.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.updateUuid, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref38) {
                    var user = _ref38.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref41) {
                    var user = _ref41.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref44) {
                    var user = _ref44.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    checkIn: (_checkIn = {}, _defineProperty(_checkIn, CheckInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref47) {
                    var user = _ref47.user;

                    // actionData取不到brandId,目前写到definition中
                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_checkIn, CheckInAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }, {
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return user.id === row.userId && row.category === CheckInCategory.off;
                }
            }]
        }]
    }), _checkIn),
    schedule: (_schedule = {}, _defineProperty(_schedule, ScheduleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref49) {
                    var user = _ref49.user;

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
    }), _defineProperty(_schedule, ScheduleAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), _defineProperty(_schedule, ScheduleAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff]
            }
        }]
    }), _schedule),
    limits: (_limits = {}, _defineProperty(_limits, LimitsAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref50) {
                    var user = _ref50.user;

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
    }), _defineProperty(_limits, LimitsAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff]
                // 具体权限需要根据actionData
            }
        }]
    }), _defineProperty(_limits, LimitsAction.remove, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff]
                // 具体权限需要根据actionData
            }
        }]
    }), _limits),
    appointment: (_appointment = {}, _defineProperty(_appointment, appointmentAction.create, AllowEveryoneAuth), _defineProperty(_appointment, appointmentAction.update, AllowEveryoneAuth), _defineProperty(_appointment, appointmentAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    return row.state === appointmentState.normal;
                }
            }]
        }, {
            "#relation": {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return row.state === appointmentState.normal;
                }
            }]
        }]
    }), _defineProperty(_appointment, appointmentAction.regist, {
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
        }]
    }), _appointment),
    activity: (_activity = {}, _defineProperty(_activity, activityAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref54) {
                    var actionData = _ref54.actionData,
                        user = _ref54.user;
                    var activity = actionData.activity;

                    var query = {
                        userId: user.id,
                        brandId: activity.brandId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_activity, activityAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_activity, activityAction.cancel, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.state === activityState.ongoing;
                }
            }]
        }]
    }), _defineProperty(_activity, activityAction.restart, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.state === activityState.cancelled;
                }
            }]
        }]
    }), _defineProperty(_activity, activityAction.allocWeChatQrCode, {
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
    }), _activity),
    report: (_report = {}, _defineProperty(_report, reportAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref59) {
                    var user = _ref59.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_report, reportAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand'
            }
        }]
    }), _defineProperty(_report, reportAction.remove, {
        auths: [{
            "#relation": {
                attr: 'brand'
            }
        }]
    }), _report),
    question: (_question = {}, _defineProperty(_question, questionAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref60) {
                    var user = _ref60.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_question, questionAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _question),
    revisit: (_revisit = {}, _defineProperty(_revisit, revisitAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref61) {
                    var user = _ref61.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_revisit, revisitAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter]
            }
        }]
    }), _revisit),
    revisitQuestion: _defineProperty({}, revisitQuestionAction.update, {
        auths: [{
            "#relation": {
                attr: 'question.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }, {
            '#exists': [{
                relation: 'revisit',
                condition: function condition(_ref62) {
                    var user = _ref62.user,
                        row = _ref62.row;

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