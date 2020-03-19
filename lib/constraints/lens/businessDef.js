'use strict';

var _patient, _diagnosis, _record, _device, _organization;

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

var PatientOwner = {
    auths: [{
        '#relation': {// 表示现有对象与user的关系// 如果没有relations，则任何关系都可以
        }
    }]
};

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
        '#relation': {
            attr: 'device.organization.worker',
            relations: [WorkerRelation.self]
        },
        '#data': [{
            check: function check(_ref2) {
                var user = _ref2.user,
                    row = _ref2.row,
                    tables = _ref2.tables;

                return !row.diagnosisId;
            }
        }]
    }, {
        '#exists': [{
            relation: 'userPatient',
            condition: function condition(_ref3) {
                var user = _ref3.user,
                    row = _ref3.row,
                    tables = _ref3.tables;
                var deviceId = row.deviceId;

                var query = {
                    userId: user.id,
                    patientId: {
                        $in: 'select patientId from ' + tables.diagnosis + ' where _deleteAt_ is null and organizationId in (\n                                   select organizationId from ' + tables.device + ' where _deleteAt_ is null and id = ' + deviceId + '\n                                )'
                    } // 这个用has好像目前写不出来……
                };
            }
        }],
        '#data': [{
            check: function check(_ref4) {
                var row = _ref4.row;

                return !row.diagnosisId;
            }
        }]
    }]
};

var OrganizationOwner = {
    auths: [{
        '#relation': {},
        '#data': [{
            check: function check(_ref5) {
                var user = _ref5.user,
                    row = _ref5.row,
                    tables = _ref5.tables;

                var organizationOwnerUserId = { $in: 'select userId from ' + tables.userWorker + ' where workerId in \n                        (select id from ' + tables.worker + ' where organizationId = ' + row.id + ' and jobId = 5 and _deleteAt_ is null)\n                        and _deleteAt_ is null' };
                return organizationOwnerUserId === user.id;
            }
        }]
    }]
};

var DeviceOrganizationWorker = {
    auths: [{
        '#relation': {
            attr: 'organization.worker',
            relation: [WorkerRelation.self]
        }
    }]
};

var AUTH_MATRIX = {
    patient: (_patient = {}, _defineProperty(_patient, PatientAction.create, AllowEveryoneAuth), _defineProperty(_patient, PatientAction.update, PatientOwner), _defineProperty(_patient, PatientAction.remove, PatientOwner), _patient),
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
    }), _defineProperty(_diagnosis, DiagnosisAction.update, {
        auths: [{
            '#relation': {
                attr: 'worker',
                relation: [WorkerRelation.self]
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

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
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return row.state === DiagnosisState.active;
                }
            }]
        }]
    }), _diagnosis),
    record: (_record = {}, _defineProperty(_record, RecordAction.create, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.update, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.remove, RecordDeviceOrganizationWorker), _defineProperty(_record, RecordAction.bind, UnboundRecordDeviceOrganizationWorkerOrPatient), _record),
    device: (_device = {}, _defineProperty(_device, DeviceAction.create, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.update, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.enable, DeviceOrganizationWorker), _defineProperty(_device, DeviceAction.disable, DeviceOrganizationWorker), _device),
    organization: (_organization = {}, _defineProperty(_organization, OrganizationAction.create, AllowEveryoneAuth), _defineProperty(_organization, OrganizationAction.enable, OrganizationOwner), _defineProperty(_organization, OrganizationAction.disable, OrganizationOwner), _organization)
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