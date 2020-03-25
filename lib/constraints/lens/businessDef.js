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

var RecordDeviceOrganizationWorker = {
    auths: [{
        '#exists': [{
            relation: 'device',
            condition: function condition(_ref) {
                var user = _ref.user,
                    row = _ref.row;
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
            condition: function condition(_ref2) {
                var user = _ref2.user,
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
                    roleId: 101
                };
                return query;
            }
        }]
    }, {
        '#exists': [{
            relation: 'userWorker',
            condition: function condition(_ref11) {
                var user = _ref11.user,
                    row = _ref11.row;
                var device = row.device;

                var query = {
                    userId: user.id,
                    worker: {
                        organizationId: device.organizationId
                    }
                };
                return query;
            }
        }]
    }]
};

var AUTH_MATRIX = {
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, OwnerRelationAuth), _defineProperty(_patient, PatientAction.remove, OwnerRelationAuth), _defineProperty(_patient, PatientAction.acquire, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.authAbandon, AnyRelationAuth), _patient),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.remove, {
        auths: [{
            '#relation': {
                attr: 'patient'
            },
            '#data': [{
                check: function check(_ref12) {
                    var user = _ref12.user,
                        row = _ref12.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref13) {
                    var user = _ref13.user,
                        row = _ref13.row;
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
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref14) {
                    var user = _ref14.user,
                        row = _ref14.row;
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
                check: function check(_ref15) {
                    var user = _ref15.user,
                        row = _ref15.row;

                    return row.state === DiagnosisState.completed;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.complete, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref16) {
                    var user = _ref16.user,
                        row = _ref16.row;
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
                check: function check(_ref17) {
                    var user = _ref17.user,
                        row = _ref17.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.link, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref18) {
                    var user = _ref18.user,
                        row = _ref18.row;

                    // link 动作中的 row 应该是 diagnosis
                    var organizationId = row.organizationId;

                    var query = {
                        userId: user.id,
                        worker: {
                            organizationId: organizationId
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _diagnosis),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.update, UnboundRecordDeviceOrganizationWorkerOrPatient), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.update, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref19) {
                    var user = _ref19.user,
                        row = _ref19.row;
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
                check: function check(_ref20) {
                    var user = _ref20.user,
                        row = _ref20.row;

                    return row.state === DeviceState.offline;
                }
            }]
        }]
    }), _defineProperty(_device, DeviceAction.disable, {
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
                check: function check(_ref22) {
                    var user = _ref22.user,
                        row = _ref22.row;

                    return row.state === DeviceState.online;
                }
            }]
        }]
    }), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.create, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.bind, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.update, OrganizationOwner), _defineProperty(_organization, OrganizationAction.remove, OrganizationOwner), _defineProperty(_organization, OrganizationAction.enable, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref23) {
                    var user = _ref23.user,
                        row = _ref23.row;
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
                check: function check(_ref24) {
                    var user = _ref24.user,
                        row = _ref24.row;

                    return row.state === OrganizationState.offline;
                }
            }]
        }]
    }), _defineProperty(_organization, OrganizationAction.disable, {
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
                            job: {
                                name: '所有者'
                            }
                        }
                    };
                    return query;
                }
            }],
            '#data': [{
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return row.state === OrganizationState.online;
                }
            }]
        }]
    }), _organization),
    worker: (_worker = {}, _defineProperty(_worker, WorkerAction.create, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.update, {
        auths: [{
            '#relation': {
                relation: [WorkerRelation.owner]
            }
        }]
    }), _defineProperty(_worker, WorkerAction.remove, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.authGrant, workerOrganizationOwner), _defineProperty(_worker, WorkerAction.transfer, {
        auths: [{
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;
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
    }), _worker),
    transmitter: (_transmitter = {}, _defineProperty(_transmitter, TransmitterAction.create, AllowEveryoneAuth), _defineProperty(_transmitter, TransmitterAction.online, transmitterDeviceOrganizationWorker), _defineProperty(_transmitter, TransmitterAction.offline, transmitterDeviceOrganizationWorker), _defineProperty(_transmitter, TransmitterAction.bind, transmitterDeviceOrganizationWorker), _defineProperty(_transmitter, TransmitterAction.unbind, transmitterDeviceOrganizationWorker), _transmitter)
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