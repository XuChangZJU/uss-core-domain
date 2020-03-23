'use strict';

var _patient, _diagnosis, _record, _device, _organization, _worker;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

var _require = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require.action,
    DiagnosisState = _require.state,
    DIAGNOSIS_STATE_TRAN_MATRIX = _require.STATE_TRAN_MATRIX,
    DiagnosisRelation = _require.relation;

var _require2 = require('../../constants/lens/record'),
    RecordAction = _require2.action,
    RecordState = _require2.state,
    RecordRelation = _require2.relation,
    RECORD_STATE_TRAN_MATRIX = _require2.STATE_TRANS_MATRIX;

var _require3 = require('../../constants/lens/patient'),
    PatientAction = _require3.action,
    PatientRelation = _require3.relation;

var _require4 = require('../../constants/lens/device'),
    DeviceAction = _require4.action,
    DeviceState = _require4.state,
    DEVICE_STATE_TRANS_MATRIX = _require4.STATE_TRANS_MATRIX;

var _require5 = require('../../constants/lens/organization'),
    OrganizationAction = _require5.action,
    OrganizationState = _require5.state,
    OrganizationRelation = _require5.relation,
    ORGANIZATION_STATE_TRANS_MATRIX = _require5.STATE_TRANS_MATRIX;

var _require6 = require('../../constants/lens/worker'),
    WorkerAction = _require6.action,
    WorkerRelation = _require6.relation;

var _require7 = require('../../constants/lens/transmitter'),
    TransmitterAction = _require7.action,
    TRANSMITTER_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

var _require8 = require('../action'),
    AllowEveryoneAuth = _require8.AllowEveryoneAuth,
    OwnerRelationAuth = _require8.OwnerRelationAuth,
    AnyRelationAuth = _require8.AnyRelationAuth;

var DiagnosisWorker = {
    auths: [{
        '#relation': {
            attr: 'worker',
            relation: [WorkerRelation.self]
        },
        '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
        {
            check: function check(_ref) {
                var user = _ref.user,
                    row = _ref.row;

                return row.state === DiagnosisState.completed;
            }
        }]
    }]
};

var RecordDeviceOrganizationWorker = {
    auths: [{
        '#relation': {
            attr: 'device.organization.worker',

            relations: [WorkerRelation.self]
        }
    }]
};

/**
 * 能绑定record的，可能是医院方的人，也可能是当前正在看病的病人
 * @type {{auths: *[]}}
 */
var UnboundRecordDeviceOrganizationWorkerOrPatient = {
    auths: [{
        '#exists': [{
            relation: 'diagnosis',
            condition: function condition(_ref2) {
                var user = _ref2.user,
                    actionData = _ref2.actionData;
                var record = actionData.record;

                var query = {
                    id: record.diagnosisId
                };
                var has = {
                    name: 'userWorker',
                    projection: {
                        id: 1
                    },
                    query: {
                        userId: user.id,
                        worker: {
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    }
                };
                Object.assign(query, { $has: has });
                return query;
            }
        }, {
            relation: 'device',
            condition: function condition(_ref3) {
                var user = _ref3.user,
                    row = _ref3.row;
                var deviceId = row.deviceId;

                var query = {
                    id: deviceId
                };
                var has = {
                    name: 'userWorker',
                    projection: {
                        id: 1
                    },
                    query: {
                        userId: user.id,
                        worker: {
                            organizationId: {
                                $ref: query,
                                $attr: 'organizationId'
                            }
                        }
                    }
                };
                Object.assign(query, { $has: has });

                return query;
            }
        }],
        '#data': [{
            check: function check(_ref4) {
                var row = _ref4.row;

                return !row.diagnosisId;
            }
        }]
    }, {
        '#exists': [{
            relation: 'diagnosis',
            condition: function condition(_ref5) {
                var user = _ref5.user,
                    actionData = _ref5.actionData;
                var record = actionData.record;

                var query = {
                    id: record.diagnosisId,
                    state: DiagnosisState.active
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
        '#data': [{
            check: function check(_ref6) {
                var row = _ref6.row;

                return row.state === RecordState.unbinded;
            }
        }]
    }]
};

var OrganizationOwner = {
    auths: [{
        '#exists': [{
            relation: 'userWorker',
            condition: function condition(_ref7) {
                var user = _ref7.user,
                    row = _ref7.row;
                var organizationId = row.id;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: organizationId,
                        job: {
                            name: '所有者'
                        }
                    }
                };
                return query;
            }
        }]
    }]
};

var DeviceOrganizationWorker = {
    auths: [{
        '#exists': [{
            relation: 'userWorker',
            condition: function condition(_ref8) {
                var user = _ref8.user,
                    row = _ref8.row;
                var organizationId = row.organizationId;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: organizationId,
                        job: {
                            name: {
                                $in: ['所有者', '守护者', '管理员']
                            }
                        }
                    }
                };
                return query;
            }
        }]
    }]
};

var workerOrganizationOwner = {
    auths: [{
        '#exists': [{
            relation: 'userWorker',
            condition: function condition(_ref9) {
                var user = _ref9.user,
                    row = _ref9.row;
                var organizationId = row.organizationId;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: organizationId,
                        job: {
                            name: {
                                $in: ['所有者', '守护者', '管理员']
                            }
                        }
                    }
                };
                return query;
            }
        }]
    }]
};

var AUTH_MATRIX = {
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, { relation: PatientRelation.self }), _defineProperty(_patient, PatientAction.remove, { relation: PatientRelation.self }), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;
                    var patientId = row.patientId;

                    var query = {
                        userId: user.id,
                        patientId: patientId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.update, {
        auths: [{
            '#relation': {
                attr: 'worker',
                relation: [WorkerRelation.self]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref11) {
                    var user = _ref11.user,
                        row = _ref11.row;

                    return row.state === DiagnosisState.completed;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.complete, {
        auths: [{
            '#relation': {
                attr: 'worker',
                relation: [WorkerRelation.self]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _diagnosis),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.update, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.remove, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.bind, UnboundRecordDeviceOrganizationWorkerOrPatient), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.update, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            job: {
                                name: {
                                    $in: ['所有者', '守护者', '管理员']
                                }
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            job: {
                                name: {
                                    $in: ['所有者', '守护者', '管理员']
                                }
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.create, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.update, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.remove, OrganizationOwner), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            job: {
                                name: '所有者'
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            job: {
                                name: '所有者'
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    worker: (_worker = {}, _defineProperty(_worker, WorkerAction.create, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.update, {
        auths: [{
            '#relation': {
                relation: [WorkerRelation.self]
            }
        }]
    }), _defineProperty(_worker, WorkerAction.remove, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.authGrant, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.authConfirm, AllowEveryoneAuth), _defineProperty(_worker, WorkerAction.link, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;

                    // link 动作中的 row 应该是 diagnosis
                    var id = row.id,
                        organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            id: id,
                            organizationId: organizationId
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_worker, WorkerAction.transfer, {
        auths: [{
            '#relation': {
                relation: [WorkerRelation.self]
            },
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            job: {
                                name: '所有者'
                            }
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _worker)
};

var STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRAN_MATRIX,
    record: RECORD_STATE_TRAN_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};