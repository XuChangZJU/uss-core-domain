'use strict';

var _qiniuFile, _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter, _clockIn, _schedule, _limits;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */
var _require = require('../../constants/lens/qiniuFile'),
    qiniuFileAction = _require.action,
    qiniuFileState = _require.state;

var _require2 = require('../../constants/lens/clockIn'),
    ClockInAction = _require2.action,
    ClockInCategory = _require2.category;

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

var RecordDeviceOrganizationWorker = {
    auths: [{
        '#exists': [{
            relation: 'device',
            needData: true,
            condition: function condition(_ref) {
                var user = _ref.user,
                    actionData = _ref.actionData;
                var record = actionData.record;

                var query = {
                    id: record.deviceId
                };
                var has = {
                    name: 'userOrganization',
                    projection: {
                        id: 1
                    },
                    query: {
                        userId: user.id,
                        organizationId: {
                            $ref: query,
                            $attr: 'organizationId'
                        }
                    }
                };
                Object.assign(query, { $has: has });

                return query;
            }
        }]
    }]
};

/**
 * 能绑定record的，可能是医院方的人，也可能是当前正在看病的病人
 * @type {{auths: *[]}}
 */
var UnboundRecordDeviceOrganizationWorkerOrPatient = {
    auths: [{
        '#exists': [
        // {
        //     relation: 'diagnosis',
        //     needData: true,
        //     condition: ({ user, row, actionData }) => {
        //         const { record } = actionData;
        //         let query = {
        //             id: record.diagnosisId,
        //              state: DiagnosisState.active,
        //         };
        //         const has = {
        //             name: 'userWorker',
        //             projection: {
        //                 id: 1,
        //             },
        //             query: {
        //                 userId: user.id,
        //                 worker: {
        //                     organizationId: {
        //                         $ref: query,
        //                         $attr: 'organizationId',
        //                     }
        //                 },
        //             },
        //         };
        //         Object.assign(query, { $has: has });
        //         return query;
        //     },
        // },
        {
            relation: 'device',
            condition: function condition(_ref2) {
                var user = _ref2.user,
                    row = _ref2.row;
                var deviceId = row.deviceId;

                var query = {
                    id: deviceId
                };
                var has = {
                    name: 'userOrganization',
                    projection: {
                        id: 1
                    },
                    query: {
                        userId: user.id,
                        organizationId: {
                            $ref: query,
                            $attr: 'organizationId'
                        }
                    }
                };
                Object.assign(query, { $has: has });

                return query;
            }
        }]
        // '#data': [
        //     {
        //         check: ({ row }) => {
        //             return !row.diagnosisId;
        //         },
        //     }
        // ],
    }]
};

var OrganizationOwnerAndBrandWorker = {
    auths: [{
        '#exists': [{
            relation: 'userOrganization',
            condition: function condition(_ref3) {
                var user = _ref3.user,
                    row = _ref3.row;
                var organizationId = row.id;

                var query = {
                    userId: user.id,
                    organizationId: organizationId
                };
                return query;
            }
        }]
    }, {
        "#relation": {
            attr: 'brand',
            relations: [BrandRelation.owner, BrandRelation.manager]
        }
    }]
};
//
// const DeviceOrganizationWorker = {
//     auths: [
//         {
//             '#exists': [
//                 {
//                     relation: 'userWorker',
//                     needData: true,
//                     condition: ({ user, actionData }) => {
//                         const { device } = actionData;
//                         const query = {
//                             userId: user.id,
//                             worker: {
//                                 organizationId: device.organizationId,
//                                 jobId: {
//                                     $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
//                                 }
//                             },
//                         };
//                         return query;
//                     },
//                 },
//             ],
//         },
//     ],
// };


// const WorkerOrganizationOwner = {
//     auths: [
//         {
//             '#exists': [
//                 {
//                     relation: 'userWorker',
//                     needData: true,
//                     condition: ({ user, actionData }) => {
//                         const { worker } = actionData;
//                         const query = {
//                             userId: user.id,
//                             worker: {
//                                 organizationId: worker.organizationId,
//                                 jobId: {
//                                     $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
//                                 }
//                             },
//                         };
//                         return query;
//                     },
//                 },
//             ],
//         },
//     ],
// };

/**
 * 属于transmitter所关联的device所在的organization的worker或者用户的role为business
 * @type {{auths: [{}]}}
 */
// const transmitterDeviceOrganizationWorker = {
//     auths: [
//         {
//             '#exists': [
//                 {
//                     relation: 'userRole',
//                     condition: ({ user }) => {
//                         const query = {
//                             userId: user.id,
//                             roleId: Roles.BUSINESS.id,
//                         };
//                         return query;
//                     },
//                 },
//             ],
//             '#data': [
//                 {
//                     check: ({ user, row }) => {
//                         return [TransmitterState.normal, TransmitterState.offline].includes(row.state);
//                     },
//                 }
//             ]
//         },
//         {
//             '#exists': [
//                 {
//                     relation: 'userWorker',
//                     condition: ({ user, row }) => {
//                         const { device } = row;
//                         const query = {
//                             userId: user.id,
//                             worker: {
//                                 organizationId: device.organizationId,
//                             },
//                         };
//                         return query;
//                     },
//                 },
//             ],
//             '#data': [
//                 {
//                     check: ({ user, row }) => {
//                         return [TransmitterState.normal, TransmitterState.offline].includes(row.state);
//                     },
//                 }
//             ]
//         },
//     ],
// };

var AUTH_MATRIX = {
    qiniuFile: (_qiniuFile = {}, _defineProperty(_qiniuFile, qiniuFileAction.create, AllowEveryoneAuth), _defineProperty(_qiniuFile, qiniuFileAction.remove, AllowEveryoneAuth), _qiniuFile),
    trade: (_trade = {}, _defineProperty(_trade, TradeAction.create, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                needData: true,
                condition: function condition(_ref4) {
                    var user = _ref4.user,
                        actionData = _ref4.actionData;
                    var trade = actionData.trade;

                    var query = {
                        id: trade.diagnosisId
                    };
                    var has = {
                        name: 'userOrganization',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                    return query;
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
                check: function check(_ref5) {
                    var user = _ref5.user,
                        row = _ref5.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [TradeTransportState.wdd].includes(row.transportState);
                }
            }]
        }, {
            '#relation': {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

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
            "#relation": {}
        }]
    }), _defineProperty(_trade, TradeAction.confirmPick, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
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
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
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
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express;
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;

                    return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express;
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.confirmGet, {
        auths: [{
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return [TradeTransportState.yfh].includes(row.transportState) && row.getMethod === TradeGetMethod.express;
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, _defineProperty(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userTrade',
                needData: true,
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        actionData = _ref15.actionData;
                    var workerOrder = actionData.workerOrder;

                    return {
                        tradeId: workerOrder.tradeId,
                        trade: {
                            transportState: TradeTransportState.yqj
                        },
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.update, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization'
            }
        }, {
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
            '#exists': [{
                relation: 'userTrade',
                condition: function condition(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    // const { diagnosisId } = row;
                    // let query = {
                    //     id: diagnosisId,
                    // };
                    // const has = {
                    //     name: 'userWorker',
                    //     projection: {
                    //         id: 1,
                    //     },
                    //     query: {
                    //         userId: user.id,
                    //         workerId: {
                    //             $ref: query,
                    //             $attr: 'workerId',
                    //         },
                    //     },
                    // };
                    // Object.assign(query, { $has: has });
                    return {
                        tradeId: row.tradeId,
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.accept, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }, {
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
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
                attr: 'trade.diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }, {
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
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
    }), _defineProperty(_workerOrder, WorkerOrderAction.resubmit, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.patient',
                relations: [WorkerOrderRelation.owner]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {

                check: function check(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }]
    }), _workerOrder),
    brand: (_brand = {}, _defineProperty(_brand, BrandAction.update, OwnerRelationAuth), _defineProperty(_brand, BrandAction.transfer, OwnerRelationAuth), _defineProperty(_brand, BrandAction.authGrantMulti2, OwnerRelationAuth), _defineProperty(_brand, BrandAction.authRevoke, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row,
                        actionData = _ref23.actionData;
                    var userBrand = actionData.userBrand;


                    if (userBrand.relation === BrandRelation.owner) {
                        return {
                            relation: -1
                        };
                    }
                    if (userBrand.relation === BrandRelation.manager) {
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
                            $in: [BrandRelation.owner, BrandRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_brand, BrandAction.authAbandon, OwnerRelationAuth), _defineProperty(_brand, BrandAction.remove, OwnerRelationAuth), _brand),
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, {
        auths: [{
            "#relation": {
                relations: [PatientRelation.owner]
            }
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return {
                        userId: user.id
                    };
                }
            }, {
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
    }), _defineProperty(_patient, PatientAction.remove, OwnerRelationAuth), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.authAbandon, AnyRelationAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, AllowEveryoneAuth), _defineProperty(_diagnosis, DiagnosisAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization'
            }
        }, {
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.assign, {
        auths: [{
            "#relation": {
                attr: 'organization'
            }
        }, {
            "#relation": {
                attr: 'organization.brand'
            }
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.remove, {
        auths: [{
            "#relation": {
                attr: 'organization'
            },
            '#data': [{
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return !row.userId && Date.now() - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }, {
            "#relation": {
                attr: 'organization.brand'
            },
            '#data': [{
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return !row.userId && Date.now() - (row._createAt_ || row.createAt) < 86400000;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, _defineProperty(_recheck, RecheckAction.update, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;
                    var diagnosisId = row.diagnosisId;

                    var query = {
                        id: diagnosisId
                    };
                    var has = {
                        name: 'userOrganization',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                    return query;
                }
            }, {
                relation: 'diagnosis',
                condition: function condition(_ref29) {
                    var user = _ref29.user,
                        row = _ref29.row;
                    var diagnosisId = row.diagnosisId;

                    var query = {
                        id: diagnosisId
                    };
                    var has = {
                        name: 'userPatient',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            patientId: {
                                $ref: query,
                                $attr: 'patientId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                    return query;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.confirm, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;
                    var diagnosisId = row.diagnosisId;

                    var query = {
                        id: diagnosisId,
                        userId: user.id
                    };
                    return query;
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return row.state === RecheckState.active;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.kill, {
        auths: [{
            '#relation': {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }, {
            '#relation': {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

                    return row.state === RecheckState.expired;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;
                    var diagnosisId = row.diagnosisId;

                    var query = {
                        id: diagnosisId
                    };
                    var has = {
                        name: 'userOrganization',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                    return query;
                }
            }, {
                relation: 'diagnosis',
                condition: function condition(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;
                    var diagnosisId = row.diagnosisId;

                    var query = {
                        id: diagnosisId
                    };
                    var has = {
                        name: 'userPatient',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            patientId: {
                                $ref: query,
                                $attr: 'patientId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                    return query;
                }
            }]
        }]
    }), _recheck),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.update, UnboundRecordDeviceOrganizationWorkerOrPatient), _defineProperty(_record, RecordAction.bind, {
        auths: [{
            '#data': [{
                check: function check(_ref36) {
                    var row = _ref36.row;

                    return !row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    var query = {
                        id: row.diagnosisId
                    };
                    var has = {
                        name: 'userOrganization',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });
                }
            }],
            '#data': [{
                check: function check(_ref38) {
                    var row = _ref38.row;

                    return !!row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'device',
                condition: function condition(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;
                    var deviceId = row.deviceId;

                    var query = {
                        id: deviceId
                    };
                    var has = {
                        name: 'userOrganization',
                        projection: {
                            id: 1
                        },
                        query: {
                            userId: user.id,
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    };
                    Object.assign(query, { $has: has });

                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref40) {
                    var row = _ref40.row;

                    return !row.diagnosisId;
                }
            }]
        }]
    }), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                needData: true,
                condition: function condition(_ref41) {
                    var user = _ref41.user,
                        actionData = _ref41.actionData;
                    var device = actionData.device;

                    var query = {
                        userId: user.id,
                        organizationId: device.organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                needData: true,
                condition: function condition(_ref47) {
                    var user = _ref47.user,
                        actionData = _ref47.actionData;
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
                relations: [OrganizationRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.bind, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref48) {
                    var row = _ref48.row;

                    return row.name === null;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.update, OrganizationOwnerAndBrandWorker), _defineProperty(_organization, OrganizationAction.remove, OrganizationOwnerAndBrandWorker), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: OrganizationRelation.owner
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }, {
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.assign, {
        auths: [{
            "#relation": {}
        }, {
            "#relation": {
                attr: 'brand'
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.authRevoke, {
        auths: [{
            "#relation": {
                relations: [OrganizationRelation.owner, OrganizationRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: OrganizationRelation.owner
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }, {
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    // worker: {
    //     [WorkerAction.create]: WorkerOrganizationOwner,
    //     [WorkerAction.update]: {
    //         auths: [
    //             {
    //                 '#exists': [
    //                     {
    //                         relation: 'userWorker',
    //                         needData: true,
    //                         condition: ({ user, row, actionData }) => {
    //                             const { organizationId, jobId, id } = row;
    //                             const { worker } = actionData;
    //                             const { number, jobId: jobId2 } = worker;
    //                             if((number && !/^[0-9a-zA-Z_-]+$/.test(number)))
    //                                 throw new Error('请填写正确的工号');
    //                             if([Jobs.doctor, Jobs.nurse].includes(jobId)){
    //                                 if(jobId2 && [Jobs.doctor,Jobs.nurse].includes(jobId2)) {
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
    //                                             }
    //                                         },
    //                                     };
    //                                 }
    //                                 if(jobId2 && [Jobs.administrator].includes(jobId2)){
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian],
    //                                             }
    //                                         },
    //                                     };
    //                                 }
    //                                 if(!jobId2){
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
    //                                             }
    //                                         },
    //                                     };
    //                                 }
    //                             }
    //                             if([Jobs.administrator].includes(jobId)) {
    //                                 if(!jobId2) {
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian],
    //                                             },
    //                                         },
    //                                     };
    //                                 }
    //                                 return{
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         id,
    //                                     },
    //                                 }
    //                             }
    //                             if(!jobId2) {
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         id,
    //                                     },
    //                                 }
    //                             }
    //                             return {
    //                                 userId: -1,
    //                             }
    //                         },
    //                     },
    //                 ],
    //             },
    //             {
    //                 '#exists': [
    //                     {
    //                         relation: 'userWorker',
    //                         needData: true,
    //                         condition: ({user, row, actionData}) => {
    //                             const { worker } = actionData;
    //                             const { organizationId, jobId, id } = row;
    //                             const { number, jobId: jobId2 } = worker;
    //                             if((number && !/^[0-9a-zA-Z_-]+$/.test(number)))
    //                                 throw new Error('请填写正确的工号');
    //                             if(!jobId2 ) {
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         id
    //                                     },
    //                                 }
    //                             }
    //                             return{
    //                                 userId: -1,
    //                             }
    //                         }
    //                     }
    //                 ],
    //             },
    //         ],
    //     },
    //     [WorkerAction.remove]: {
    //         auths: [
    //             {
    //                 '#exists': [
    //                     {
    //                         relation: 'userWorker',
    //                         condition: ({user, row}) => {
    //                             const { organizationId, jobId } = row;
    //                             if(jobId === Jobs.administrator) {
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         jobId: {
    //                                             $in: [Jobs.superAdministrator, Jobs.guardian],
    //                                         }
    //                                     }
    //                                 };
    //                             }
    //                             if([Jobs.nurse, Jobs.doctor].includes(jobId)) {
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         jobId: {
    //                                             $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
    //                                         }
    //                                     },
    //                                 };
    //                             }
    //                             return {
    //                                 userId: -1,
    //                             };
    //                         },
    //                     },
    //                 ],
    //
    //             },
    //         ],
    //     },
    //     [WorkerAction.authGrantMulti]: {
    //         auths: [
    //             {
    //                 '#exists': [
    //                     {
    //                         relation: 'userWorker',
    //                         condition: ({user, row}) => {
    //                             const { organizationId ,jobId } = row;
    //                             if([Jobs.doctor, Jobs.nurse].includes(jobId)){
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         jobId: {
    //                                             $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
    //                                         }
    //                                     },
    //                                 };
    //                             }
    //                             if([Jobs.administrator].includes(jobId)){
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         jobId: {
    //                                             $in: [Jobs.superAdministrator, Jobs.guardian],
    //                                         },
    //                                     },
    //                                 };
    //                             }
    //                             return {
    //                                 userId: -1,
    //                             }
    //                         },
    //                     },
    //                 ]
    //             },
    //         ],
    //     },
    //     [WorkerAction.transfer]:
    //         {
    //             auths: [
    //                 {
    //                     '#exists': [
    //                         {
    //                             relation: 'userWorker',
    //                             condition: ({user, row}) => {
    //                                 const { organizationId, jobId } = row;
    //                                 if([Jobs.doctor, Jobs.nurse].includes(jobId)){
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
    //                                             }
    //                                         },
    //                                     };
    //                                 }
    //                                 if([Jobs.administrator].includes(jobId)){
    //                                     return {
    //                                         userId: user.id,
    //                                         worker: {
    //                                             organizationId,
    //                                             jobId: {
    //                                                 $in: [Jobs.superAdministrator, Jobs.guardian],
    //                                             },
    //                                         },
    //                                     };
    //                                 }
    //                                 return {
    //                                     userId: -1,
    //                                 }
    //                             },
    //                         },
    //                     ]
    //                 },
    //                 {
    //                     '#exists': [
    //                         {
    //                             relation: 'userWorker',
    //                             condition: ({user, row}) => {
    //                                 const {organizationId, jobId, id} = row;
    //                                 return {
    //                                     userId: user.id,
    //                                     worker: {
    //                                         organizationId,
    //                                         id,
    //                                     },
    //                                 }
    //                             }
    //                         }
    //                     ]
    //                 },
    //         ],
    //     },
    // },
    transmitter: (_transmitter = {}, _defineProperty(_transmitter, TransmitterAction.create, {
        auths: [
        // {
        //     '#exists': [
        //         {
        //             relation: 'userRole',
        //             condition: ({ user }) => {
        //                 const query = {
        //                     userId: user.id,
        //                     roleId: Roles.BUSINESS.id,
        //                 };
        //                 return query;
        //             },
        //         },
        //     ],
        // },
        {
            '#exists': [{
                relation: 'userOrganization',
                needData: true,
                condition: function condition(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row,
                        actionData = _ref55.actionData;
                    var transmitter = actionData.transmitter;
                    var organizationId = transmitter.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.updateUuid, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref56) {
                    var user = _ref56.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref60) {
                    var user = _ref60.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref61) {
                    var user = _ref61.user,
                        row = _ref61.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref62) {
                    var user = _ref62.user,
                        row = _ref62.row;
                    var organizationId = row.organizationId,
                        deviceId = row.deviceId;
                    // if (!deviceId){
                    //     return {
                    //         userId: user.id,
                    //         worker: {
                    //             jobId: {
                    //                 $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                    //             }
                    //         },
                    //     }
                    // }

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref63) {
                    var user = _ref63.user,
                        row = _ref63.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref64) {
                    var user = _ref64.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref65) {
                    var user = _ref65.user,
                        row = _ref65.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref66) {
                    var user = _ref66.user,
                        row = _ref66.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId,
                        relation: {
                            $in: [OrganizationRelation.owner, OrganizationRelation.worker]
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref67) {
                    var user = _ref67.user,
                        row = _ref67.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter),
    clockIn: (_clockIn = {}, _defineProperty(_clockIn, ClockInAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref68) {
                    var user = _ref68.user;

                    // actionData取不到brandId,目前写到definition中
                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_clockIn, ClockInAction.update, {
        auths: [{
            "#relation": {
                attr: 'organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }, {
            '#data': [{
                check: function check(_ref69) {
                    var user = _ref69.user,
                        row = _ref69.row;

                    return user.id === row.userId && row.category === ClockInCategory.off;
                }
            }]
        }]
    }), _clockIn),
    schedule: (_schedule = {}, _defineProperty(_schedule, ScheduleAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref70) {
                    var user = _ref70.user;

                    // 这里brandId取不到，权限判断写在definition里
                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
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
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService]
            }
        }]
    }), _schedule),
    limits: (_limits = {}, _defineProperty(_limits, LimitsAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userBrand',
                condition: function condition(_ref71) {
                    var user = _ref71.user;

                    // 需要根据类型判断，且需要actionData，过于复杂放在defination中
                    var query = {
                        userId: user.id,
                        relation: {
                            relation: {
                                $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.seller]
                            }
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_limits, LimitsAction.update, {
        auths: [{
            "#relation": {
                attr: 'brand'
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