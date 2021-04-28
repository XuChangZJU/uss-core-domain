/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断
const assert = require('assert');
const xor = require('lodash/xor');
const {
    action: CommonAction,
} = require('../../constants/action');
const {
    action: revisitQuestionAction,
} = require('../../constants/lens/revisitQuestion')
const {
    action: revisitAction,
    state: revisitState,
    STATE_TRANS_MATRIX: REVISIT_STATE_TRANS_MATRIX,
} = require('../../constants/lens/revisit')
const {
    action: questionAction,
} = require('../../constants/lens/question')
const {
    action: reportAction,
} = require('../../constants/lens/report')
const {
    action: appointmentAction,
    STATE_TRANS_MATRIX: APPOINTMENT_STATE_TRANS_MATRIX,
    state: appointmentState,
    relation: appointmentRelation,
} = require('../../constants/lens/appointment')
const {
    action: activityAction,
    category: activityCategory,
    STATE_TRANS_MATRIX: ACTIVITY_STATE_TRANS_MATRIX,
    state: activityState,
} = require('../../constants/lens/activity')
const {
    action: qiniuFileAction,
    state: qiniuFileState,
} = require('../../constants/lens/qiniuFile');
const {
    action: CheckInAction,
    category: CheckInCategory,
} = require('../../constants/lens/checkIn');
const {
    action: ScheduleAction,
} = require('../../constants/lens/schedule');
const {
    action: LimitsAction,
    type: LimitsType,
} = require('../../constants/lens/limits');
const {
    action: TradeAction,
    state: TradeState,
    getMethodId: TradeGetMethodId,
    categoryId: TradeCategoryId,
    STATE_TRAN_MATRIX: TRADE_STATE_TRAN_MATRIX,
    transportState: TradeTransportState,
    billState: tradeBillState,
} = require('../../constants/lens/trade');
const {
    action: WorkerOrderAction,
    relation: WorkerOrderRelation,
    state: WorkerOrderState,
    STATE_TRAN_MATRIX: WORKERORDER_STATE_TRAN_MATRIX,
} = require('../../constants/lens/workerOrder')
const {
    action: BrandAction,
    relation: BrandRelation,
} = require('../../constants/lens/brand');
const {
    action: DiagnosisAction,
    state: DiagnosisState,
    STATE_TRANS_MATRIX: DIAGNOSIS_STATE_TRANS_MATRIX,
    relation: DiagnosisRelation,
    } = require('../../constants/lens/diagnosis');
const {
    action: RecheckAction,
    state: RecheckState,
    STATE_TRANS_MATRIX: RECHECK_STATE_TRANS_MATRIX,
} = require('../../constants/lens/recheck');
const {
    action: RecordAction,
    state: RecordState,
    relation: RecordRelation,
    } = require('../../constants/lens/record');
const {
    action: PatientAction,
    relation: PatientRelation,
    } = require('../../constants/lens/patient');
const {
    action: DeviceAction,
    state: DeviceState,
    STATE_TRANS_MATRIX: DEVICE_STATE_TRANS_MATRIX,
    } = require('../../constants/lens/device');

const {
    action: OrganizationAction,
    state: OrganizationState,
    relation: OrganizationRelation,
    STATE_TRANS_MATRIX: ORGANIZATION_STATE_TRANS_MATRIX,
    } = require('../../constants/lens/organization');
const {
    action: screeningAction,
    state: screeningState,
    STATE_TRANS_MATRIX: SCREENING_STATE_TRANS_MATRIX,
} = require('../../constants/lens/screening');

const {
    action: signUpAction,
    state: signUpState,
    STATE_TRANS_MATRIX: SIGNUP_STATE_TRANS_MATRIX,
} = require('../../constants/lens/signUp');

// const {
//     action: WorkerAction,
//     relation: WorkerRelation,
//     } = require('../../constants/lens/worker');

const {
    action: TransmitterAction,
    state: TransmitterState,
    STATE_TRANS_MATRIX: TRANSMITTER_STATE_TRANS_MATRIX,
    type: TransmitterType,
    } = require('../../constants/lens/transmitter');

const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
    } = require('../action');

const { Roles } = require('../../constants/lens/roles');
const ErrorCode = require('../../constants/errorCode');

const Jobs = {
    guardian: 1, //守护者
    administrator: 2, //管理员
    doctor: 3,
    nurse: 4,
    superAdministrator: 5, // 超级管理员
};

const tradeTransportCheck = (states, transportStates, getMethodIds) => [
    {
        check: ({ row, user }) => {
            if(!states.includes(row.state)){
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前支付状态不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row,
                });
            }
            if(!transportStates.includes(row.transportState)){
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前物流状态不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row,
                });
            }
            if(!getMethodIds.includes(row.getMethodId)){
                return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '当前取货方式不能进行此操作', {
                    name: 'trade',
                    operation: 'update',
                    data: row,
                });
            }
            return true;
        }
    }
]



const insideBrandRelation = [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff, BrandRelation.worker];

const OrganizationManagement = {
    auths: [
        {
            "#relation": {
                attr: 'brand',
                relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
            },
        },
    ],
};

const AppointmentBrandUserFn = (states, hasPatientId, hasNotPatientId) => (
    {
        "#relation": {
            attr: 'organization.brand',
        },
        '#data': [
            {
                check: ({ row }) => {
                    if (!states.includes(row.state) || hasPatientId && !row.patientId
                        || hasNotPatientId && row.patientId) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约无效', {
                            name: 'appointment',
                            operation: 'update',
                            data: row,
                        });
                    }
                    return true;
                },
            }
        ]
    }
);

const RecheckRootFn = (states, msg) => {
    const auth = {
        "#role": [Roles.ROOT.name],
    };
    if (states) {
        Object.assign(auth, {
            '#data': [
                {
                    check: ({ row }) => {
                        if (!states.includes(row.state)) {
                            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg || '状态无效', {
                                name: 'recheck',
                                operation: 'update',
                                data: row,
                            });
                        }
                        return true;
                    },
                }
            ]
        });
    }
    return auth;
}

const AUTH_MATRIX = {
    qiniuFile: {
        [qiniuFileAction.create]: AllowEveryoneAuth,
        [qiniuFileAction.remove]: AllowEveryoneAuth,
    },
    trade: {
        [TradeAction.issueBill]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && [tradeBillState.noBill, tradeBillState.pending].includes(row.billState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                        relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && row.price > 0 && [tradeBillState.noBill, tradeBillState.pending].includes(row.billState);
                            },
                        }
                    ],
                }
            ],
        },
        [TradeAction.completeBill]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.billState === tradeBillState.pending;
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                        relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.billState === tradeBillState.pending;
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.financialRefund]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                        relation: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2, TradeState.refunded, TradeState.abandoned].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.completeCheck]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization',
                        relations: [OrganizationRelation.doctor],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                }
            ],
        },
        [TradeAction.cancelCheck]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization',
                        relations: [OrganizationRelation.doctor],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'patient',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.checkInQueue].includes(row.transportState);
                            },
                        }
                    ],
                }
            ],
        },
        [TradeAction.makeAbandoned]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                            },
                        }
                    ],
                },
                {
                    '#relation': {  // 内部人员可以不受流转状态限制退单
                        attr: 'diagnosis.organization.brand',
                        relations: insideBrandRelation,
                    },
                }
            ],
        },
        [TradeAction.allocWeChatQrCode]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ],
        },
        [TradeAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                }
            ]
        },
        [TradeAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.dqj, TradeTransportState.yqj].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'patient',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd].includes(row.transportState);
                            },
                        }
                    ],
                }
            ]
        },
        [TradeAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.diagnosis && !row.diagnosis.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                            },
                        }
                    ],
                }
            ]
        },
        [TradeAction.confirmPick]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dqj].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dqj].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.confirmArriveAtShop]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.taSend]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
                },
            ]
        },
        [TradeAction.taCancel]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsInPreparing], [TradeGetMethodId.Express])
                },
            ]
        },
        [TradeAction.taPrepare]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.wdd], [TradeGetMethodId.Express])
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.wdd], [TradeGetMethodId.Express])
                },
            ]
        },
        [TradeAction.taAccept]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
                },
            ]
        },
        [TradeAction.taReject]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
                },
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': tradeTransportCheck([TradeState.legal, TradeState.legal2], [TradeTransportState.tsSending], [TradeGetMethodId.Express])
                },
            ]
        },
        [TradeAction.customConfirm]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'patient'
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethodId === TradeGetMethodId.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
    },
    workerOrder: {
        [WorkerOrderAction.create]:{
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userPatient',
                            condition: ({ user }) => {
                                return {
                                    // tradeId: workerOrder.tradeId,    // workerOrder在create时没有多层数据，这里写不出来，写到definition中
                                    // trade: {
                                    //     transportState: TradeTransportState.yqj,
                                    // },
                                    userId: user.id,
                                }
                            }
                        },
                    ],
                },
            ],
        },
        [WorkerOrderAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                },
                {
                    "#relation": {
                        attr: '',
                    },
                }
            ],
        },
        [WorkerOrderAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.patient',
                    },
                }
            ],
        },
        [WorkerOrderAction.accept]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === WorkerOrderState.pending;
                            },
                        }
                    ],
                },
            ]
        },
        [WorkerOrderAction.refuse]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.financialStuff],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === WorkerOrderState.pending;
                            },
                        }
                    ],
                },
            ]
        },
        [WorkerOrderAction.resubmit]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.patient',
                        relations: [PatientRelation.owner],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {

                            check: ({user, row}) => {
                                return  [WorkerOrderState.refused].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return  [WorkerOrderState.refused].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
    },
    brand: {
        [BrandAction.update]: OwnerRelationAuth,
        [BrandAction.transfer]: OwnerRelationAuth,
        [BrandAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        },
        [BrandAction.authRevoke]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            needData: true,
                            condition: ({ user, row, actionData }) => {
                                const { userBrand } = actionData;
                                if(userBrand.relation === BrandRelation.owner){
                                    return {
                                        relation: -1,
                                    }
                                }
                                if(userBrand.relation === BrandRelation.manager || userBrand === BrandRelation.customerService){
                                    return {
                                        userId: user.id,
                                        brandId: row.id,
                                        relation: {
                                            $in: [BrandRelation.owner],
                                        },
                                    }
                                }

                                return {
                                    userId: user.id,
                                    brandId: row.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                                    },
                                }
                            },
                        },
                    ],
                }
            ]
        },
        [BrandAction.authAbandon]: OwnerRelationAuth,
        [BrandAction.remove]: OwnerRelationAuth,
        [BrandAction.assign]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        }
    },
    patient: {
        [PatientAction.create]: AllowEveryoneAuth,
        [PatientAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relations: [PatientRelation.owner],
                    },
                },
                {
                    '#exists': [
                        // {
                        //     relation: 'userOrganization',
                        //     condition: ({user, row}) => {
                        //         return {
                        //             userId: user.id,
                        //         }
                        //     },
                        // },
                        {
                            relation: 'userBrand',
                            condition: ({user, row}) => {
                                return {
                                    userId: user.id,
                                }
                            },
                        },
                    ],
                },
            ],
        },
        [PatientAction.remove]: OwnerRelationAuth,
        [PatientAction.acquire]: AllowEveryoneAuth,
        [PatientAction.authAbandon]: OwnerRelationAuth,
        [PatientAction.assign]: AllowEveryoneAuth,
    },
    diagnosis: {
        [DiagnosisAction.allocWeChatQrCode]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ],
        },
        [DiagnosisAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        },
                    ],
                },
            ],
        },
        [DiagnosisAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'organization.brand',
                    },
                },
                {
                    "#relation": {
                        attr: ''
                    },
                },
            ]
        },
        [DiagnosisAction.assign]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'organization.brand'
                    },
                }
            ]
        },
        [DiagnosisAction.authRevoke]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'organization.brand'
                    },
                }
            ]
        },
        [DiagnosisAction.remove]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'organization.brand'
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return !row.userId && new Date().setHours(23, 59) - (row._createAt_ || row.createAt) < 86400000;
                            },
                        }
                    ],
                },
            ]
        }
    },
    recheck: {
        [RecheckAction.create]: {
            auths: [
                RecheckRootFn(),
            ],
        },
        [RecheckAction.activate]: {
            auths: [
                RecheckRootFn([RecheckState.inactive]),
            ],
        },
        [RecheckAction.confirm]: {
            auths: [
                RecheckRootFn([RecheckState.active]),
            ],
        },
        [RecheckAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                    '#data': ({ actionData, row }) => {
                        const { recheck } = actionData;
                        assert (recheck);
                        const beginsAt = recheck.beginsAt || row.beginsAt;
                        const endsAt = recheck.endsAt || row.endsAt;
                        assert(beginsAt < endsAt);
                        const allowUpdateAttrs = ['beginsAt', 'endsAt'];
                        assert (xor(Object.keys(recheck), allowUpdateAttrs).length === 0);

                        return true;
                    }
                }
            ],
        },
        [RecheckAction.complete]: {
            auths: [
                RecheckRootFn([RecheckState.inactive, RecheckState.active, RecheckState.confirmed, RecheckState.expired]),
            ],
        },
        [RecheckAction.expire]: {
            auths: [
                RecheckRootFn([RecheckState.active, RecheckState.confirmed]),
            ],
        },        
        [RecheckAction.makeDead]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                }
            ],
        },
        [RecheckAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                }
            ],
        },
    },
    record: {
        [RecordAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        },
                    ]
                }
            ]
        },
        [RecordAction.update]: {
            auths: [
                {
                    '#relation': {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                },
            ],
        },
        // [RecordAction.bind]: {
        //     auths: [
        //         {
        //             '#data': [
        //                 {
        //                     check: ({row}) => {
        //                         return !row.diagnosisId;
        //                     },
        //                 }
        //             ],
        //         },
        //     ],
        // },
        // [RecordAction.unbind]: {
        //     auths: [
        //         {
        //             '#relation': {
        //                 attr: 'diagnosis.organization.brand',
        //             },
        //             '#data': [
        //                 {
        //                     check: ({row}) => {
        //                         return row.diagnosisId;
        //                     },
        //                 }
        //             ],
        //         },
        //     ],
        // },
        [RecordAction.remove]: {
            auths: [
                {
                    '#relation': {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                },
            ],
        }
    },
    device: {
        [DeviceAction.create]:  {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager]
                                    }
                                }
                            },
                        },
                    ],
                },
            ],
        },
        [DeviceAction.update]: {
            auths: [
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker],
                    },
                },
            ],
        },
        [DeviceAction.enable]: {
            auths: [
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker],
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === DeviceState.offline;
                        },
                    }]
                },
            ],
        },
        [DeviceAction.disable]: {
            auths: [
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker],
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === DeviceState.online;
                        },
                    }]
                },
            ],
        },
    },
    organization: {
        [OrganizationAction.allocWeChatQrCode]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ],
        },
        [OrganizationAction.create]: {
            auths: [{
                '#exists': [
                    {
                        relation: 'userBrand',
                        needData: true,
                        condition: ({ user, actionData }) => {
                            const { organization } = actionData;
                            const query = {
                                userId: user.id,
                                brandId: organization.brandId,
                            };
                            return query;
                        },
                    },
                ],
            }]
        },
        [OrganizationAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        },
        [OrganizationAction.bind]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                    '#data': [
                        {
                            check: ({ row }) => {
                                return row.name === null;
                            },
                        },
                    ],
                },
            ],
        },
        [OrganizationAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        },
        [OrganizationAction.bind]: OrganizationManagement,
        [OrganizationAction.remove]: OrganizationManagement,
        [OrganizationAction.enable]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.offline;
                        },
                    }]
                },
            ]
        },
        [OrganizationAction.assign]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        },
        [OrganizationAction.authRevoke]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                }
            ]
        },
        [OrganizationAction.disable]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                    '#data': [{
                        check: ({user, row}) => {
                            return row.state === OrganizationState.online;
                        },
                    }]
                }]
        },
    },
    transmitter: {
        [TransmitterAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            },
                        },
                    ],
                },
            ],
        },
        [TransmitterAction.updateUuid]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.type === TransmitterType.esp8266;
                            },
                        }
                    ],
                },
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.type === TransmitterType.esp8266;
                            },
                        }
                    ],
                },
            ],
        },
        [TransmitterAction.bind]: {
            auths: [
                 {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return !row.deviceId && [TransmitterState.normal, TransmitterState.offline,TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  !row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
            ],
        },
        [TransmitterAction.unbind]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    roleId: Roles.BUSINESS.id,
                                };
                                return query;
                            },
                        },
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
                {
                    '#relation': {
                        attr: 'organization.brand'
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return row.deviceId && [TransmitterState.normal, TransmitterState.offline, TransmitterState.inactive].includes(row.state);
                            },
                        }
                    ]
                },
            ],
        },
    },
    checkIn: {
        [CheckInAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                // actionData取不到brandId,目前写到definition中
                                const query = {
                                    userId: user.id,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [CheckInAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff],
                    },
                },
                {
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return user.id === row.userId && row.category === CheckInCategory.off;
                            },
                        }
                    ],
                },
            ]
        },
        [CheckInAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff],
                    },
                },
            ]
        },
    },
    schedule: {
        [ScheduleAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                // 这里brandId取不到，权限判断写在definition里
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [ScheduleAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff],
                    },
                },
            ]
        },
        [ScheduleAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.financialStuff],
                    },
                },
            ]
        },
    },
    limits: {
        [LimitsAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({ user }) => {
                                // 需要根据类型判断，且需要actionData，过于复杂放在defination中
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.seller, BrandRelation.worker, BrandRelation.financialStuff],
                                    }
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [LimitsAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff],
                        // 具体权限需要根据actionData
                    },
                },
            ]
        },
        [LimitsAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.worker, BrandRelation.financialStuff],
                        // 具体权限需要根据actionData
                    },
                },
            ]
        },
    },
    appointment: {
        [appointmentAction.create]: AllowEveryoneAuth,
        [appointmentAction.update]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({ user, row, actionData }) => {
                                if (!row.state === appointmentState.normal && !row.patientId) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约已失效', {
                                        name: 'appointment',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                const { appointment } = actionData;
                                if (Object.keys(appointment).length !== 1 || !appointment.hasOwnProperty('patientId')) {
                                    return new Error('数据非法');
                                }
                                return true;
                            },
                        }
                    ]
                },
            ],
        },
        [appointmentAction.cancel]: {
            auths: [
                AppointmentBrandUserFn([appointmentState.normal]),
                {
                    "#relation": {
                        attr: 'patient',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                if (!row.state === appointmentState.normal) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, '预约已失效', {
                                        name: 'appointment',
                                        operation: 'update',
                                        data: row,
                                    });
                                }
                                return true;
                            },
                        }
                    ]
                },
            ],
        },
        [appointmentAction.regist]: {
            auths: [
                AppointmentBrandUserFn([appointmentState.normal, appointmentState.late], true),
            ],
        },
        [appointmentAction.makeLate]: {
            auths: [
                AppointmentBrandUserFn([appointmentState.normal], true),
            ],
        },
        [appointmentAction.makeAbsent]: {
            auths: [
                AppointmentBrandUserFn([appointmentState.normal, appointmentState.late], true),
            ],
        },
        [appointmentAction.allocWeChatQrCode]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return !row.patientId;
                            },
                        }
                    ]
                }
            ],
        },
    },
    activity: {
        [activityAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            needData: true,
                            condition: ({ actionData, user }) => {
                                const { activity } = actionData;
                                const query = {
                                    userId: user.id,
                                    brandId: activity.brandId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [activityAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === activityState.ongoing;
                            },
                        }
                    ]
                },
            ],
        },
        [activityAction.cancel]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === activityState.ongoing;
                            },
                        }
                    ]
                },
            ],
        },
        [activityAction.restart]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === activityState.cancelled;
                            },
                        }
                    ]
                },
            ],
        },
        [activityAction.allocWeChatQrCode]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === activityState.ongoing;
                            },
                        }
                    ]
                },
            ],
        }
    },
    report: {
        [reportAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        },
                    ]
                }
            ]
        },
        [reportAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                },
            ],
        },
        [reportAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'trade.diagnosis.organization.brand',
                    },
                },
            ],
        }
    },
    question: {
        [questionAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                                    }
                                }
                            }
                        },
                    ]
                }
            ]
        },
        [questionAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                },
            ],
        },
    },
    revisit: {
        [revisitAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userBrand',
                            condition: ({user}) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter],
                                    }
                                }
                            }
                        },
                    ]
                }
            ]
        },
        [revisitAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter],
                    },
                },
            ],
        },
        [revisitAction.manage]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker, BrandRelation.supporter],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [revisitState.pending].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
    },
    revisitQuestion: {
        [revisitQuestionAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'question.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService, BrandRelation.worker],
                    },
                },
                {
                    '#exists': [
                        {
                            relation: 'revisit',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                    id: row.revisitId,
                                }
                            }
                        }
                    ]
                },
            ],
        },
    },
    signUp: {
        [signUpAction.create]: AllowEveryoneAuth,
        [signUpAction.update]: AllowEveryoneAuth,
        [signUpAction.cancel]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ]
                },
                {
                    "#relation": {
                        attr: 'patient',
                    },
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === signUpState.normal;
                            },
                        }
                    ]
                },
            ],
        },
        [signUpAction.regist]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === appointmentState.normal && !!row.patientId;
                            },
                        }
                    ]
                },
            ],
        },
        [signUpAction.allocWeChatQrCode]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                }
            ],
        },
    },
    screening: {
        [screeningAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                },
            ]
        },
        [screeningAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                },
            ],
        },
        [screeningAction.cancel]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === screeningState.ongoing;
                            },
                        }
                    ]
                },
            ],
        },
        [screeningAction.restart]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === screeningState.cancelled;
                            },
                        }
                    ]
                },
            ],
        },
        [screeningAction.allocWeChatQrCode]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userRole',
                            condition: ({ user, row }) => {
                                return {
                                    userId: user.id,
                                }
                            }
                        }
                    ],
                    '#data': [
                        {
                            check: ({ user, row }) => {
                                return  row.state === screeningState.ongoing;
                            },
                        }
                    ]
                },
            ],
        }
    },
    organizationCategory: {
        [CommonAction.create]: {
            auths: [
                {
                    '#relation': {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ]
        },
    },
};

const STATE_TRAN_MATRIX = {
    appointment: APPOINTMENT_STATE_TRANS_MATRIX,
    recheck: RECHECK_STATE_TRANS_MATRIX,
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
    workerOrder: WORKERORDER_STATE_TRAN_MATRIX,
    trade: TRADE_STATE_TRAN_MATRIX,
    activity: ACTIVITY_STATE_TRANS_MATRIX,
    revisit: REVISIT_STATE_TRANS_MATRIX,
    screening: SCREENING_STATE_TRANS_MATRIX,
    signUp: SIGNUP_STATE_TRANS_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
