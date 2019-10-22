'use strict';

var _agency, _device;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/9/20.
 */
var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../../constants/iot/agency'),
    AgencyAction = _require2.action,
    AgencyRelation = _require2.relation;

var _require3 = require('../../constants/iot/device'),
    DeviceAction = _require3.action,
    DeviceRelation = _require3.relation;

var ErrorCode = require('../../constants/iot/errorCode');

var _require4 = require('../../constants/action'),
    COMMON_STATE_TRAN_MATRIX = _require4.COMMON_STATE_TRAN_MATRIX;

var AUTH_MATRIX = {
    agency: (_agency = {}, _defineProperty(_agency, AgencyAction.createSub, {
        auths: [{
            '#data': [{ // 表示对现有对象或者用户的数据有要求
                show: true, // 置true的话，前台仍然显示按钮
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;
                    // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                    if (!user.mobile) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                    }
                    return true;
                }
            }, { // 表示对现有对象或者用户的数据有要求
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;
                    // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                    return row.level < 2;
                }
            }]
        }]
    }), _defineProperty(_agency, AgencyAction.update, {
        // visible: 'always',           /*** always: 长显示，none: 不显示 *//
        auths: [{
            '#role': [Roles.EDITOR.name]
        }, {
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'parent', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                show: true, // 置true的话，前台仍然显示按钮
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;
                    // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                    if (!user.mobile) {
                        return ErrorCode.createErrorByCode(ErrorCode.errorNeedLoginMobile, '请先登录您的手机号码');
                    }
                    return true;
                }
            }]
        }]
    }), _defineProperty(_agency, AgencyAction.remove, {
        // visible: 'always',           /*** always: 长显示，none: 不显示 *//
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'parent', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            }
        }]
    }), _defineProperty(_agency, AgencyAction.setAgencySkuPrice, {
        auths: [{
            '#relation': {
                attr: 'parent',
                relations: [AgencyRelation.owner]
            }
        }]
    }), _agency),
    device: (_device = {}, _defineProperty(_device, DeviceAction.loadGoods, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency' // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                // relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
            }
        }]
    }), _defineProperty(_device, DeviceAction.update, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency' // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                // relations: [AgencyRelation.owner],         // 如果没有relations，则任何关系都可以
            }
        }]
    }), _defineProperty(_device, DeviceAction.remove, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency', // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            }
        }]
    }), _defineProperty(_device, DeviceAction.returnBack, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency', // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            }
        }]
    }), _defineProperty(_device, DeviceAction.grantSubAgency, {
        /**
         * 授权机器给下级，自己要是一级以上的代理，且机器属于自己或自己的直系下级
         */
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency', // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;
                    // 如果是user传过来的是({ user })，如果是行数据传过来的是({ row, data })，返回值是三元值：true/false/Error
                    return row.agency.level < 2;
                }
            }]
        }, {
            '#relation': { // 表示现有对象与user的关系
                show: false, // 置true的话，前台仍然显示按钮
                attr: 'agency.parent', // 这里的attr指对象中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [AgencyRelation.owner] // 如果没有relations，则任何关系都可以
            }
        }]
    }), _device)
};

var STATE_TRAN_MATRIX = {
    trade: COMMON_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX // 新架构下还没测过，先用老的代码，不放开
};