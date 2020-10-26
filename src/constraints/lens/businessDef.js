/**
 *
 * Created by Xc on 2020/2/20.
 */

// userOrganization不再用于权限判断，根据人员当日打卡所在门店赋予权限，由于复杂写在definition中，这里只做基础的判断
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
    getMethod: TradeGetMethod,
    STATE_TRAN_MATRIX: TRADE_STATE_TRAN_MATRIX,
    transportState: TradeTransportState,
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

const Jobs = {
    guardian: 1, //守护者
    administrator: 2, //管理员
    doctor: 3,
    nurse: 4,
    superAdministrator: 5, // 超级管理员
};



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

const AUTH_MATRIX = {
    qiniuFile: {
        [qiniuFileAction.create]: AllowEveryoneAuth,
        [qiniuFileAction.remove]: AllowEveryoneAuth,
    },
    trade: {
        [TradeAction.makeAbandoned]: {
            auths: [
                {
                    '#relation': {
                        attr: 'organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.yqj].includes(row.transportState) && TradeState.legal2 === row.state;
                            },
                        }
                    ],
                }
            ],
        },
        [TradeAction.allocWeChatQrCode]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
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
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd].includes(row.transportState);
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
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                }
            ]
        },
        [TradeAction.updateFeedback]: {
            auths: [
                {
                    "#relation": {
                        attr: 'patient',
                    },
                },
            ]
        },
        [TradeAction.confirmPick]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.confirmArriveAtShop]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.send]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.wdd, TradeTransportState.dqj].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.confirmGet]: {
            auths: [
                {
                    "#relation": {
                        attr: 'patient',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.yfh].includes(row.transportState) && row.getMethod === TradeGetMethod.express && [TradeState.legal, TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.customConfirm]: {
            auths: [
                {
                    "#relation": {
                        attr: 'patient'
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.dgkqr].includes(row.transportState) && row.getMethod === TradeGetMethod.helpYourself && [TradeState.legal, TradeState.legal2].includes(row.state);
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
    },
    diagnosis: {
        [DiagnosisAction.allocWeChatQrCode]: {
            auths: [
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
                    "#relation": {
                        attr: 'organization.brand'
                    },
                }
            ]
        },
        [DiagnosisAction.authRevoke]: {
            auths: [
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
                    "#relation": {
                        attr: 'organization.brand'
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return !row.userId && Date.now() - (row._createAt_ || row.createAt)  < 86400000;
                            },
                        }
                    ],
                },
            ]
        }
    },
    recheck: {
        [RecheckAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
                    },
                },
                {
                    "#relation": {
                        attr: 'diagnosis.patient',
                        relations: [PatientRelation.owner],
                    },
                }
            ],
        },
        [RecheckAction.confirm]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.patient',
                        relations: [PatientRelation.owner],
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === RecheckState.active;
                            },
                        }
                    ],
                },
            ]
        },
        [RecheckAction.kill]: {
            auths: [
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
                        {
                            check: ({user, row}) => {
                                return row.state === RecheckState.expired;
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
                                return row.state === RecheckState.expired;
                            },
                        }
                    ],
                },
            ]
        },
        [RecheckAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'diagnosis.organization.brand',
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
                        attr: 'diagnosis.organization.brand',
                    },
                },
            ],
        },
        [RecordAction.bind]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({row}) => {
                                return !row.diagnosisId;
                            },
                        }
                    ],
                },
            ],
        },
        [RecordAction.unbind]: {
            auths: [
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [
                        {
                            check: ({row}) => {
                                return row.diagnosisId;
                            },
                        }
                    ],
                },
            ],
        },
        [RecordAction.remove]: {
            auths: [
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                    },
                    '#data': [
                        {
                            check: ({ row }) => {
                                return !row.diagnosisId;
                            },
                        }
                    ],
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
                        attr: 'diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
                    },
                },
            ],
        },
        [DeviceAction.enable]: {
            auths: [
                {
                    '#relation': {
                        attr: 'diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
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
                        attr: 'diagnosis.organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ]
        },
        [OrganizationAction.bind]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
        [OrganizationAction.update]: OrganizationManagement,
        [OrganizationAction.remove]: OrganizationManagement,
        [OrganizationAction.enable]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ]
        },
        [OrganizationAction.authRevoke]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                }
            ]
        },
        [OrganizationAction.disable]: {
            auths: [
                {
                    "#relation": {
                        attr: 'brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
                                        $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
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
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
                    },
                },
            ]
        },
        [ScheduleAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'organization.brand',
                        relations: [BrandRelation.owner, BrandRelation.manager, BrandRelation.customerService],
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
                                        $in: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager, BrandRelation.seller],
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
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
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
                        relations: [BrandRelation.owner, BrandRelation.customerService, BrandRelation.manager],
                        // 具体权限需要根据actionData
                    },
                },
            ]
        },
    }
};

const STATE_TRAN_MATRIX = {
    recheck: RECHECK_STATE_TRANS_MATRIX,
    diagnosis: DIAGNOSIS_STATE_TRANS_MATRIX,
    device: DEVICE_STATE_TRANS_MATRIX,
    organization: ORGANIZATION_STATE_TRANS_MATRIX,
    transmitter: TRANSMITTER_STATE_TRANS_MATRIX,
    workerOrder: WORKERORDER_STATE_TRAN_MATRIX,
    trade: TRADE_STATE_TRAN_MATRIX,
};

module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
