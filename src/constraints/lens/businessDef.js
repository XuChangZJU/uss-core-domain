/**
 *
 * Created by Xc on 2020/2/20.
 */

const {
    action: DiagnosisAction,
    state: DiagnosisState,
    STATE_TRAN_MATRIX: DIAGNOSIS_STATE_TRAN_MATRIX,
    relation: DiagnosisRelation,
    } = require('../../constants/lens/diagnosis');
const {
    action: RecordAction,
    state: RecordState,
    relation: RecordRelation,
    STATE_TRANS_MATRIX: RECORD_STATE_TRAN_MATRIX,
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


const DiagnosisWorker = {
    auths: [
        {
            '#relation': {
                attr: 'worker',
                relation: [WorkerRelation.owner],
            },
            '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                {
                    check: ({user, row}) => {
                        return row.state === DiagnosisState.completed;
                    },
                }
            ],
        }
    ],
};


const RecordDeviceOrganizationWorker = {
    auths: [
        {
            '#exists': [
                {
                    relation: 'device',
                    condition: ({ user, row }) => {
                        const { deviceId } = row;
                        const query = {
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
                {
                    relation: 'diagnosis',
                    condition: ({ user, actionData }) => {
                        const { record } = actionData;
                        const query = {
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
                        Object.assign(query, { $has: has });
                        return query;
                    },
                },
                {
                    relation: 'device',
                    condition: ({ user, row }) => {
                        const { deviceId } = row;
                        const query = {
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
        {
            '#exists': [
                {
                    relation: 'diagnosis',
                    condition: ({ user, actionData }) => {
                        const { record } = actionData;
                        const query = {
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
                        Object.assign(query, { $has: has });
                        return query;
                    },
                },
                {
                    relation: 'device',
                    condition: ({ user, actionData ,row}) => {
                        const { diagnosis } = actionData;
                        const query = {
                            id: diagnosis.patientId,
                        };
                        const query2 = {
                            id: row.deviceId,
                        }
                        const has = {
                            name: 'userPatient',
                            projection: {
                                id: 1,
                            },
                            query: {
                                userId: user.id,
                                patientId: query.id,
                            },
                        };

                        Object.assign(query2, { $has: has });
                        return query;
                    },
                },
                /*  这里还应该表达，此record数据的device.organization和userPatient的diagnosis.organizationId相等，写不出来
                 {
                 relation: 'device',
                 condition: ({ user, row }) => {
                 const query = {
                 id: row.deviceId,
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
                 }*/
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
                                job: {
                                    name: '所有者',
                                },
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
                    condition: ({user, row}) => {
                        const {organizationId} = row;
                        const query = {
                            userId: user.id,
                            worker: {
                                organizationId,
                                job: {
                                    name: {
                                        $in: ['所有者', '守护者', '管理员'],
                                    },
                                },
                            },
                        };
                        return query;
                    },
                },
            ],
        },
    ],
};


const workerOrganizationOwner = {
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
                                job: {
                                    name: {
                                        $in: ['所有者', '守护者', '管理员'],
                                    },
                                },
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
                            roleId: 101,
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
    },
    diagnosis: {
        [DiagnosisAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userPatient',
                            condition: ({user, row}) => {
                                const { patientId } = row;
                                const query = {
                                    userId: user.id,
                                    patientId,
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
                    '#relation': {
                        attr: 'worker',
                        relation: [WorkerRelation.owner],
                    },
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
                    '#relation': {
                        attr: 'worker',
                        relation: [WorkerRelation.owner],
                    },
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
        [RecordAction.create]:  RecordDeviceOrganizationWorker,
        [RecordAction.update]: UnboundRecordDeviceOrganizationWorkerOrPatient,
        // [RecordAction.expire]: RecordOwner,   这个只有ROOT干
    },
    device: {
        [DeviceAction.create]: DeviceOrganizationWorker,
        [DeviceAction.update]: DeviceOrganizationWorker,
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
                                        job: {
                                            name: {
                                                $in: ['所有者', '守护者', '管理员'],
                                            },
                                        },
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
                                        job: {
                                            name: {
                                                $in: ['所有者', '守护者', '管理员'],
                                            },
                                        },
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
        [OrganizationAction.update]: AllowEveryoneAuth,
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
                                    job: {
                                        name: '所有者',
                                    },
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
                                    job: {
                                        name: '所有者',
                                    },
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
        [WorkerAction.create]: workerOrganizationOwner,
        [WorkerAction.update]: {
            auths: [
                {
                    '#relation': {
                        relation: [WorkerRelation.owner],
                    },
                },
            ],
        },
        [WorkerAction.remove]: workerOrganizationOwner,
        [WorkerAction.authGrant]: workerOrganizationOwner,
        [WorkerAction.link]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                // link 动作中的 row 应该是 diagnosis
                                const {id, organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        id,
                                        organizationId,
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [WorkerAction.transfer]: {
            auths: [
                {
                    '#relation': {
                        relation: [WorkerRelation.owner],
                    },
                    '#exists': [
                        {
                            relation: 'userWorker',
                            condition: ({user, row}) => {
                                const {organizationId} = row;
                                const query = {
                                    userId: user.id,
                                    worker: {
                                        organizationId,
                                        job: {
                                            name: '所有者',
                                        },
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
    },
    transmitter: {
        [TransmitterAction.create]: AllowEveryoneAuth,
        [TransmitterAction.online]: transmitterDeviceOrganizationWorker,
        [TransmitterAction.offline]: transmitterDeviceOrganizationWorker,
        [TransmitterAction.bind]: transmitterDeviceOrganizationWorker,
        [TransmitterAction.unbind]: transmitterDeviceOrganizationWorker,
    },
};

const STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRAN_MATRIX,
    record: RECORD_STATE_TRAN_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
