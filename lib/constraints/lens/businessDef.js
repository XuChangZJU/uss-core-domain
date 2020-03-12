'use strict';

var _diagnosis, _record;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * Created by Xc on 2020/2/20.
 */
var _require = require('../../constants/lens/common'),
    CommonAction = _require.action,
    CommonState = _require.state,
    COMMON_STATE_TRAN_MATRIX = _require.STATE_TRAN_MATRIX;

var _require2 = require('../../constants/lens/diagnosis'),
    DiagnosisAction = _require2.action,
    DIAGNOSIS_STATE_TRAN_MATRIX = _require2.STATE_TRAN_MATRIX;

var _require3 = require('../../constants/lens/record'),
    RecordAction = _require3.action,
    RecordState = _require3.state,
    RecordRelation = _require3.relation,
    RECORD_STATE_TRAN_MATRIX = _require3.STATE_TRANS_MATRIX;

var _require4 = require('../../constants/lens/patient'),
    PatientAction = _require4.action,
    PatientRelation = _require4.relation;

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

var AUTH_MATRIX = {
    patient: _defineProperty({}, PatientAction.update, PatientOwner),
    diagnosis: (_diagnosis = {}, _defineProperty(_diagnosis, DiagnosisAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userPatient',
                condition: function condition(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;
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
                condition: function condition(_ref5) {
                    var user = _ref5.user,
                        row = _ref5.row;
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
                condition: function condition(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;
                    var workerId = row.workerId;

                    var query = {
                        userId: user.id,
                        workerId: workerId
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_record, RecordAction.update, RecordOwner), _defineProperty(_record, RecordAction.remove, RecordOwner), _defineProperty(_record, RecordAction.bind, RecordOwner), _defineProperty(_record, RecordAction.expire, RecordOwner), _record)
};

var STATE_TRAN_MATRIX = {
    diagnosis: DIAGNOSIS_STATE_TRAN_MATRIX,
    record: RECORD_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};