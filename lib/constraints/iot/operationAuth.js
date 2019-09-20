'use strict';

var _agency;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/9/20.
 */
var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../../constants/iot/agency'),
    AgencyAction = _require2.action,
    AgencyRelation = _require2.relation;

var ErrorCode = require('../../constants/iot/errorCode');

var MATRIX = {
    agency: (_agency = {}, _defineProperty(_agency, AgencyAction.update, {
        // visible: 'always',           /*** always: 长显示，none: 不显示 *//
        auths: [{
            '#role': [Roles.EDITOR.name]
        }, {
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'parent', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#attr': { // 表示对现有对象或者用户的属性
                show: true, // 置true的话，前台仍然显示按钮
                rel: 'user', // 这里的rel可以是user，如果为空默认是对该行数据检查
                check: function check(_ref) {
                    var user = _ref.user;
                    // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })
                    if (!user.mobile) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                    }
                }
            }
        }]
    }), _defineProperty(_agency, AgencyAction.setAgencySkuPrice, {
        auths: [{
            '#relation': {
                attr: 'parent',
                relations: [AgencyRelation.owner]
            }
        }]
    }), _agency)
};

module.exports = {
    MATRIX: MATRIX
};