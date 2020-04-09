/**
 *
 * Created by Xc on 2020/2/20.
 */

const {
    action: DiagnosisAction,
    state: DiagnosisState,
    STATE_TRANS_MATRIX: DIAGNOSIS_STATE_TRANS_MATRIX,
    relation: DiagnosisRelation,
    } = require('../../constants/lens/diagnosis');
const {
    action: RecordAction,
    state: RecordState,
    relation: RecordRelation,
    STATE_TRANS_MATRIX: RECORD_STATE_TRANS_MATRIX,
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

const {
    action: WorkerAction,
    relation: WorkerRelation,
    } = require('../../constants/lens/worker');

const {
    action: TransmitterAction,
    STATE_TRANS_MATRIX: TRANSMITTER_STATE_TRANS_MATRIX,
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
        // {
        //     '#exists': [
        //         {
        //             relation: 'device',
        //             needData: true,
        //             condition: ({ user, actionData }) => {
        //                 const { record } = actionData;
        //                 let query = {
        //                     id: record.deviceId,
        //                 };
        //                 const has = {
        //                     name: 'userWorker',
        //                     projection: {
        //                         id: 1,
        //                     },
        //                     query: {
        //                         userId: user.id,
        //                         worker: {
        //                             organizationId: {
        //                                 $ref: query,
        //                                 $attr: 'organizationId',
        //                             },
        //                         },
        //                     },
        //                 };
        //                 query = Object.assign({}, query, { $has: has });
        //
        //                 return query;
        //             }
        //         }
        //     ],
        // },
        {
            '#exists': [
                {
                    relation: 'userWorker',
                    needData: true,
                    condition: ({ user, actionData }) => {
                        const { device } = actionData;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId: device.organizationId,
                            },
                        };
                        return query;
                    },
                },
            ],
        }
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
                {
                    relation: 'diagnosis',
                    needData: true,
                    condition: ({ user, row, actionData }) => {
                        const { record } = actionData;
                        let query = {
                            id: record.diagnosisId,
                            state: DiagnosisState.active,
                        };
                        const has = {
                            name: 'userWorker',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                worker: {
                                    organizationId: {
                                        $ref: query,
                                        $attr: 'organizationId',
                                    }
                                },
                            },
                        };
                        query = Object.assign({}, query, { $has: has });
                        return query;
                    },
                },
                {
                    relation: 'device',
                    condition: ({ user, row }) => {
                        const { deviceId } = row;
                        let query = {
                            id: deviceId,
                        };
                        const has = {
                            name: 'userWorker',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                worker: {
                                    organizationId: {
                                        $ref: query,
                                        $attr: 'organizationId',
                                    },
                                },
                            },
                        };
                        query = Object.assign({}, query, { $has: has });

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
        {
            '#exists': [
                {
                    relation: 'diagnosis',
                    needData: true,
                    condition: ({ user, row, actionData }) => {
                        const { record } = actionData;
                        let query = {
                            id: record.diagnosisId,
                            state: DiagnosisState.active,
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
                        query = Object.assign({}, query, { $has: has });
                        return query;
                    },
                },
            ],
            '#data': [
                {
                    check: ({ row }) => {
                        return !row.diagnosisId;
                    },
                }
            ],
        }
    ],
};

const OrganizationOwner = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userWorker',
                    condition: ({ user, row }) => {
                        const { id: organizationId } = row;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId,
                                jobId: Jobs.superAdministrator
                            },
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};

const DeviceOrganizationWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userWorker',
                    needData: true,
                    condition: ({ user, actionData }) => {
                        const { device } = actionData;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId: device.organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                }
                            },
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};


const WorkerOrganizationOwner = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'userWorker',
                    needData: true,
                    condition: ({ user, actionData }) => {
                        const { worker } = actionData;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId: worker.organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                }
                            },
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};

/**
 * 属于transmitter所关联的device所在的organization的worker或者用户的role为business
 * @type {{auths: [{}]}}
 */
const transmitterDeviceOrganizationWorker = {
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
        },
        {
            '#exists': [
                {
                    relation: 'userWorker',
                    condition: ({ user, row }) => {
                        const { device } = row;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId: device.organizationId,
                            },
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};

const AUTH_MATRIX = {
    patient: {
        [PatientAction.create]: AllowEveryoneAuth,
        [PatientAction.update]: OwnerRelationAuth,
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
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const { organizationId, workerId } = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        id: workerId,
                                        organizationId,
                                    },
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
                            relation: 'userWorker',
                            condition: ({ user, row }) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                    },
                                };
                                return query;
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
    record: {
        [RecordAction.create]: RecordDeviceOrganizationWorker,
        [RecordAction.update]: UnboundRecordDeviceOrganizationWorkerOrPatient,
        [RecordAction.remove]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                },
            ],
        },
    },
    device: {
        [DeviceAction.create]:  {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { device } = actionData;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId: device.organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
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
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
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
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
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
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
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
        [OrganizationAction.create]: AllowEveryoneAuth,
        [OrganizationAction.bind]: AllowEveryoneAuth,
        [OrganizationAction.update]: OrganizationOwner,
        [OrganizationAction.remove]: OrganizationOwner,
        [OrganizationAction.enable]: {
            auths: [{
                '#exists': [
                    {
                        relation: 'userWorker',
                        condition: ({ user, row }) => {
                            const { id: organizationId } = row;
                            const query = {
                                userId: user.id,
                                worker: {
                                    organizationId,
                                    jobId: Jobs.superAdministrator
                                },
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
            }]
        },
        [OrganizationAction.disable]: {
            auths: [{
                '#exists': [
                    {
                        relation: 'userWorker',
                        condition: ({ user, row }) => {
                            const { id: organizationId } = row;
                            const query = {
                                userId: user.id,
                                worker: {
                                    organizationId,
                                    jobId: Jobs.superAdministrator
                                },
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
            }]
        },
    },
    worker: {
        [WorkerAction.create]: WorkerOrganizationOwner,
        [WorkerAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            needData: true,
                            condition: ({ user, row, actionData }) => {
                                const { id } = row;
                                const { worker = {} } = actionData;
                                const { number } = worker;
                                if( number && /^[0-9a-zA-Z_-]+$/.test(number))
                                    throw new Error('请填写正确的工号');
                                return {
                                    userId: user.id,
                                    workerId: id,
                                };
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            needData: true,
                            condition: ({ user, row, actionData }) => {
                                const { organizationId, jobId } = row;
                                const { worker = {} } = actionData;
                                const { number } = worker;
                                if( number && /^[0-9a-zA-Z_-]+$/.test(number))
                                    throw new Error('请填写正确的工号');
                                if([Jobs.doctor, Jobs.nurse].includes(jobId)){
                                    return {
                                        userId: user.id,
                                        worker: {
                                            organizationId,
                                            jobId: {
                                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                            }
                                        },
                                    };
                                }
                                if([Jobs.administrator].includes(jobId)){
                                    return {
                                        userId: user.id,
                                        worker: {
                                            organizationId,
                                            jobId: {
                                                $in: [Jobs.superAdministrator, Jobs.guardian],
                                            },
                                        },
                                    };
                                }
                            },
                        },
                    ],
                }
            ],
        },
        [WorkerAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const { organizationId, jobId } = row;
                                if(jobId === Jobs.administrator)
                                    return {
                                        userId: user.id,
                                        worker: {
                                            organizationId,
                                            jobId: {
                                                $in: [Jobs.superAdministrator, Jobs.guardian],
                                            }
                                        }
                                    };
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                        check: ({ user, row }) => {
                            return ![Jobs.superAdministrator, Jobs.guardian].includes(row.jobId);
                        },
                    }
                    ]
                },
            ],
        },
        [WorkerAction.authGrantMulti]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const { organizationId } = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        jobId: {
                                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                        }
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [WorkerAction.transfer]:
            {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            condition: ({ user, row, actionData }) => {
                                const { organizationId,jobId } = row;
                                if([Jobs.doctor, Jobs.nurse].includes(jobId)){
                                    return {
                                        userId: user.id,
                                        worker: {
                                            organizationId,
                                            jobId: {
                                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator],
                                            }
                                        },
                                    };
                                }
                                if([Jobs.administrator].includes(jobId)){
                                    return {
                                        userId: user.id,
                                        worker: {
                                            organizationId,
                                            jobId: {
                                                $in: [Jobs.superAdministrator, jobId],
                                            },
                                        },
                                    };
                                }
                            },
                        },
                    ],
                },
                {
                    '#relation': {
                        relations: [WorkerRelation.owner],
                    },
                },
            ],
        },
    },
    transmitter: {
        [TransmitterAction.create]: AllowEveryoneAuth,
        [TransmitterAction.bind]: transmitterDeviceOrganizationWorker,
        [TransmitterAction.unbind]: transmitterDeviceOrganizationWorker,
        [TransmitterAction.updateUuid]: transmitterDeviceOrganizationWorker,
    },
};

const STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    record: RECORD_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
