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
    STATE_TRAN_MATRIX: ATTENDANCE_STATE_TRAN_MATRIX,
} = require('../../constants/dishu/attendance');


const AUTH_MATRIX = {
    project: {
        [ProjectAction.makeDead]: {
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

