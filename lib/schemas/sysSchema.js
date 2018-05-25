/**
 * Created by Administrator on 2016/6/23.
 */
'use strict';

var _SysSchema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tables = require('./sysTables');
var sources = require('./sysSources');
var userConstant = require('../constants/userConstant');
var messageConstant = require('../src/constants/messageConstant');

var SysSchema = (_SysSchema = {}, _defineProperty(_SysSchema, tables.config, {
    title: '配置',
    source: sources.mysql,
    attributes: {
        name: {
            type: {
                type: 'string',
                size: 64
            },
            unique: true,
            display: {
                headerName: '配置名',
                width: 300
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '数据',
                width: 300
            }
        }
    }
}), _defineProperty(_SysSchema, tables.role, {
    title: '角色',
    source: sources.mysql,
    attributes: {
        name: {
            type: {
                type: 'string',
                size: 64,
                weight: 120
            },
            display: {
                headerName: '角色名',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.userRole, {
    title: '用户角色',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '用户',
                weight: 120
            }
        },
        role: {
            type: 'ref',
            ref: tables.role,
            display: {
                headerName: '角色',
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.messageType, {
    title: '消息类型',
    source: sources.mysql,
    // static: true,
    attributes: {
        name: {
            type: 'text',
            display: {
                headerName: '标题',
                width: 100
            }
        },
        weight: {
            type: {
                type: 'int',
                size: 1
            },
            required: true,
            display: {
                headerName: '权重',
                width: 100
            }
        },
        title: {
            type: 'text',
            display: {
                headerName: '标题',
                width: 100,
                weight: 120
            }
        },
        content: {
            type: 'text',
            display: {
                headerName: '内容',
                width: 200,
                weight: 120
            }
        },
        entity: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '对象',
                width: 100,
                weight: 120
            }
        },
        operation: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '操作',
                width: 100,
                weight: 120
            }
        },
        signName: {
            type: 'text',
            display: {
                headerName: '签名',
                width: 100
            }
        },
        url: {
            type: 'text',
            display: {
                headerName: '跳转链接',
                width: 300,
                weight: 120
            }
        },
        props: {
            type: 'object',
            display: {
                headerName: '属性',
                width: 400
            }
        }
    }
}), _defineProperty(_SysSchema, tables.message, {
    title: '消息',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '用户',
                width: 100,
                weight: 120
            }
        },
        type: {
            type: 'ref',
            ref: tables.messageType,
            required: true,
            display: {
                headerName: '消息类型',
                width: 100,
                weight: 120
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '透传数据',
                width: 100
            }
        },
        props: {
            type: 'object',
            display: {
                headerName: '属性',
                width: 130,
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 1
            },
            required: true,
            display: {
                headerName: '推送状态',
                width: 100,
                weight: 120
            }
        },
        signName: {
            type: 'text',
            display: {
                headerName: '签名',
                width: 100
            }
        },
        tryTimes: {
            type: {
                type: 'int',
                size: 2
            },
            default: 0,
            required: true,
            display: {
                headerName: '尝试次数',
                width: 30
            }
        },
        // 用于外部事务标识，以达到数据的最终一致性
        txnUuid: {
            type: 'array',
            display: {
                headerName: '外部事物号',
                hide: true
            }
        },
        txnState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '外部事务状态'
            }
        },
        url: {
            type: 'text',
            display: {
                headerName: '跳转链接',
                width: 300,
                weight: 120
            }
        }
    },
    indexes: {
        index_userId: {
            columns: {
                userId: 1
            }
        },
        index_typeId: {
            columns: {
                typeId: 1
            }
        },
        indexTxnState: {
            columns: {
                txnState: 1
            }
        },
        index_state_create: {
            columns: {
                _createAt_: 1,
                state: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.captcha, {
    title: '验证码',
    source: sources.mysql,
    attributes: {
        mobile: {
            type: {
                type: 'string',
                size: 24
            },
            required: true,
            display: {
                headerName: '手机号',
                width: 240,
                weight: 200
            }
        },
        captcha: {
            type: {
                type: 'string',
                size: 6
            },
            required: true,
            display: {
                headerName: '验证码',
                width: 240,
                weight: 180
            }
        },
        expired: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '是否过期',
                width: 240
            }
        },
        expiredAt: {
            type: 'date',
            display: {
                headerName: '实际过期时间',
                width: 240
            }
        },
        expiredBy: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '过期原因',
                width: 240
            }
        }
    },
    indexes: {
        indexMobileExpired: {
            columns: {
                mobile: 1,
                expired: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.dangerous, {
    title: '危险操作',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '相关用户',
                weight: 200
            }
        },
        message: {
            type: 'text',
            display: {
                headerName: '操作信息',
                width: 300,
                weight: 190
            }
        },
        mark: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '危险分值',
                width: 220,
                weight: 180
            }
        }
    }
}), _defineProperty(_SysSchema, tables.order, {
    title: '订单',
    source: sources.mysql,
    attributes: {
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '实际价格',
                width: 100,
                weight: 105
            }
        },
        deadline: {
            type: 'date',
            display: {
                headerName: '付款截止（已经废弃）',
                width: 150
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '状态',
                width: 100,
                weight: 104,
                cellRenderer: 'renderOrderState'
            }
        },
        payer: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '付款者',
                width: 200,
                weight: 103
            }
        },
        receiver: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '收款者',
                width: 200,
                weight: 102
            }
        },
        autoPay: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '自动支付',
                width: 100
            }
        },
        mustPay: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '必须支付',
                width: 100
            }
        },
        // 可提取时间
        extractableAfter: {
            type: 'date',
            display: {
                headerName: '可提取',
                width: 200
            }
        },
        // 可使用时间
        availableAfter: {
            type: 'date',
            display: {
                headerName: '可使用',
                width: 200
            }
        },
        title: {
            type: 'text',
            required: true,
            display: {
                headerName: '标题',
                width: 150
            }
        },
        desc: {
            type: 'text',
            display: {
                headerName: '描述',
                width: 200
            }
        },
        callback: {
            type: 'text',
            display: {
                headerName: '回调',
                hide: true
            }
        },
        txnUuid: {
            type: 'array',
            display: {
                headerName: '外部事务号',
                hide: true
            }
        },
        image: {
            type: 'text',
            display: {
                headerName: '图片',
                width: 200,
                cellRenderer: 'renderImg'
            }
        },
        type: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '类别',
                width: 120
            }
        },
        groupBy: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '成组',
                hide: true
            }
        },
        closedBy: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '关闭理由',
                hide: true
            }
        },
        outDateAt: {
            type: 'date',
            display: {
                headerName: '过期时间',
                hide: true
            }
        },
        consumed: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            display: {
                headerName: '已消耗的金额（红包）',
                width: 100,
                weight: 105
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '非结构化数据信息'
            }
        },
        refunded: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            default: 0,
            display: {
                headerName: '已退款部分',
                width: 100,
                weight: 105
            }
        },
        toBeRefunded: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            default: 0,
            display: {
                headerName: '待退款部分',
                width: 100,
                weight: 105
            }
        }
    },
    indexes: {
        indexStateDeadline: {
            columns: {
                state: 1,
                deadline: 1
            }
        },
        indexExtractableAfter: {
            columns: {
                extractableAfter: 1
            }
        },
        indexAvailableAfter: {
            columns: {
                availableAfter: 1
            }
        },
        indexOutDateAt: {
            columns: {
                outDateAt: 1
            }
        },
        indexGroupBy: {
            columns: {
                groupBy: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.pay, {
    title: '支付',
    source: sources.mysql,
    attributes: {
        state: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '状态',
                width: 100,
                weight: 120,
                cellRenderer: 'renderPayState'
            }
        },
        type: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '类型',
                width: 100,
                weight: 120,
                cellRenderer: 'renderPayType'
            }
        },
        origin: {
            type: {
                type: 'string',
                size: 16,
                weight: 105
            },
            display: {
                headerName: '支付途径',
                width: 140,
                weight: 110,
                cellRenderer: 'renderPayOrigin'
            }
        },
        clientReturn: {
            type: 'object',
            display: {
                headerName: '客户端返回结果',
                width: 200
            }
        },
        closedBy: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '关闭原因',
                hide: true
            }
        },
        refundLine: {
            type: 'date',
            display: {
                headerName: '退款期限',
                width: 200
            }
        },
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '价格',
                width: 100,
                weight: 120
            }
        },
        extras: {
            type: 'object',
            display: {
                headerName: '额外信息',
                width: 100
            }
        },
        externalPayInfo: {
            type: 'object',
            display: {
                headerName: '外部支付信息',
                width: 100
            }
        },
        trade_no: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '支付宝交易号',
                width: 120
            }
        }
    },
    indexes: {
        indexState: {
            columns: {
                state: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.orderPay, {
    title: '订单支付',
    source: sources.mysql,
    attributes: {
        order: {
            type: 'ref',
            ref: tables.order,
            display: {
                headerName: '订单',
                width: 120,
                weight: 120
            }
        },
        pay: {
            type: 'ref',
            ref: tables.pay,
            display: {
                headerName: '支付',
                width: 120,
                weight: 115
            }
        }
    },
    indexes: {
        indexOrderPay: {
            columns: {
                orderId: 1,
                payId: 1
            },
            options: {
                unique: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.account, {
    title: '帐户',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '用户',
                width: 150,
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            default: userConstant.userState.normal,
            display: {
                headerName: '状态',
                width: 70,
                weight: 120
            }
        },
        balance: {
            type: {
                type: 'num',
                M: 16,
                D: 2
            },
            required: true,
            default: 0.0,
            display: {
                headerName: '余额',
                width: 120,
                weight: 119
            }
        },
        balanceExtractable: {
            type: {
                type: 'num',
                M: 16,
                D: 2
            },
            required: true,
            default: 0.0,
            display: {
                headerName: '可提现余额',
                width: 120,
                weight: 119
            }
        },
        callback: {
            type: 'text',
            display: {
                headerName: '回调',
                hide: true
            }
        },
        txnUuid: {
            type: 'array',
            display: {
                headerName: '外部事务号',
                hide: true
            }
        }
    }
}), _defineProperty(_SysSchema, tables.withDrawMethod, {
    title: '提现途径',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '用户',
                width: 160,
                weight: 121
            }
        },
        type: {
            type: {
                type: 'string',
                size: 32
            },
            required: true,
            display: {
                headerName: '种类',
                width: 160,
                weight: 120
            }
        },
        disabled: {
            type: 'boolean',
            display: {
                headerName: '是否禁用',
                width: 140,
                weight: 101
            }
        },
        account: {
            type: 'text',
            display: {
                headerName: '帐号',
                width: 180,
                weight: 111
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '信息',
                width: 180,
                weight: 105
            }
        },
        isDefault: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '是否默认',
                width: 100,
                weight: 120
            }
        }
    },
    indexes: {
        indexType: {
            columns: {
                type: 1
            }
        },
        indexDisabled: {
            columns: {
                disabled: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.withDraw, {
    title: '提现',
    source: sources.mysql,
    attributes: {
        method: {
            type: 'ref',
            ref: tables.withDrawMethod,
            display: {
                headerName: '提现途径',
                width: 200,
                weight: 120
            }
        },
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '金额',
                width: 120,
                weight: 119
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '状态',
                width: 120,
                weight: 180
            }
        },
        outTradeNo: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '交易号',
                width: 200
            }
        },
        reason: {
            type: 'text',
            display: {
                headerName: '失败原因',
                width: 200
            }
        }
    },
    indexes: {
        indexState: {
            columns: {
                state: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.refund, {
    title: '退款',
    source: sources.mysql,
    attributes: {
        pay: {
            type: 'ref',
            ref: tables.pay,
            required: true,
            display: {
                headerName: '支付',
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '状态',
                weight: 120,
                cellRenderer: 'renderPayState'
            }
        },
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '价格',
                width: 100,
                weight: 120
            }
        },
        // 用于外部事务标识，以达到数据的最终一致性
        txnUuid: {
            type: 'array',
            display: {
                headerName: '外部事务号',
                hide: true
            }
        },
        txnState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '外部事务状态'
            }
        }
    },
    indexes: {
        indexTxnState: {
            columns: {
                txnState: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.compensate, {
    title: '补偿',
    source: sources.mysql,
    attributes: {
        pay: {
            type: 'ref',
            ref: tables.pay,
            required: true,
            display: {
                headerName: '支付',
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '状态',
                weight: 120,
                cellRenderer: 'renderPayState'
            }
        },
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '价格',
                width: 100,
                weight: 120
            }
        },
        txnState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '外部事务状态'
            }
        }
    },
    indexes: {
        indexTxnState: {
            columns: {
                txnState: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.orderRefund, {
    title: '订单退款',
    source: sources.mysql,
    attributes: {
        order: {
            type: 'ref',
            ref: tables.order,
            required: true,
            display: {
                headerName: '订单',
                weight: 120
            }
        },
        refund: {
            type: 'ref',
            ref: tables.refund,
            required: true,
            display: {
                headerName: '退款',
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.orderCompensate, {
    title: '订单退款',
    source: sources.mysql,
    attributes: {
        order: {
            type: 'ref',
            ref: tables.order,
            required: true,
            display: {
                headerName: '订单',
                weight: 120
            }
        },
        compensate: {
            type: 'ref',
            ref: tables.compensate,
            required: true,
            display: {
                headerName: '补偿',
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.remoteAccess, {
    title: '外部接口访问',
    source: sources.mysql,
    attributes: {
        name: {
            type: {
                type: 'string',
                size: 64
            },
            required: true,
            display: {
                headerName: '调用名称',
                width: 100,
                weight: 130
            }
        },
        url: {
            type: 'text',
            required: true,
            display: {
                headerName: '调用URL',
                width: 100,
                weight: 120
            }
        },
        body: {
            type: 'text',
            display: {
                headerName: '调用内容',
                width: 100
            }
        },
        cost: {
            type: 'int',
            required: true,
            display: {
                headerName: '耗时',
                width: 80
            }
        },
        relation: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '相关对象',
                width: 100
            }
        },
        relateRowId: {
            type: {
                type: 'int',
                size: 8
            },
            display: {
                headerName: '相关行主键',
                width: 40
            }
        },
        httpCode: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: 'http返回状态',
                width: 100,
                weight: 130
            }
        },
        resultHeader: {
            type: 'text',
            display: {
                headerName: '返回头',
                width: 200
            }
        },
        resultBody: {
            type: 'text',
            display: {
                headerName: '返回内容',
                width: 100
            }
        },
        success: {
            type: 'boolean',
            display: {
                headerName: '是否成功',
                width: 20
            }
        }
    }
}), _defineProperty(_SysSchema, tables.remoteCallback, {
    title: '外部系统回调',
    source: sources.mysql,
    attributes: {
        name: {
            type: {
                type: 'string',
                size: 64
            },
            required: true,
            display: {
                headerName: '调用名称',
                width: 100,
                weight: 130
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '原始数据'
            }
        },
        remark: {
            type: 'text',
            display: {
                headerName: '备注'
            }
        }
    }
}), _defineProperty(_SysSchema, tables.weChatUser, {
    title: '微信用户',
    source: sources.mysql,
    attributes: {
        openId: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: 'openId',
                width: 100,
                weight: 130
            }
        },
        accessToken: {
            type: {
                type: 'string',
                size: 256
            },
            display: {
                headerName: 'openId',
                width: 100,
                weight: 130
            }
        },
        sessionKey: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: 'sessionKey',
                width: 100,
                weight: 130
            }
        },
        expiresAt: {
            type: 'date',
            display: {
                headerName: '过期时间',
                width: 140
            }
        },
        refreshToken: {
            type: {
                type: 'string',
                size: 256
            },
            display: {
                headerName: 'openId',
                width: 100,
                weight: 130
            }
        },
        unionId: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: 'openId',
                width: 100,
                weight: 130
            }
        },
        origin: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '源',
                width: 140
            }
        }
    },
    indexes: {
        indexOriginOpenId: {
            columns: {
                origin: 1,
                openid: 1
            }
        },
        indexOriginUnionId: {
            columns: {
                origin: 1,
                unionId: 1
            }
        },
        indexOriginAccessToken: {
            columns: {
                origin: 1,
                accessToken: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.area, {
    'title': '地区表',
    source: sources.mysql,
    static: true,
    attributes: {
        areaName: {
            type: {
                type: 'string',
                size: 50
            },
            required: true,
            display: {
                headerName: '地区名称',
                width: 100,
                weight: 102
            }
        },
        parent: {
            type: 'ref',
            ref: tables.area,
            localColumnName: 'parentId',
            required: true,
            display: {
                headerName: '父地区',
                width: 100
            }
        },
        shortName: {
            type: {
                type: 'string',
                size: 50
            },
            required: true,
            display: {
                headerName: '地区简称',
                width: 100
            }
        },
        zipCode: {
            type: 'int',
            size: 11,
            display: {
                headerName: '邮编',
                width: 100
            }
        },
        pinYin: {
            type: {
                type: 'string',
                size: 100
            },
            display: {
                headerName: '拼音',
                width: 100
            }
        },
        level: {
            type: 'int',
            size: 1,
            required: true,
            display: {
                headerName: '层级',
                width: 100,
                weight: 101
            }
        },
        sort: {
            type: 'int',
            size: 3,
            required: true,
            display: {
                headerName: '排序',
                width: 100
            }
        }
    }
}), _defineProperty(_SysSchema, tables.orderAction, {
    'title': '订单状态操作',
    source: sources.mysql,
    attributes: {
        order: {
            type: 'ref',
            ref: tables.order,
            required: true,
            display: {
                headerName: '订单',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                cellRenderer: 'renderOrderState',
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                cellRenderer: 'renderOrderState',
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '操作者',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.payAction, {
    'title': '支付状态操作',
    source: sources.mysql,
    attributes: {
        pay: {
            type: 'ref',
            ref: tables.pay,
            required: true,
            display: {
                headerName: '支付',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                cellRenderer: 'renderPayState',
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                cellRenderer: 'renderPayState',
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '操作者',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.refundAction, {
    'title': '退款状态操作',
    source: sources.mysql,
    attributes: {
        refund: {
            type: 'ref',
            ref: tables.refund,
            required: true,
            display: {
                headerName: '退款',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                cellRenderer: 'renderRefundState',
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                cellRenderer: 'renderRefundState',
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '操作者',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.compensateAction, {
    'title': '补偿状态操作',
    source: sources.mysql,
    attributes: {
        compensate: {
            type: 'ref',
            ref: tables.compensate,
            required: true,
            display: {
                headerName: '补偿',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                cellRenderer: 'renderCompensateState',
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                cellRenderer: 'renderCompensateState',
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '操作者',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.accountAction, {
    'title': '帐户余额变化',
    source: sources.mysql,
    attributes: {
        account: {
            type: 'ref',
            ref: tables.account,
            display: {
                headerName: '帐户',
                width: 200,
                weight: 120
            }
        },
        amount: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '余额变化',
                width: 100,
                weight: 120
            }
        },
        amountExtractable: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '可提现余额变化',
                width: 100,
                weight: 120
            }
        },
        origin: {
            type: {
                type: 'string',
                size: 32
            },
            required: true,
            display: {
                headerName: '来源',
                width: 100,
                weight: 120
            }
        },
        relation: {
            type: {
                type: 'string',
                size: 32
            },
            required: true,
            display: {
                headerName: '关联对象',
                width: 100
            }
        },
        relationRowId: {
            type: {
                type: 'int',
                size: 8
            },
            required: true,
            display: {
                headerName: '关联对象编号',
                width: 100
            }
        },
        balanceBefore: {
            type: {
                type: 'num',
                M: 16,
                D: 2
            },
            required: true,
            default: 0.0,
            display: {
                headerName: '流水前余额',
                width: 120,
                weight: 119
            }
        },
        balanceExtractableBefore: {
            type: {
                type: 'num',
                M: 16,
                D: 2
            },
            required: true,
            default: 0.0,
            display: {
                headerName: '流水前可提现余额',
                width: 120,
                weight: 119
            }
        }
    }
}), _defineProperty(_SysSchema, tables.agreement, {
    title: '赞同',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '用户',
                width: 200,
                weight: 120
            }
        },
        name: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '投票项',
                width: 200,
                weight: 120
            }
        }
    },
    indexes: {
        nameUser: {
            columns: {
                name: 1,
                userId: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.token, {
    title: '外部临时令牌',
    source: sources.mysql,
    attributes: {
        accessToken: {
            type: {
                type: 'string',
                size: 64
            },
            require: true,
            unique: true,
            display: {
                headerName: '访问令牌',
                width: 300
            }
        },
        clientInfo: {
            type: 'object',
            display: {
                headerName: '客户端信息',
                width: 300,
                weight: 120
            }
        },
        expiredTime: {
            type: 'date',
            display: {
                headerName: '应过期时间',
                weight: 120
            }
        },
        expired: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '已过期',
                width: 120,
                weight: 120
            }
        },
        expiredAt: {
            type: 'date',
            display: {
                headerName: '过期时间',
                cellRenderer: 'renderDate'
            }
        },
        expiredBy: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '过期原因 ',
                width: 160
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '状态'
            }
        },
        user: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '用户',
                width: 140,
                weight: 110
            }
        },
        origin: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '账号类型',
                width: 300
            }
        }
    },
    indexes: {
        indexAccessTokenExpired: {
            columns: {
                accessToken: 1
            }
        }
    }
}), _defineProperty(_SysSchema, tables.user, {
    title: '用户',
    source: sources.mysql,
    attributes: {
        mobile: {
            type: {
                type: 'string',
                size: 24
            },
            display: {
                headerName: '手机号',
                width: 120,
                weight: 200
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            default: userConstant.userState.normal,
            display: {
                headerName: '状态',
                width: 70,
                weight: 120
            }
        },
        activeAt: {
            type: 'date',
            display: {
                headerName: '最近活跃时间'
            }
        },
        disableReason: {
            type: 'text',
            display: {
                headerName: '禁用原因',
                hide: true,
                width: 200
            }
        },
        dangerousCoefficient: {
            type: 'int',
            default: 1,
            display: {
                headerName: '危险系数',
                width: 70
            }
        },
        extraId: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '外部唯一ID',
                width: 300
            }
        },
        nickname: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '昵称',
                width: 120,
                weight: 120
            }
        },
        gender: {
            type: {
                type: 'enum',
                values: ['男', '女', '未知']
            },
            display: {
                headerName: '性别',
                width: 70,
                weight: 120
            }
        },
        head: {
            type: 'img',
            display: {
                headerName: '头像',
                width: 120
            }
        },
        city: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '城市',
                width: 300
            }
        },
        province: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '省份',
                width: 300
            }
        },
        country: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '国家',
                width: 300
            }
        },
        extraInfo: {
            type: 'object',
            display: {
                headerName: '额外信息'
            }
        }
    }
}), _defineProperty(_SysSchema, tables.sku, {
    title: '商品类型',
    source: sources.mysql,
    attributes: {
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '货主',
                width: 200,
                weight: 120
            }
        },
        name: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '产品全名',
                width: 200,
                weight: 120
            }
        },
        briefName: {
            type: {
                type: 'string',
                size: 8
            },
            display: {
                headerName: '产品简名',
                width: 200,
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            default: 1,
            display: {
                headerName: '是否可用',
                width: 200,
                weight: 120
            }
        },
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '价格',
                width: 100,
                weight: 120
            }
        },
        originalPrice: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '折前价格',
                width: 100
            }
        },
        cost: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '成本',
                width: 100,
                weight: 120
            }
        },
        refundLine: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '允许退货时限',
                width: 40,
                weight: 101
            }
        },
        params: {
            type: 'object',
            display: {
                headerName: '其他参数',
                width: 200
            }
        },
        isCarousel: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '是否轮播',
                width: 100,
                weight: 120
            }
        },
        transitParam: {
            type: 'object',
            display: {
                headerName: '物流参数'
            }
        },
        warehouse: {
            type: 'ref',
            ref: tables.area,
            display: {
                headerName: '发货地址',
                width: 200,
                weight: 101
            }
        }
    }
}), _defineProperty(_SysSchema, tables.skuAction, {
    'title': '商品状态操作',
    source: sources.mysql,
    attributes: {
        sku: {
            type: 'ref',
            ref: tables.sku,
            required: true,
            display: {
                headerName: '商品',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '用户',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.skuAvatar, {
    title: '商品类型照片',
    source: sources.mysql,
    attributes: {
        sku: {
            type: 'ref',
            ref: tables.sku,
            required: true,
            display: {
                headerName: '商品类型',
                width: 300,
                weight: 120
            }
        },
        url: {
            type: 'image',
            display: {
                headerName: '图片',
                width: 400,
                weight: 120
            }
        },
        first: {
            type: 'boolean',
            display: {
                headerName: '是否首图',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.trade, {
    'title': '商品购买申请',
    source: sources.mysql,
    attributes: {
        price: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '价格',
                width: 100,
                weight: 120
            }
        },
        transitCost: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            required: true,
            display: {
                headerName: '物流价格',
                width: 100,
                weight: 120
            }
        },
        order: {
            type: 'ref',
            ref: tables.order,
            display: {
                headerName: '订单',
                width: 200,
                weight: 120
            }
        },
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '用户',
                width: 200,
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '申请状态',
                width: 120,
                weight: 180
            }
        },
        sku: {
            type: 'ref',
            ref: tables.sku,
            required: true,
            display: {
                headerName: '商品类型',
                width: 200,
                weight: 120
            }
        },
        address: {
            type: 'ref',
            ref: tables.address,
            display: {
                headerName: '收货地址',
                width: 200,
                weight: 120
            }
        },
        params: {
            type: 'object',
            display: {
                headerName: '参数',
                width: 200
            }
        },
        transit: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '物流',
                width: 200
            }
        },
        transitNo: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: '物流编号',
                width: 200
            }
        },
        finishLine: {
            type: 'date',
            display: {
                headerName: '关闭时间',
                width: 200
            }
        },
        number: {
            type: 'int',
            display: {
                headerName: '商品数量',
                width: 500,
                weight: 120
            }
        },
        remark: {
            type: 'text',
            display: {
                headerName: '备注',
                width: 250,
                weight: 120
            }
        },
        evaluate: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '评价',
                width: 120,
                weight: 180
            }
        },
        comment: {
            type: 'text',
            display: {
                headerName: '评论',
                width: 250,
                weight: 120
            }
        },
        groupBy: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '成组',
                hide: true
            }
        }
    }
}), _defineProperty(_SysSchema, tables.tradeAction, {
    'title': '商品购买状态操作',
    source: sources.mysql,
    attributes: {
        trade: {
            type: 'ref',
            ref: tables.trade,
            required: true,
            display: {
                headerName: '申请',
                width: 200,
                weight: 120
            }
        },
        prevState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '前状态',
                width: 200,
                weight: 120
            }
        },
        nextState: {
            type: {
                type: 'int',
                size: 2
            },
            required: true,
            display: {
                headerName: '后状态',
                width: 200,
                weight: 120
            }
        },
        extraData: {
            type: 'object',
            display: {
                headerName: '额外状态',
                width: 160,
                weight: 101
            }
        },
        operator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '用户',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_SysSchema, tables.address, {
    'title': '商品购买收货地址',
    source: sources.mysql,
    attributes: {
        consignee: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '收货人',
                width: 200,
                weight: 120
            }
        },
        mobile: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '手机号',
                width: 200,
                weight: 120
            }
        },
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '用户',
                width: 200,
                weight: 120
            }
        },
        detail: {
            type: 'text',
            required: true,
            display: {
                headerName: '收货地址',
                width: 120,
                weight: 180
            }
        },
        area: {
            type: 'ref',
            ref: tables.area,
            display: {
                headerName: '地区',
                width: 120,
                weight: 180
            }
        },
        code: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '邮政编号',
                width: 200,
                weight: 120
            }
        },
        isDefault: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '是否默认',
                width: 100,
                weight: 120
            }
        }
    }
}), _SysSchema);

module.exports = SysSchema;