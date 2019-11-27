/**
 * Created by Administrator on 2019/9/20.
 */
const { Roles } = require('../../constants/roleConstant2');
const {
    action: ReportAction,
    relation: ReportRelation,
    state: ReportState,
    CONSTANTS: REPORT_CONSTANTS,
    STATE_TRAN_MATRIX: REPORT_STATE_TRAN_MATRIX,
} = require('../../constants/nezha/report');
const ErrorCode = require('../../constants/nezha/errorCode');

const { COMMON_STATE_TRAN_MATRIX, action: CommonAction, relation: CommonRelation } = require('../../constants/action');

function genOwnerOrFactoryOwner(checkRow) {
    return {
        auths:  [
            {
                '#relation': {              // 表示现有对象与user的关系
                    attr: 'machine.factory',         // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                    relations: [ReportRelation.owner],         // 如果没有relations，则任何关系都可以
                },
                '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                    {
                        check: ({ user, row }) => checkRow({ user, row }),
                    }
                ],
            },
            {
                '#relation': {              // 表示现有对象与user的关系
                    relations: [ReportRelation.owner],         // 如果没有relations，则任何关系都可以
                },
                '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                    {
                        check: ({ user, row }) => checkRow({ user, row }),
                    }
                ],
            },
        ],
    }
}

function genWorker(checkRow) {
    return {
        auths: [
            {
                '#relation': {              // 表示现有对象与user的关系
                    relations: [ReportRelation.worker],         // 如果没有relations，则任何关系都可以
                },
                '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                    {
                        check: ({ user, row }) => checkRow({ user, row }),
                    }
                ],
            },
        ],
    };
}

const AUTH_MATRIX = {
    report: {
        [ReportAction.confirm]: {
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        attr: 'machine.factory',         // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [ReportRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === ReportState.init;
                            },
                        }
                    ],
                },
            ],
        },
        [ReportAction.accept]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userCertificate',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === ReportState.delivered;
                            },
                        }
                    ],
                }
            ]
        },
        [ReportAction.deliverAgain]: genOwnerOrFactoryOwner(({user, row}) => {
            // 前端 传入row时 因为解构 _createAt_ 变成了 createAt, 进行容错处理
            return (row._createAt_ || row.createAt) < Date.now() - REPORT_CONSTANTS.allowDeliverGap && row.state === ReportState.accepted;
        }),
        [ReportAction.giveUp]: genWorker(({user, row}) => {
            return row.state === ReportState.accepted;
        }),
        [ReportAction.cancel]: genOwnerOrFactoryOwner(({user, row}) => {
            return (row._createAt_ || row.createAt) < Date.now() - REPORT_CONSTANTS.allowDeliverGap && row.state === ReportState.accepted
                || [ReportState.init, ReportState.delivered].includes(row.state);
        }),
        [ReportAction.startRepairing]: genWorker(({user, row}) => {
            return [ReportState.accepted, ReportState.inRedoing].includes(row.state);
        }),
        [ReportAction.endRepairing]: genOwnerOrFactoryOwner(({user, row}) => {
            return [ReportState.inRepairing].includes(row.state);
        }),
        [ReportAction.commit]: genWorker(({user, row}) => {
            return [ReportState.inRepairing, ReportState.committed].includes(row.state);
        }),
        [ReportAction.admit]: genOwnerOrFactoryOwner(({user, row}) => {
            return [ReportState.committed].includes(row.state);
        }),
        [ReportAction.pauseRepairing]: genWorker(({user, row}) => {
            return [ReportState.inRepairing].includes(row.state);
        }),
        [ReportAction.rejectRepairing]: genWorker(({user, row}) => {
            return [ReportState.askingForRestart].includes(row.state);
        }),
        [ReportAction.askForRestart]: genOwnerOrFactoryOwner(({user, row}) => {
            return row.state === ReportState.done;
        }),
        [ReportAction.restart]:  genWorker(({user, row}) => {
            return row.state === ReportState.askingForRestart;
        }),
        [ReportAction.surrender]: genWorker(({user, row}) => {
            return [ReportState.inRepairing, ReportState.inRedoing].includes(row.state);
        }),
    },
    machine: {
        [CommonAction.update]: {
            auths: [
                {
                    '#relation': {
                        attr: 'factory',
                    },
                },
            ],
        },
    },
    factory: {
        [CommonAction.update]: {
            auths: [
                {
                    '#relation': {},
                },
            ],
        },
        [CommonAction.transfer]: {
            auths: [
                {
                    '#relation': {
                        relations: [CommonRelation.owner],
                    },
                },
            ],
        },
    },
};

const STATE_TRAN_MATRIX = {
    certificate: COMMON_STATE_TRAN_MATRIX,
    report: REPORT_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};

