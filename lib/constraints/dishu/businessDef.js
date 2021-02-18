'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _attendance, _check;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2019/9/20.
 */
var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../../constants/dishu/project'),
    ProjectAction = _require2.action,
    ProjectRelation = _require2.relation,
    ProjectState = _require2.state,
    PROJECT_STATE_TRAN_MATRIX = _require2.STATE_TRAN_MATRIX;

var _require3 = require('../../constants/dishu/attendance'),
    AttendanceAction = _require3.action,
    ATTENDANCE_STATE_TRAN_MATRIX = _require3.STATE_TRAN_MATRIX;

var _require4 = require('../../constants/dishu/check'),
    CheckAction = _require4.action;

var _require5 = require('../../constants/dishu/attender'),
    AttenderAction = _require5.action;

var AliveProjectOwner = {
    auths: [{
        '#relation': { // 表示现有对象与user的关系
            relations: [ProjectRelation.owner] // 如果没有relations，则任何关系都可以
        },
        '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
        {
            check: function check(_ref) {
                var user = _ref.user,
                    row = _ref.row;

                return row.state === ProjectState.alive;
            }
        }]
    }]
};

var AttendanceProjectOwner = {
    auths: [{
        '#relation': { // 表示现有对象与user的关系
            attr: 'project',
            relations: [ProjectRelation.owner] // 如果没有relations，则任何关系都可以
        }
    }]
};

var CheckAttendanceProjectOwner = {
    auths: [{
        '#relation': { // 表示现有对象与user的关系
            attr: 'attendance.project',
            relations: [ProjectRelation.owner] // 如果没有relations，则任何关系都可以
        }
    }]
};

var AUTH_MATRIX = {
    project: (0, _defineProperty3.default)({}, ProjectAction.makeDead, AliveProjectOwner),
    attendance: (_attendance = {}, (0, _defineProperty3.default)(_attendance, AttendanceAction.wakeUp, AttendanceProjectOwner), (0, _defineProperty3.default)(_attendance, AttendanceAction.update, AttendanceProjectOwner), (0, _defineProperty3.default)(_attendance, AttendanceAction.complete, AttendanceProjectOwner), (0, _defineProperty3.default)(_attendance, AttendanceAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userProject',
                condition: function condition(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;
                    var projectId = row.projectId;

                    var query = {
                        userId: user.id,
                        projectId: projectId
                    };
                    return query;
                }
            }]
        }]
    }), _attendance),
    check: (_check = {}, (0, _defineProperty3.default)(_check, CheckAction.update, CheckAttendanceProjectOwner), (0, _defineProperty3.default)(_check, CheckAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userProject',
                condition: function condition(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row,
                        tables = _ref3.tables;
                    var attendanceId = row.attendanceId;

                    var query = {
                        userId: user.id,
                        projectId: {
                            $in: 'select projectId from ' + tables.attendance + ' where id = ' + attendanceId + ' and _deleteAt_ is null'
                        }
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userAttender',
                condition: function condition(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;
                    var attenderId = row.attenderId;

                    var query = {
                        userId: user.id,
                        attenderId: attenderId
                    };
                    return query;
                }
            }]
        }]
    }), _check),
    attender: (0, _defineProperty3.default)({}, AttenderAction.update, {
        auths: [{
            '#relation': {}
        }, {
            '#relation': {
                attr: 'project'
            }
        }]
    })
};

var STATE_TRAN_MATRIX = {
    project: PROJECT_STATE_TRAN_MATRIX,
    attendance: ATTENDANCE_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};