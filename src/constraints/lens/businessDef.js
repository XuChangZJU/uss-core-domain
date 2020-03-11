/**
 *
 * Created by Xc on 2020/2/20.
 */
const {
    action: CommonAction,
    state: CommonState,
    STATE_TRAN_MATRIX: COMMON_STATE_TRAN_MATRIX,
} = require('../../constants/lens/common');
const {
    action: DiagnosisAction,
    STATE_TRAN_MATRIX: DIAGNOSIS_STATE_TRAN_MATRIX,
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

const PatientOwner = {
    auths: [
        {
            '#relation': {              // 表示现有对象与user的关系
                relations: [PatientRelation.owner],         // 如果没有relations，则任何关系都可以
            },
        },
    ],
};

const DiagnosisOwner = {
    auths: [
        {
            '#relation': {
            },
            '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                {
                    check: ({user, row, tables}) => {
                        const userWorkerId = {$in: `select workerId from ${tables.userWorker} where userId = ${user.id} and _deleteAt_ is null`}
                        return userWorkerId === row.workerId;
                    },
                }
            ],
        }
    ]
}

const RecordOwner = {
    auths: [
        {                                           //user为机构中worker
            '#relation': {
            },
            '#data': [
                {
                    check: ({user, row, tables}) => {
                        const userOrganizationId = {$in:`select organizationId from ${tables.worker} where workerId in 
                                        (select workerId from ${tables.userWorker} where userId = ${user.id} and _deleteAt_ is null)
                                        and _deleteAt_ is null`,
                        };
                        const recordOrganizationId = {$in:`select organizationId from ${tables.device} where deviceId = ${row.deviceId} and _deleteAt_ is null`,
                        };
                        return userOrganizationId === recordOrganizationId;
                    }
                }
            ],
        },
        {
            '#relation': {
                relations: [RecordRelation.owner],
            },
            '#data': [
                {
                    check: ({user, row}) => {
                        return row.state === RecordState.unbinded;
                    }
                }
            ]
        },
    ]
}

const AUTH_MATRIX = {
    patient: {
        [PatientAction.update]: PatientOwner,
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
        [DiagnosisAction.update]: DiagnosisOwner,
        [DiagnosisAction.complete]: DiagnosisOwner,
        [DiagnosisAction.expire]: DiagnosisOwner,
    },
    record: {
        [RecordAction.create]:  {
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
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userWorker' ,
                            condition: ({user, row}) => {
                                const { workerId } = row;
                                const query = {
                                    userId: user.id,
                                    workerId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [RecordAction.update]: RecordOwner,
        [RecordAction.remove]: RecordOwner,
        [RecordAction.bind]: RecordOwner,
        [RecordAction.expire]: RecordOwner,
    }
}

const STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRAN_MATRIX,
    record: RECORD_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};