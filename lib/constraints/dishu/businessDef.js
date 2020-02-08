'use strict';

var _attendance, _check;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var ProjectOwner = {
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
    project: _defineProperty({}, ProjectAction.makeDead, ProjectOwner),
    attendance: (_attendance = {}, _defineProperty(_attendance, AttendanceAction.wakeUp, AttendanceProjectOwner), _defineProperty(_attendance, AttendanceAction.update, AttendanceProjectOwner), _defineProperty(_attendance, AttendanceAction.complete, AttendanceProjectOwner), _attendance),
    check: (_check = {}, _defineProperty(_check, CheckAction.update, CheckAttendanceProjectOwner), _defineProperty(_check, CheckAction.create, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                attr: 'attendance.project',
                relations: [ProjectRelation.owner] // 如果没有relations，则任何关系都可以
            }
        }, {
            '#relation': {
                attr: 'attender'
            }
        }]
    }), _check)
};

var STATE_TRAN_MATRIX = {
    project: PROJECT_STATE_TRAN_MATRIX,
    attendance: ATTENDANCE_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};