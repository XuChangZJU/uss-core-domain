/**
 * Created by Administrator on 2019/9/20.
 */
const { Roles } = require('../../constants/roleConstant2');
const { action: AgencyAction, relation: AgencyRelation } = require('../../constants/iot/agency');
const ErrorCode = require('../../constants/iot/errorCode');


const MATRIX = {
    agency: {
        [AgencyAction.create]: {
            // visible: 'always',           /*** always: 长显示，none: 不显示 *//
            auths: [
                {
                    '#roleNames': [Roles.EDITOR.name],
                },
                {
                    '#relation': {
                        attr: 'parent',         // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                        relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
                    },
                    '#attr': {
                        rel: 'user',                        // 这里的rel可以是user，如果为空默认是对该行数据检查
                        check: ({ user }) => {                 // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })
                            if (!user.mobile) {
                                return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                            }
                        },
                    },
                }
            ],
        },
        [AgencyAction.setAgencySkuPrice]: {
            auths: [
                {
                    '#relation': {
                        attr: 'parentId',
                        relations: [AgencyRelation.owner],
                    },
                }
            ]
        },
    },
};

module.exports = {
    MATRIX,
};

