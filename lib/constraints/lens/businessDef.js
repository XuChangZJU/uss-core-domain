'use strict';

var _trade, _workerOrder, _brand, _patient, _diagnosis, _recheck, _record, _device, _organization, _transmitter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */
var _require = require('../../constants/lens/trade'),
    TradeAction = _require.action,
    TradeState = _require.state,
    TradeGetMethod = _require.getMethod,
    TRADE_STATE_TRAN_MATRIX = _require.STATE_TRAN_MATRIX,
    TradeTransportState = _require.transportState;

var _require2 = require('../../constants/lens/workerOrder'),
    WorkerOrderAction = _require2.action,
    WorkerOrderState = _require2.state,
    WORKERORDER_STATE_TRAN_MATRIX = _require2.STATE_TRAN_MATRIX;

var _require3 = require('../../constants/lens/brand'),
    BrandAction = _require3.action,
    BrandRelation = _require3.relation;

var _require4 = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require4.action,
    DiagnosisState = _require4.state,
    DIAGNOSIS_STATE_TRANS_MATRIX = _require4.STATE_TRANS_MATRIX,
    DiagnosisRelation = _require4.relation;

var _require5 = require('../../constants/lens/recheck'),
    RecheckAction = _require5.action,
    RecheckState = _require5.state,
    RECHECK_STATE_TRANS_MATRIX = _require5.STATE_TRANS_MATRIX,
    RecheckRelation = _require5.relation;

var _require6 = require('../../constants/lens/record'),
    RecordAction = _require6.action,
    RecordState = _require6.state,
    RecordRelation = _require6.relation;

var _require7 = require('../../constants/lens/patient'),
    PatientAction = _require7.action,
    PatientRelation = _require7.relation;

var _require8 = require('../../constants/lens/device'),
    DeviceAction = _require8.action,
    DeviceState = _require8.state,
    DEVICE_STATE_TRANS_MATRIX = _require8.STATE_TRANS_MATRIX;

var _require9 = require('../../constants/lens/organization'),
    OrganizationAction = _require9.action,
    OrganizationState = _require9.state,
    OrganizationRelation = _require9.relation,
    ORGANIZATION_STATE_TRANS_MATRIX = _require9.STATE_TRANS_MATRIX;

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

var _require10 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require10.action,
    TransmitterState = _require10.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require10.STATE_TRANS_MATRIX,
    TransmitterType = _require10.type;

var _require11 = require('../action'),
    AllowEveryoneAuth = _require11.AllowEveryoneAuth,
    OwnerRelationAuth = _require11.OwnerRelationAuth,
    AnyRelationAuth = _require11.AnyRelationAuth;

var _require12 = require('../../constants/lens/roles'),
    Roles = _require12.Roles;

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
            attr: 'brand'
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
                attr: 'diagnosis.organization'
            }
        }]
    }), _defineProperty(_trade, TradeAction.remove, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            }
        }]
    }), _defineProperty(_trade, TradeAction.confirmArriveAtShop, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref5) {
                    var user = _ref5.user,
                        row = _ref5.row;

                    return [TradeTransportState.dqhcl, TradeTransportState.dzdjh, TradeTransportState.dfl].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
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

                    return [TradeTransportState.dqhcl, TradeTransportState.dzdjh, TradeTransportState.dfl].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself;
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

                    return [TradeTransportState.dqhcl, TradeTransportState.dzdjh, TradeTransportState.dfl].includes(row.transportState) && row.getMethod === TradeGetMethod.express;
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return [TradeTransportState.dqhcl, TradeTransportState.dzdjh, TradeTransportState.dfl].includes(row.transportState) && row.getMethod === TradeGetMethod.express;
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.getAndSendMessage, {
        auths: [{
            "#relation": {
                attr: 'diagnosis.organization.brand'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [TradeTransportState.dqj].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'diagnosis.organization'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return [TradeTransportState.dqj].includes(row.transportState);
                }
            }]
        }]
    }), _defineProperty(_trade, TradeAction.confirmGet, {
        auths: [{
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return [TradeTransportState.dqj].includes(row.transportState);
                }
            }]
        }]
    }), _trade),
    workerOrder: (_workerOrder = {}, _defineProperty(_workerOrder, WorkerOrderAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userTrade',
                needData: true,
                condition: function condition(_ref12) {
                    var user = _ref12.user,
                        actionData = _ref12.actionData;
                    var workerOrder = actionData.workerOrder;

                    return {
                        tradeId: workerOrder.tradeId,
                        userId: user.id
                    };
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userTrade',
                condition: function condition(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;
                    var tradeId = row.tradeId;
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
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }]
    }), _defineProperty(_workerOrder, WorkerOrderAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userTrade',
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

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
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

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
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return row.state === WorkerOrderState.pending;
                }
            }]
        }, {
            "#relation": {
                attr: 'trade.diagnosis.organization.brand',
                relations: [BrandRelation.owner, BrandRelation.manager]
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
    }), _defineProperty(_workerOrder, WorkerOrderAction.resubmit, {
        auths: [{
            "#relation": {
                attr: 'trade.diagnosis.patient'
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }, {
            "#relation": {},
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return [WorkerOrderState.refused].includes(row.state);
                }
            }]
        }]
    }), _workerOrder),
    brand: (_brand = {}, _defineProperty(_brand, BrandAction.update, OwnerRelationAuth), _defineProperty(_brand, BrandAction.transfer, OwnerRelationAuth), _defineProperty(_brand, BrandAction.authGrantMulti2, OwnerRelationAuth), _defineProperty(_brand, BrandAction.authRevoke, OwnerRelationAuth), _defineProperty(_brand, BrandAction.remove, OwnerRelationAuth), _brand),
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, AnyRelationAuth), _defineProperty(_patient, PatientAction.remove, OwnerRelationAuth), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.authAbandon, AnyRelationAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                needData: true,
                condition: function condition(_ref21) {
                    var user = _ref21.user,
                        actionData = _ref21.actionData;
                    var diagnosis = actionData.diagnosis;

                    var query = {
                        userId: user.id,
                        organizationId: diagnosis.organizationId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.update, AllowEveryoneAuth), _defineProperty(_diagnosis, DiagnosisAction.complete, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        organizationId: organizationId
                    };
                    return query;
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _diagnosis),
    recheck: (_recheck = {}, _defineProperty(_recheck, RecheckAction.create, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                needData: true,
                condition: function condition(_ref24) {
                    var user = _ref24.user,
                        actionData = _ref24.actionData;
                    var recheck = actionData.recheck;

                    var query = {
                        id: recheck.diagnosisId
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
                needData: true,
                condition: function condition(_ref25) {
                    var user = _ref25.user,
                        actionData = _ref25.actionData;
                    var recheck = actionData.recheck;

                    var query = {
                        id: recheck.diagnosisId
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
    }), _defineProperty(_recheck, RecheckAction.update, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;
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
                condition: function condition(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;
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
    }), _defineProperty(_recheck, RecheckAction.complete, {
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
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return row.state === RecheckState.active;
                }
            }]
        }]
    }), _defineProperty(_recheck, RecheckAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;
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
                condition: function condition(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;
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
                check: function check(_ref33) {
                    var row = _ref33.row;

                    return !row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'diagnosis',
                condition: function condition(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

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
                check: function check(_ref35) {
                    var row = _ref35.row;

                    return !!row.diagnosisId;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'device',
                condition: function condition(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;
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
                check: function check(_ref37) {
                    var row = _ref37.row;

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
                condition: function condition(_ref38) {
                    var user = _ref38.user,
                        actionData = _ref38.actionData;
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
                condition: function condition(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;
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
                condition: function condition(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;
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
                check: function check(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
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
            }],
            '#data': [{
                check: function check(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

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
                condition: function condition(_ref44) {
                    var user = _ref44.user,
                        actionData = _ref44.actionData;
                    var organization = actionData.organization;

                    var query = {
                        userId: user.id,
                        brandId: organization.brandId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.transfer, {
        auths: [{
            "#relation": {
                relations: [OrganizationRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [OrganizationRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager]
            }
        }]
    }), _defineProperty(_organization, OrganizationAction.bind, {
        auths: [{
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref45) {
                    var row = _ref45.row;

                    return row.name === null;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.update, OrganizationOwnerAndBrandWorker), _defineProperty(_organization, OrganizationAction.remove, OrganizationOwnerAndBrandWorker), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;
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
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }, {
            "#relation": {
                attr: 'brand'
            },
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
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

                    return row.state === OrganizationState.online;
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
                condition: function condition(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row,
                        actionData = _ref52.actionData;
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
                condition: function condition(_ref53) {
                    var user = _ref53.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;
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
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.bind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref57) {
                    var user = _ref57.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;
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
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref61) {
                    var user = _ref61.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref62) {
                    var user = _ref62.user,
                        row = _ref62.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userOrganization',
                condition: function condition(_ref63) {
                    var user = _ref63.user,
                        row = _ref63.row;
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
                check: function check(_ref64) {
                    var user = _ref64.user,
                        row = _ref64.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                }
            }]
        }]
    }), _transmitter)
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