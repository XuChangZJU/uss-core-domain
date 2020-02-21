/**
 * Created by Administrator on 2019/9/20.
 */
const { Roles } = require('../../constants/roleConstant2');
const {
    action: ProjectAction,
    relation: ProjectRelation,
    state: ProjectState,
    STATE_TRAN_MATRIX: PROJECT_STATE_TRAN_MATRIX,
    } = require('../../constants/dishu/project');
const {
    action: AttendanceAction,
    STATE_TRAN_MATRIX: ATTENDANCE_STATE_TRAN_MATRIX,
    } = require('../../constants/dishu/attendance');
const {
    action: CheckAction,
    } = require('../../constants/dishu/check');
const {
    action: AttenderAction,
    } = require('../../constants/dishu/attender');

const AliveProjectOwner = {
    auths: [
        {
            '#relation': {              // 表示现有对象与user的关系
                relations: [ProjectRelation.owner],         // 如果没有relations，则任何关系都可以
            },
            '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                {
                    check: ({user, row}) => {
                        return row.state === ProjectState.alive;
                    },
                }
            ],
        },
    ],
};

const AttendanceProjectOwner = {
    auths: [
        {
            '#relation': {              // 表示现有对象与user的关系
                attr: 'project',
                relations: [ProjectRelation.owner],         // 如果没有relations，则任何关系都可以
            },
        },
    ],
};

const CheckAttendanceProjectOwner = {
    auths: [
        {
            '#relation': {              // 表示现有对象与user的关系
                attr: 'attendance.project',
                relations: [ProjectRelation.owner],         // 如果没有relations，则任何关系都可以
            },
        },
    ],
};

const AUTH_MATRIX = {
    project: {
        [ProjectAction.makeDead]: AliveProjectOwner,
    },
    attendance: {
        [AttendanceAction.wakeUp]: AttendanceProjectOwner,
        [AttendanceAction.update]: AttendanceProjectOwner,
        [AttendanceAction.complete]: AttendanceProjectOwner,
    },
    check: {
        [CheckAction.update]: CheckAttendanceProjectOwner,
        [CheckAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userProject',
                            condition: ({user, row, tables}) => {
                                const { attendanceId } = row;
                                const query = {
                                    userId: user.id,
                                    projectId: {
                                        $in: `select projectId from ${tables.attendance} where id = ${attendanceId} and _deleteAt_ is null`,
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userAttender',
                            condition: ({user, row}) => {
                                const { attenderId } = row;
                                const query = {
                                    userId: user.id,
                                    attenderId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        }
    },
    attender: {
        [AttenderAction.update]: {
            auths: [
                {
                    '#relation': {
                    },
                },
                {
                    '#relation': {
                        attr: 'project',
                    },
                }
            ],
        },
    },
};

const STATE_TRAN_MATRIX = {
    project: PROJECT_STATE_TRAN_MATRIX,
    attendance: ATTENDANCE_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};

