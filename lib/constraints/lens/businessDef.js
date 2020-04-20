'use strict';

var _patient, _diagnosis, _record, _device, _organization, _worker, _transmitter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

var _require = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require.action,
    DiagnosisState = _require.state,
    DIAGNOSIS_STATE_TRANS_MATRIX = _require.STATE_TRANS_MATRIX,
    DiagnosisRelation = _require.relation;

var _require2 = require('../../constants/lens/record'),
    RecordAction = _require2.action,
    RecordState = _require2.state,
    RecordRelation = _require2.relation,
    RECORD_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

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
    TransmitterState = _require7.state,
    TRANSMITTER_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX,
    TransmitterType = _require7.type;

var _require8 = require('../action'),
    AllowEveryoneAuth = _require8.AllowEveryoneAuth,
    OwnerRelationAuth = _require8.OwnerRelationAuth,
    AnyRelationAuth = _require8.AnyRelationAuth;

var _require9 = require('../../constants/lens/roles'),
    Roles = _require9.Roles;

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
        }]
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
            needData: true,
            condition: function condition(_ref2) {
                var user = _ref2.user,
                    row = _ref2.row,
                    actionData = _ref2.actionData;
                var record = actionData.record;

                var query = {
                    id: record.diagnosisId,
                    state: DiagnosisState.active
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
            needData: true,
            condition: function condition(_ref5) {
                var user = _ref5.user,
                    row = _ref5.row,
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

                return !row.diagnosisId;
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
                        jobId: Jobs.superAdministrator
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
            needData: true,
            condition: function condition(_ref8) {
                var user = _ref8.user,
                    actionData = _ref8.actionData;
                var device = actionData.device;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: device.organizationId,
                        jobId: {
                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                        }
                    }
                };
                return query;
            }
        }]
    }]
};

var WorkerOrganizationOwner = {
    auths: [{
        '#exists': [{
            relation: 'userWorker',
            needData: true,
            condition: function condition(_ref9) {
                var user = _ref9.user,
                    actionData = _ref9.actionData;
                var worker = actionData.worker;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: worker.organizationId,
                        jobId: {
                            $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                        }
                    }
                };
                return query;
            }
        }]
    }]
};

/**
 * 属于transmitter所关联的device所在的organization的worker或者用户的role为business
 * @type {{auths: [{}]}}
 */
var transmitterDeviceOrganizationWorker = {
    auths: [{
        '#exists': [{
            relation: 'userRole',
            condition: function condition(_ref10) {
                var user = _ref10.user;

                var query = {
                    userId: user.id,
                    roleId: Roles.BUSINESS.id
                };
                return query;
            }
        }],
        '#data': [{
            check: function check(_ref11) {
                var user = _ref11.user,
                    row = _ref11.row;

                return [TransmitterState.normal, TransmitterState.offline].includes(row.state);
            }
        }]
    }, {
        '#exists': [{
            relation: 'userWorker',
            condition: function condition(_ref12) {
                var user = _ref12.user,
                    row = _ref12.row;
                var device = row.device;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: device.organizationId
                    }
                };
                return query;
            }
        }],
        '#data': [{
            check: function check(_ref13) {
                var user = _ref13.user,
                    row = _ref13.row;

                return [TransmitterState.normal, TransmitterState.offline].includes(row.state);
            }
        }]
    }]
};

var AUTH_MATRIX = {
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, AnyRelationAuth), _defineProperty(_patient, PatientAction.remove, OwnerRelationAuth), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.authAbandon, AnyRelationAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                needData: true,
                condition: function condition(_ref14) {
                    var user = _ref14.user,
                        actionData = _ref14.actionData;
                    var diagnosis = actionData.diagnosis;

                    var query = {
                        userId: user.id,
                        patientId: diagnosis.patientId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;
                    var organizationId = row.organizationId,
                        workerId = row.workerId;

                    var query = {
                        userId: user.id,
                        worker: {
                            id: workerId,
                            organizationId: organizationId
                        }
                    };
                    return query;
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;

                    return row.state === DiagnosisState.completed;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.complete, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId
                        }
                    };
                    return query;
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _diagnosis),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.update, UnboundRecordDeviceOrganizationWorkerOrPatient), _defineProperty(_record, RecordAction.remove, {
        auths: [{
            '#role': [Roles.ROOT.name]
        }]
    }), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                needData: true,
                condition: function condition(_ref19) {
                    var user = _ref19.user,
                        actionData = _ref19.actionData;
                    var device = actionData.device;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: device.organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref21) {
                    var user = _ref21.user,
                        row = _ref21.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.create, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.bind, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.update, OrganizationOwner), _defineProperty(_organization, OrganizationAction.remove, OrganizationOwner), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref25) {
                    var user = _ref25.user,
                        row = _ref25.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: Jobs.superAdministrator
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;
                    var organizationId = row.id;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: Jobs.superAdministrator
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref28) {
                    var user = _ref28.user,
                        row = _ref28.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    worker: (_worker = {}, _defineProperty(_worker, WorkerAction.create, WorkerOrganizationOwner), _defineProperty(_worker, WorkerAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                needData: true,
                condition: function condition(_ref29) {
                    var user = _ref29.user,
                        row = _ref29.row,
                        actionData = _ref29.actionData;
                    var organizationId = row.organizationId,
                        jobId = row.jobId,
                        id = row.id;
                    var worker = actionData.worker;
                    var number = worker.number,
                        jobId2 = worker.jobId;

                    if (number && !/^[0-9a-zA-Z_-]+$/.test(number)) throw new Error('请填写正确的工号');
                    if ([Jobs.doctor, Jobs.nurse].includes(jobId)) {
                        if (jobId2 && [Jobs.doctor, Jobs.nurse].includes(jobId2)) {
                            return {
                                userId: user.id,
                                worker: {
                                    organizationId: organizationId,
                                    jobId: {
                                        $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                                    }
                                }
                            };
                        }
                        if (jobId2 && [Jobs.administrator].includes(jobId2)) {
                            return {
                                userId: user.id,
                                worker: {
                                    organizationId: organizationId,
                                    jobId: {
                                        $in: [Jobs.superAdministrator, Jobs.guardian]
                                    }
                                }
                            };
                        }
                        if (!jobId2) {
                            return {
                                userId: user.id,
                                worker: {
                                    organizationId: organizationId,
                                    jobId: {
                                        $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                                    }
                                }
                            };
                        }
                    }
                    if ([Jobs.administrator].includes(jobId)) {
                        if (!jobId2) {
                            return {
                                userId: user.id,
                                worker: {
                                    organizationId: organizationId,
                                    jobId: {
                                        $in: [Jobs.superAdministrator, Jobs.guardian]
                                    }
                                }
                            };
                        }
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                id: id
                            }
                        };
                    }
                    if (!jobId2) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                id: id
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                needData: true,
                condition: function condition(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row,
                        actionData = _ref30.actionData;
                    var worker = actionData.worker;
                    var organizationId = row.organizationId,
                        jobId = row.jobId,
                        id = row.id;
                    var number = worker.number,
                        jobId2 = worker.jobId;

                    if (number && !/^[0-9a-zA-Z_-]+$/.test(number)) throw new Error('请填写正确的工号');
                    if (!jobId2) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                id: id
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), _defineProperty(_worker, WorkerAction.remove, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;
                    var organizationId = row.organizationId,
                        jobId = row.jobId;

                    if (jobId === Jobs.administrator) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian]
                                }
                            }
                        };
                    }
                    if ([Jobs.nurse, Jobs.doctor].includes(jobId)) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                                }
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]

        }]
    }), _defineProperty(_worker, WorkerAction.authGrantMulti, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref32) {
                    var user = _ref32.user,
                        row = _ref32.row;
                    var organizationId = row.organizationId,
                        jobId = row.jobId;

                    if ([Jobs.doctor, Jobs.nurse].includes(jobId)) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                                }
                            }
                        };
                    }
                    if ([Jobs.administrator].includes(jobId)) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian]
                                }
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), _defineProperty(_worker, WorkerAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;
                    var organizationId = row.organizationId,
                        jobId = row.jobId;

                    if ([Jobs.doctor, Jobs.nurse].includes(jobId)) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                                }
                            }
                        };
                    }
                    if ([Jobs.administrator].includes(jobId)) {
                        return {
                            userId: user.id,
                            worker: {
                                organizationId: organizationId,
                                jobId: {
                                    $in: [Jobs.superAdministrator, Jobs.guardian]
                                }
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;
                    var organizationId = row.organizationId,
                        jobId = row.jobId,
                        id = row.id;

                    return {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            id: id
                        }
                    };
                }
            }]
        }]
    }), _worker),
    transmitter: (_transmitter = {}, _defineProperty(_transmitter, TransmitterAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref35) {
                    var user = _ref35.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
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

                    return row.type === TransmitterType.esp8266;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }],
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

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

                    return !row.deviceId && [TransmitterState.normal, TransmitterState.offline].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_transmitter, TransmitterAction.unbind, {
        auths: [{
            '#exists': [{
                relation: 'userRole',
                condition: function condition(_ref45) {
                    var user = _ref45.user;

                    var query = {
                        userId: user.id,
                        roleId: Roles.BUSINESS.id
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline].includes(row.state);
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId,
                            jobId: {
                                $in: [Jobs.superAdministrator, Jobs.guardian, Jobs.administrator]
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return row.deviceId && [TransmitterState.normal, TransmitterState.offline].includes(row.state);
                }
            }]
        }]
    }), _transmitter)
};

var STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    record: RECORD_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};