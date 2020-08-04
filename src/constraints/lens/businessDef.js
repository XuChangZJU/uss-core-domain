/**
 *
 * Created by Xc on 2020/2/20.
 */
const {
    action: TradeAction,
    state: TradeState,
} = require('../../constants/lens/trade');
const {
    action: WorkerOrderAction,
    state: WorkerOrderState,
    STATE_TRAN_MATRIX: WORKERORDER_STATE_TRAN_MATRIX,
} = require('../../constants/lens/workerOrder')
const {
    action: BrandAction,
    relation: BrandRelation,
} = require('../../constants/lens/brand');
const {
    action: DiagnosisAction,
    state: DiagnosisState,
    STATE_TRANS_MATRIX: DIAGNOSIS_STATE_TRANS_MATRIX,
    relation: DiagnosisRelation,
    } = require('../../constants/lens/diagnosis');
const {
    action: RecheckAction,
    state: RecheckState,
    STATE_TRANS_MATRIX: RECHECK_STATE_TRANS_MATRIX,
    relation: RecheckRelation,
} = require('../../constants/lens/recheck');
const {
    action: RecordAction,
    state: RecordState,
    relation: RecordRelation,
    } = require('../../constants/lens/record');
const {
    action: PatientAction,
    relation: PatientRelation,
    } = require('../../constants/lens/patient');
const {
    action: DeviceAction,
    state: DeviceState,
    STATE_TRANS_MATRIX: DEVICE_STATE_TRANS_MATRIX,
    } = require('../../constants/lens/device');

const {
    action: OrganizationAction,
    state: OrganizationState,
    relation: OrganizationRelation,
    STATE_TRANS_MATRIX: ORGANIZATION_STATE_TRANS_MATRIX,
    } = require('../../constants/lens/organization');

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

const {
    action: TransmitterAction,
    state: TransmitterState,
    STATE_TRANS_MATRIX: TRANSMITTER_STATE_TRANS_MATRIX,
    type: TransmitterType,
    } = require('../../constants/lens/transmitter');

const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
    } = require('../action');

const { Roles } = require('../../constants/lens/roles');

const Jobs = {
    guardian: 1, //守护者
    administrator: 2, //管理员
    doctor: 3,
    nurse: 4,
    superAdministrator: 5, // 超级管理员
};


const RecordDeviceOrganizationWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'device',
                    needData: true,
                    condition: ({ user, actionData }) => {
                        const { record } = actionData;
                        let query = {
                            id: record.deviceId,
                        };
                        const has = {
                            name: 'userOrganization',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                organizationId: {
                                    $ref: query,
                                    $attr: 'organizationId',
                                },
                            },
                        };
                        Object.assign(query, { $has: has });

                        return query;
                    }
                }
            ],
        },
    ],
};

/**
 * 能绑定record的，可能是医院方的人，也可能是当前正在看病的病人
 * @type {{auths: *[]}}
 */
const UnboundRecordDeviceOrganizationWorkerOrPatient = {
    auths: [
        {
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
                    condition: ({ user, row }) => {
                        const { deviceId } = row;
                        let query = {
                            id: deviceId,
                        };
                        const has = {
                            name: 'userOrganization',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                organizationId: {
                                    $ref: query,
                                    $attr: 'organizationId',
                                },
                            },
                        };
                        Object.assign(query, { $has: has });

                        return query;
                    }
                }
            ],
            // '#data': [
            //     {
            //         check: ({ row }) => {
            //             return !row.diagnosisId;
            //         },
            //     }
            // ],
        },
        // {
        //     '#exists': [
        //         {
        //             relation: 'diagnosis',
        //             needData: true,
        //             condition: ({ user, row, actionData }) => {
        //                 const { record } = actionData;
        //                 let query = {
        //                     id: record.diagnosisId,
        //                     state: DiagnosisState.active,
        //                 };
        //                 const has = {
        //                     name: 'userPatient',
        //                     projection: {
        //                         id: 1,
        //                     },
        //                     query: {
        //                         userId: user.id,
        //                         patientId: {
        //                             $ref: query,
        //                             $attr: 'patientId',
        //                         },
        //                     },
        //                 };
        //                 Object.assign(query, { $has: has });
        //                 return query;
        //             },
        //         },
        //     ],
        //     '#data': [
        //         {
        //             check: ({ row }) => {
        //                 return !row.diagnosisId;
        //             },
        //         }
        //     ],
        // }
    ],
};

const OrganizationOwnerAndBrandWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userOrganization',
                    condition: ({ user, row }) => {
                        const { id: organizationId } = row;
                        const query = {
                            userId: user.id,
                            organizationId,
                        };
                        return query;
                    },
                },
            ],
        },
        {
            "#relation": {
                attr: 'brand',
            },
        },
    ],
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

const AUTH_MATRIX = {
    trade: {
        [TradeAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { trade } = actionData;
                                let query = {
                                    id: trade.diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            }
                        }
                    ]
                }
            ]
        },
        [TradeAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization',
                    },
                }
            ]
        },
        [TradeAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                }
            ]
        },
    },
    workerOrder: {
        [WorkerOrderAction.create]:{
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userTrade',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { workerOrder } = actionData;
                                return {
                                    tradeId: workerOrder.tradeId,
                                    userId: user.id,
                                }
                                // const has = {
                                //     name: 'userTrade',
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
                                //
                                // return query;
                            }
                        },
                        // {
                        //     relation: 'diagnosis',
                        //     needData: true,
                        //     condition: ({ user, actionData }) => {
                        //         const { check } = actionData;
                        //         let query = {
                        //             id: check.diagnosisId,
                        //         };
                        //         const has = {
                        //             name: 'userPatient',
                        //             projection: {
                        //                 id: 1,
                        //             },
                        //             query: {
                        //                 userId: user.id,
                        //                 workerId: {
                        //                     $ref: query,
                        //                     $attr: 'patientId',
                        //                 },
                        //             },
                        //         };
                        //         Object.assign(query, { $has: has });
                        //         return query;
                        //     }
                        // },
                    ],
                },
            ],
        },
        [WorkerOrderAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userTrade',
                            condition: ({user, row}) => {
                                const { tradeId } = row;
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
                                    userId: user.id,
                                }
                            },
                        },
                        // {
                        //     relation: 'diagnosis',
                        //     condition: ({user, row}) => {
                        //         const { diagnosisId } = row;
                        //         let query = {
                        //             id: diagnosisId,
                        //         };
                        //         const has = {
                        //             name: 'userPatient',
                        //             projection: {
                        //                 id: 1,
                        //             },
                        //             query: {
                        //                 userId: user.id,
                        //                 workerId: {
                        //                     $ref: query,
                        //                     $attr: 'patientId',
                        //                 },
                        //             },
                        //         };
                        //         Object.assign(query, { $has: has });
                        //         return query;
                        //     },
                        // },
                    ],
                }
            ],
        },
        [WorkerOrderAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userTrade',
                            condition: ({user, row}) => {
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
                                    userId: user.id,
                                }
                            },
                        },
                        // {
                        //     relation: 'diagnosis',
                        //     condition: ({user, row}) => {
                        //         const { diagnosisId } = row;
                        //         let query = {
                        //             id: diagnosisId,
                        //         };
                        //         const has = {
                        //             name: 'userPatient',
                        //             projection: {
                        //                 id: 1,
                        //             },
                        //             query: {
                        //                 userId: user.id,
                        //                 workerId: {
                        //                     $ref: query,
                        //                     $attr: 'patientId',
                        //                 },
                        //             },
                        //         };
                        //         Object.assign(query, { $has: has });
                        //         return query;
                        //     },
                        // },
                    ],
                }
            ],
        },
        [WorkerOrderAction.solve]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization',
                    },
                }
            ]
        },
        [WorkerOrderAction.resubmit]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.patient',
                    },
                }
            ]
        },
        [WorkerOrderAction.finish]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.patient',
                    },
                }
            ]
        },
    },
    brand: {
        [BrandAction.update]: OwnerRelationAuth,
        [BrandAction.transfer]: OwnerRelationAuth,
        [BrandAction.authGrantMulti2]: OwnerRelationAuth,
        [BrandAction.authRevoke]: OwnerRelationAuth,
        [BrandAction.remove]: OwnerRelationAuth,
    },
    patient: {
        [PatientAction.create]: AllowEveryoneAuth,
        [PatientAction.update]: AnyRelationAuth,
        [PatientAction.remove]: OwnerRelationAuth,
        [PatientAction.acquire]: AllowEveryoneAuth,
        [PatientAction.authAbandon]: AnyRelationAuth,
    },
    diagnosis: {
        [DiagnosisAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userPatient',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { diagnosis } = actionData;
                                const query = {
                                    userId: user.id,
                                    patientId: diagnosis.patientId,
                                };
                                return  query;
                            },
                        },
                    ],
                }
            ],
        },
        [DiagnosisAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({user, row}) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                };
                                return  query;
                            },
                        },
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === DiagnosisState.completed;
                            },
                        }
                    ],
                }
            ],
        },
        [DiagnosisAction.complete]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({user, row}) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                };
                                return  query;
                            },
                        },
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === DiagnosisState.active;
                            },
                        }
                    ],
                }
            ],
        },
    },
    recheck: {
        [RecheckAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { recheck } = actionData;
                                let query = {
                                    id: recheck.diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });

                                return query;
                            }
                        },
                        {
                            relation: 'diagnosis',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { recheck } = actionData;
                                let query = {
                                    id: recheck.diagnosisId,
                                };
                                const has = {
                                    name: 'userPatient',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        patientId: {
                                            $ref: query,
                                            $attr: 'patientId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            }
                        },
                    ],
                },
            ],
        },
        [RecheckAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userPatient',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        patientId: {
                                            $ref: query,
                                            $attr: 'patientId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
        [RecheckAction.complete]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userPatient',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        patientId: {
                                            $ref: query,
                                            $attr: 'patientId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === RecheckState.active;
                            },
                        }
                    ],
                }
            ],
        },
        [RecheckAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                const { diagnosisId } = row;
                                let query = {
                                    id: diagnosisId,
                                };
                                const has = {
                                    name: 'userPatient',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        patientId: {
                                            $ref: query,
                                            $attr: 'patientId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });
                                return query;
                            },
                        },
                    ],
                }
            ],
        },
    },
    record: {
        [RecordAction.create]: RecordDeviceOrganizationWorker,
        [RecordAction.update]: UnboundRecordDeviceOrganizationWorkerOrPatient,
        [RecordAction.bind]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({row}) => {
                                return !row.diagnosisId;
                            },
                        }
                    ],
                },
            ],
        },
        [RecordAction.unbind]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'diagnosis',
                            condition: ({user, row}) => {
                                let query = {
                                    id: row.diagnosisId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        }
                                    },
                                };
                                Object.assign(query, { $has: has });
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({row}) => {
                                return !(!row.diagnosisId);
                            },
                        }
                    ],
                },
            ],
        },
        [RecordAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'device',
                            condition: ({ user, row }) => {
                                const { deviceId } = row;
                                let query = {
                                    id: deviceId,
                                };
                                const has = {
                                    name: 'userOrganization',
                                    projection: {
                                        id: 1,
                                    },
                                    query: {
                                        userId: user.id,
                                        organizationId: {
                                            $ref: query,
                                            $attr: 'organizationId',
                                        },
                                    },
                                };
                                Object.assign(query, { $has: has });

                                return query;
                            }
                        }
                    ],
                    '#data': [
                        {
                            check: ({ row }) => {
                                return !row.diagnosisId;
                            },
                        }
                    ],
                },
            ],
        }
    },
    device: {
        [DeviceAction.create]:  {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { device } = actionData;
                                const query = {
                                    userId: user.id,
                                    organizationId: device.organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [DeviceAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [DeviceAction.enable]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === DeviceState.offline;
                        },
                    }]
                },
            ],
        },
        [DeviceAction.disable]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === DeviceState.online;
                        },
                    }]
                },
            ],
        },
    },
    organization: {
        [OrganizationAction.create]: {
            auths: [{
                '#exists': [
                    {
                        relation: 'userBrand',
                        needData: true,
                        condition: ({ user, actionData }) => {
                            const { organization } = actionData;
                            const query = {
                                userId: user.id,
                                brandId: organization.brandId,
                            };
                            return query;
                        },
                    },
                ],
            }]
        },
        [OrganizationAction.transfer]: OwnerRelationAuth,
        [OrganizationAction.authGrantMulti2]: OwnerRelationAuth,
        [OrganizationAction.bind]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.name === null;
                            },
                        },
                    ],
                },
            ],
        },
        [OrganizationAction.update]: OrganizationOwnerAndBrandWorker,
        [OrganizationAction.remove]: OrganizationOwnerAndBrandWorker,
        [OrganizationAction.enable]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({ user, row }) => {
                                const { id: organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: OrganizationRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.offline;
                        },
                    }]
                },
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.offline;
                        },
                    }]
                },
            ]
        },
        [OrganizationAction.disable]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({ user, row }) => {
                                const { id: organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: OrganizationRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.online;
                        },
                    }]
                },
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.online;
                        },
                    }]
                }]
        },
    },
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
    transmitter: {
        [TransmitterAction.create]: {
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
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            needData: true,
                            condition: ({ user, row, actionData }) => {
                                const { transmitter } = actionData;
                                const { organizationId } = transmitter;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [TransmitterAction.updateUuid]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.type === TransmitterType.esp8266;
                            },
                        }
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({ user, row }) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.type === TransmitterType.esp8266;
                            },
                        }
                    ],
                },
            ],
        },
        [TransmitterAction.bind]: {
            auths: [
                 {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return !row.deviceId && [TransmitterState.normal, TransmitterState.offline,TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({ user, row }) => {
                                const { organizationId, deviceId } = row;
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
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
            ],
        },
        [TransmitterAction.unbind]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    '#exists': [
                        {
                            relation: 'userOrganization',
                            condition: ({ user, row }) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    organizationId,
                                    relation: {
                                        $in: [OrganizationRelation.owner, OrganizationRelation.worker],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
            ],
        },
    },
};

const STATE_TRAN_MATRIX = {
    recheck: RECHECK_STATE_TRANS_MATRIX,
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
    workerOrder: WORKERORDER_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
