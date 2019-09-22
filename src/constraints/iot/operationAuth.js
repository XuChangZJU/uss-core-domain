/**
 * Created by Administrator on 2019/9/20.
 */
const { Roles } = require('../../constants/roleConstant2');
const { action: AgencyAction, relation: AgencyRelation } = require('../../constants/iot/agency');
const { action: DeviceAction, relation: DeviceRelation } = require('../../constants/iot/device');
const ErrorCode = require('../../constants/iot/errorCode');


const MATRIX = {
    agency: {
        [AgencyAction.createSub]: {
            auths: [
                {
                    '#data': [
                        {                  // 表示对现有对象或者用户的数据有要求
                            show: true,                           // 置true的话，前台仍然显示按钮
                            check: ({ user, row }) => {                 // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                                if (!user.mobile) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                                }
                                return true;
                            },
                        },
                        {                  // 表示对现有对象或者用户的数据有要求
                            check: ({ user, row }) => {                 // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                                return row.level < 2;
                            },
                        },
                    ],
                }
            ]
        },
        [AgencyAction.update]: {
            // visible: 'always',           /*** always: 长显示，none: 不显示 *//
            auths: [
                {
                    '#role': [Roles.EDITOR.name],
                },
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'parent',         // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                    '#data': [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                        {
                            show: true,                           // 置true的话，前台仍然显示按钮
                            check: ({ user, row }) => {                 // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                                if (!user.mobile) {
                                    return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                                }
                                return true;
                            },
                        }
                    ],
                }
            ],
        },
        [AgencyAction.remove]: {
            // visible: 'always',           /*** always: 长显示，none: 不显示 *//
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'parent',         // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        },
        [AgencyAction.setAgencySkuPrice]: {
            auths: [
                {
                    '#relation': {
                        attr: 'parent',
                        relations: [AgencyRelation.owner],
                    },
                }
            ]
        },
    },
    device: {
        [DeviceAction.loadGoods]: {
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        // relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        },
        [DeviceAction.update]: {
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        // relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        },
        [DeviceAction.remove]: {
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        },
        [DeviceAction.returnBack]: {
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        },
        [DeviceAction.grantSubAgency]: {
            /**
             * 授权机器给下级，自己要是一级以上的代理，且机器属于自己或自己的直系下级
             */
            auths: [
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                    '#data':  [                 // 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
                        {
                            check: ({ user, row }) => {                 // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                                return row.agency.level < 2;
                            },
                        }
                    ],
                },
                {
                    '#relation': {              // 表示现有对象与user的关系
                        show: false,                           // 置true的话，前台仍然显示按钮
                        attr: 'agency.parent',         // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                }
            ],
        }
    },
};

module.exports = {
    MATRIX,
};

