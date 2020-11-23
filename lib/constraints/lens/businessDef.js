'use strict';

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _checkIn, _schedule, _limits;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断
var _require = require('../../constants/lens/qiniuFile'),
    qiniuFileAction = _require.action,
    qiniuFileState = _require.state;

var _require2 = require('../../constants/lens/checkIn'),
    CheckInAction = _require2.action,
    CheckInCategory = _require2.category;

var _require3 = require('../../constants/lens/schedule'),
    ScheduleAction = _require3.action;

var _require4 = require('../../constants/lens/limits'),
    LimitsAction = _require4.action,
    LimitsType = _require4.type;

var _require5 = require('../../constants/lens/trade'),
    TradeAction = _require5.action,
    TradeState = _require5.state,
    TradeGetMethod = _require5.getMethod,
    TRADE_STATE_TRAN_MATRIX = _require5.STATE_TRAN_MATRIX,
    TradeTransportState = _require5.transportState;

var _require6 = require('../../constants/lens/workerOrder'),
    WorkerOrderAction = _require6.action,
    WorkerOrderRelation = _require6.relation,
    WorkerOrderState = _require6.state,
    WORKERORDER_STATE_TRAN_MATRIX = _require6.STATE_TRAN_MATRIX;

var _require7 = require('../../constants/lens/brand'),
    BrandAction = _require7.action,
    BrandRelation = _require7.relation;

var _require8 = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require8.action,
    DiagnosisState = _require8.state,
    DIAGNOSIS_STATE_TRANS_MATRIX = _require8.STATE_TRANS_MATRIX,
    DiagnosisRelation = _require8.relation;

var _require9 = require('../../constants/lens/recheck'),
    RecheckAction = _require9.action,
    RecheckState = _require9.state,
    RECHECK_STATE_TRANS_MATRIX = _require9.STATE_TRANS_MATRIX;

var _require10 = require('../../constants/lens/record'),
    RecordAction = _require10.action,
    RecordState = _require10.state,
    RecordRelation = _require10.relation;

var _require11 = require('../../constants/lens/patient'),
    PatientAction = _require11.action,
    PatientRelation = _require11.relation;

var _require12 = require('../../constants/lens/device'),
    DeviceAction = _require12.action,
    DeviceState = _require12.state,
    DEVICE_STATE_TRANS_MATRIX = _require12.STATE_TRANS_MATRIX;

var _require13 = require('../../constants/lens/organization'),
    OrganizationAction = _require13.action,
    OrganizationState = _require13.state,
    OrganizationRelation = _require13.relation,
    ORGANIZATION_STATE_TRANS_MATRIX = _require13.STATE_TRANS_MATRIX;

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

var _require14 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require14.action,
    TransmitterState = _require14.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require14.STATE_TRANS_MATRIX,
    TransmitterType = _require14.type;

var _require15 = require('../action'),
    AllowEveryoneAuth = _require15.AllowEveryoneAuth,
    OwnerRelationAuth = _require15.OwnerRelationAuth,
    AnyRelationAuth = _require15.AnyRelationAuth;

var _require16 = require('../../constants/lens/roles'),
    Roles = _require16.Roles;

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
    trade: (_trade = {}, _defineProperty(_trade, TradeAction.makeAbandoned, {
        auths: [{
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;

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
                condition: function condition(_ref2) {
                    var user = _ref2.user;

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
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {
                attr: 'patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
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
                check: function check(_ref5) {
                    var user = _ref5.user,
                        row = _ref5.row;

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
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

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
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

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
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

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
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, _defineProperty(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

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
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

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
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

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

                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

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
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row,
                        actionData = _ref15.actionData;
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
                condition: function condition(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

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
                condition: function condition(_ref17) {
                    var user = _ref17.user;

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
                check: function check(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    return !row.userId && Date.now() - (row._createAt_ || row.createAt) < 86400000;
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
                check: function check(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

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
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

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
                condition: function condition(_ref22) {
                    var user = _ref22.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.update, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand'
            }
        }]
    }), _defineProperty(_record, RecordAction.bind, {
        auths: [{
            '#data': [{
                check: function check(_ref23) {
                    var row = _ref23.row;

                    return !row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.unbind, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [{
                check: function check(_ref24) {
                    var row = _ref24.row;

                    return row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.remove, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [{
                check: function check(_ref25) {
                    var row = _ref25.row;

                    return !row.diagnosisId;
                }
            }]
        }]
    }), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref26) {
                    var user = _ref26.user;

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
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
            }
        }]
    }), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
            },
            '#data': [{
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
            },
            '#data': [{
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

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
                condition: function condition(_ref29) {
                    var user = _ref29.user,
                        actionData = _ref29.actionData;
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
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.bind, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref30) {
                    var row = _ref30.row;

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
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.assign, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.authRevoke, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    transmitter: (_transmitter = {}, _defineProperty(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref33) {
                    var user = _ref33.user;

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
                condition: function condition(_ref34) {
                    var user = _ref34.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref37) {
                    var user = _ref37.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            },
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.unbind, {
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

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#relation': {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    checkIn: (_checkIn = {}, _defineProperty(_checkIn, CheckInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref43) {
                    var user = _ref43.user;

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
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }, {
            '#data': [{
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return user.id === row.userId && row.category === CheckInCategory.off;
                }
            }]
        }]
    }), _checkIn),
    schedule: (_schedule = {}, _defineProperty(_schedule, ScheduleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref45) {
                    var user = _ref45.user;

                    // 这里brandId取不到，权限判断写在definition里
                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker]
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
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _defineProperty(_schedule, ScheduleAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker]
            }
        }]
    }), _schedule),
    limits: (_limits = {}, _defineProperty(_limits, LimitsAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref46) {
                    var user = _ref46.user;

                    // 需要根据类型判断，且需要actionData，过于复杂放在defination中
                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.seller]
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
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
                // 具体权限需要根据actionData
            }
        }]
    }), _defineProperty(_limits, LimitsAction.remove, {
        auths: [{
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
                // 具体权限需要根据actionData
            }
        }]
    }), _limits)
};

var STATE_TRAN_MATRIX = {
    recheck: RECHECK_STATE_TRANS_MATRIX,
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
    workerOrder: WORKERORDER_STATE_TRAN_MATRIX,
    trade: TRADE_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};