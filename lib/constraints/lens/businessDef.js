'use strict';

var _diagnosis, _record, _device, _organization;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */

var _require = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require.action,
    DIAGNOSIS_STATE_TRAN_MATRIX = _require.STATE_TRAN_MATRIX;

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

var PatientOwner = {
    auths: [{
        '#relation': { // 表示现有对象与user的关系
            relations: [PatientRelation.owner] // 如果没有relations，则任何关系都可以
        }
    }]
};

var DiagnosisOwner = {
    auths: [{
        '#relation': {},
        '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
        {
            check: function check(_ref) {
                var user = _ref.user,
                    row = _ref.row,
                    tables = _ref.tables;

                var userWorkerId = { $in: 'select workerId from ' + tables.userWorker + ' where userId = ' + user.id + ' and _deleteAt_ is null' };
                return userWorkerId === row.workerId;
            }
        }]
    }]
};

var RecordOwner = {
    auths: [{ //user为机构中worker
        '#relation': {},
        '#data': [{
            check: function check(_ref2) {
                var user = _ref2.user,
                    row = _ref2.row,
                    tables = _ref2.tables;

                var userOrganizationId = { $in: 'select organizationId from ' + tables.worker + ' where workerId in \n                                        (select workerId from ' + tables.userWorker + ' where userId = ' + user.id + ' and _deleteAt_ is null)\n                                        and _deleteAt_ is null'
                };
                var recordOrganizationId = { $in: 'select organizationId from ' + tables.device + ' where deviceId = ' + row.deviceId + ' and _deleteAt_ is null'
                };
                return userOrganizationId === recordOrganizationId;
            }
        }]
    }, {
        '#relation': {
            relations: [RecordRelation.owner]
        },
        '#data': [{
            check: function check(_ref3) {
                var user = _ref3.user,
                    row = _ref3.row;

                return row.state === RecordState.unbinded;
            }
        }]
    }]
};

var OrganizationOwner = {
    auths: [{
        '#relation': {},
        '#data': [{
            check: function check(_ref4) {
                var user = _ref4.user,
                    row = _ref4.row,
                    tables = _ref4.tables;

                var organizationOwnerId = { $in: 'select id from ' + tables.worker + ' where organizationId = ' + row.organizationId + ' and job in (1, 2) and _deleteAt_ is null' };
                return organizationOwnerId === user.id;
            }
        }]
    }]
};

var OrganizationWorker = {
    auth: [{
        '#relation': {
            attr: 'worker.organization',
            relation: [WorkerRelation.self]
        },
        '#data': [{
            check: function check(_ref5) {
                var user = _ref5.user,
                    row = _ref5.row,
                    tables = _ref5.tables;

                var userWorkerOrganizationId = { $in: 'select organizationId from ' + tables.worker + ' where workerId in \n                                        (select workerId from ' + tables.userWorker + ' where userId = ' + user.id + ' and _deleteAt_ is null)\n                                        and _deleteAt_ is null'
                };
                var deviceOrganizationId = { $in: 'select organizationId from ' + tables.device + ' where deviceId = ' + row.deviceId + ' and _deleteAt_ is null'
                };
                return userWorkerOrganizationId === deviceOrganizationId;
            }
        }]
    }]
};

var AUTH_MATRIX = {
    patient: _defineProperty({}, PatientAction.update, PatientOwner),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;
                    var patientId = row.patientId;

                    var query = {
                        userId: user.id,
                        patientId: patientId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_diagnosis, DiagnosisAction.update, DiagnosisOwner), _defineProperty(_diagnosis, DiagnosisAction.complete, DiagnosisOwner), _defineProperty(_diagnosis, DiagnosisAction.expire, DiagnosisOwner), _diagnosis),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;
                    var patientId = row.patientId;

                    var query = {
                        userId: user.id,
                        patientId: patientId
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userWorker',
                condition: function condition(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;
                    var workerId = row.workerId;

                    var query = {
                        userId: user.id,
                        workerId: workerId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.update, RecordOwner), _defineProperty(_record, RecordAction.remove, RecordOwner), _defineProperty(_record, RecordAction.bind, RecordOwner), _defineProperty(_record, RecordAction.expire, RecordOwner), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.enable, OrganizationWorker), _defineProperty(_device, DeviceAction.disable, OrganizationWorker), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.enable, OrganizationOwner), _defineProperty(_organization, OrganizationAction.disable, OrganizationOwner), _organization)
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