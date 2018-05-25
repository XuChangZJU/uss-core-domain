'use strict';

var _BusinessSchema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
/**
 * 与业务相关的表定义写在这个文件里
 */
var assign = require('lodash/assign');
var tables = require('./tables');
var sources = require('./sources');
var SysSchema = require('../sysSchema');

var BusinessSchema = (_BusinessSchema = {}, _defineProperty(_BusinessSchema, tables.station, {
    title: '工作站',
    source: sources.mysql,
    attributes: {
        type: {
            type: {
                type: 'int',
                size: 1
            },
            display: {
                headerName: '类型',
                width: 100,
                weight: 120
            }
        },
        state: {
            type: {
                type: 'int',
                size: 1
            },
            display: {
                headerName: '状态',
                width: 100,
                weight: 120
            }
        },
        name: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '名称',
                width: 200,
                weight: 120
            }
        },
        briefName: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '简称',
                width: 200,
                weight: 120
            }
        },
        poiName: {
            type: 'text',
            display: {
                headerName: '地址',
                width: 400,
                weight: 101
            }
        },
        options: {
            type: 'object',
            display: {
                headerName: '配置',
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
        loc: {
            type: "geo",
            required: true,
            display: {
                headerName: "坐标",
                hide: true
            }
        },
        lat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '纬度'
            }
        },
        lng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '经度'
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.stationWorker, {
    title: '工作站用户关联',
    source: sources.mysql,
    attributes: {
        state: {
            type: {
                type: 'int',
                size: 1
            },
            display: {
                headerName: '状态',
                width: 100,
                weight: 120
            }
        },
        station: {
            type: 'ref',
            ref: tables.station,
            required: true,
            display: {
                headerName: '工作站',
                width: 200,
                weight: 120
            }
        },
        worker: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '工作人员',
                width: 200,
                weight: 120
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.vehicleStyle, {
    title: '车辆型号',
    source: sources.mysql,
    attributes: {
        manufacture: {
            type: {
                type: 'string',
                size: 24
            },
            display: {
                headerName: '制造商',
                width: 140,
                weight: 120
            }
        },
        brand: {
            type: {
                type: 'string',
                size: 24
            },
            display: {
                headerName: '系列',
                width: 140,
                weight: 120
            }
        },
        spec: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '规格',
                width: 140,
                weight: 102
            }
        }
    },
    indexes: {
        idx_ft: {
            options: {
                fulltext: true,
                ngram: true
            },
            columns: {
                manufacture: "text",
                brand: "text"
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.vehicle, {
    title: '车辆',
    source: sources.mysql,
    attributes: {
        style: {
            type: 'ref',
            ref: tables.vehicleStyle,
            display: {
                headerName: '型号',
                width: 150,
                weight: 120
            }
        },
        number: {
            type: {
                type: 'string',
                size: 11
            },
            display: {
                headerName: '车架后6位',
                width: 120,
                weight: 120
            }
        },
        birthday: {
            type: 'date',
            display: {
                headerName: '上牌日期'
            }
        },
        ownerName: {
            type: {
                type: 'string',
                size: 32
            },
            display: {
                headerName: '车主姓名'
            }
        },
        license: {
            type: {
                type: 'string',
                size: 10
            },
            unique: true,
            display: {
                headerName: '车牌号',
                width: 140,
                weight: 120
            }
        },
        color: {
            type: {
                type: 'string',
                size: 8
            },
            display: {
                headerName: '颜色'
            }
        },
        creator: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '创建者',
                width: 200
            }
        }
    },
    indexes: {
        idx_license: {
            columns: {
                license: 1
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.location, {
    title: '地点',
    source: sources.mysql,
    attributes: {
        mobile: {
            type: {
                type: 'string',
                size: 11
            },
            display: {
                headerName: '电话',
                width: 140,
                weight: 120
            }
        },
        poiName: {
            type: 'text',
            display: {
                headerName: '地址',
                width: 400,
                weight: 101
            }
        },
        loc: {
            type: 'geo',
            display: {
                headerName: '坐标',
                hide: true
            }
        },
        lat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '纬度'
            }
        },
        lng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '经度'
            }
        },
        city: {
            type: 'ref',
            ref: tables.area,
            display: {
                headerName: '城市',
                width: 140,
                weight: 120
            }
        },
        contact: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '联系人',
                width: 140,
                weight: 120
            }
        },
        user: {
            type: 'ref',
            ref: tables.user,
            display: {
                headerName: '创建人',
                width: 220,
                weight: 105
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.agency, {
    title: '代理服务',
    source: sources.mysql,
    attributes: {
        type: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '类型',
                width: 100,
                weight: 120
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
                weight: 120
            }
        },
        user: {
            type: 'ref',
            ref: tables.user,
            required: true,
            display: {
                headerName: '申请人',
                width: 140,
                weight: 120
            }
        },
        station: {
            type: 'ref',
            ref: tables.station,
            display: {
                headerName: '服务站',
                width: 130,
                weight: 130
            }
        },
        vehicle: {
            type: 'ref',
            ref: tables.vehicle,
            display: {
                headerName: '车辆',
                width: 240,
                weight: 150
            }
        },
        fetch: {
            type: 'ref',
            ref: tables.location,
            display: {
                headerName: '取车',
                width: 200,
                weight: 120
            }
        },
        fetchTime: {
            type: 'date',
            display: {
                headerName: '时间',
                width: 120,
                weight: 120
            }
        },
        revert: {
            type: 'ref',
            ref: tables.location,
            display: {
                headerName: '还车',
                width: 200,
                weight: 120
            }
        },
        revertTime: {
            type: 'date',
            display: {
                headerName: '时间',
                width: 120,
                weight: 120
            }
        },
        params: {
            type: 'object',
            display: {
                headerName: '参数',
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
            display: {
                headerName: '价格',
                width: 100,
                weight: 125
            }
        },
        priceDetail: {
            type: 'object',
            display: {
                headerName: '价格详情',
                width: 200,
                weight: 125
            }
        },
        fee: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            display: {
                headerName: '实际费用',
                width: 100,
                weight: 125
            }
        },
        feeDetail: {
            type: 'object',
            display: {
                headerName: '费用详情',
                width: 200,
                weight: 125
            }
        },
        order: {
            type: 'ref',
            ref: tables.order,
            display: {
                headerName: '订单',
                width: 400,
                weight: 180
            }
        },
        done: {
            type: 'boolean',
            required: true,
            default: false,
            display: {
                headerName: '是否服务过',
                width: 100,
                weight: 100
            }
        },
        city: {
            type: 'ref',
            ref: tables.area,
            required: true,
            display: {
                headerName: '城市',
                width: 200,
                weight: 100
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.agencyAction, {
    title: '服务状态操作',
    source: sources.mysql,
    attributes: {
        agency: {
            type: 'ref',
            ref: tables.agency,
            required: true,
            display: {
                headerName: '服务',
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
}), _defineProperty(_BusinessSchema, tables.driverProxy, {
    title: '代驾',
    source: sources.mysql,
    attributes: {
        source: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '服务提供商',
                width: 150,
                weight: 120
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
                weight: 120
            }
        },
        driverName: {
            type: {
                type: 'string',
                size: 16
            },
            display: {
                headerName: '司机姓名',
                width: 100,
                weight: 120
            }
        },
        driverMob: {
            type: {
                type: 'string',
                size: 11
            },
            display: {
                headerName: '司机电话',
                width: 100,
                weight: 120
            }
        },
        data: {
            type: 'object',
            display: {
                headerName: '数据'
            }
        },
        txnUuid: {
            type: 'array',
            display: {
                headerName: '外部事务号',
                hide: true
            }
        },
        txnState: {
            type: {
                type: "int",
                size: 2
            },
            display: {
                headerName: "外部事务状态",
                hide: true
            }
        },
        externalOid: {
            type: {
                type: 'string',
                size: 64
            },
            display: {
                headerName: "外部Oid",
                hide: true
            }
        },
        agency: {
            type: 'ref',
            ref: tables.agency,
            display: {
                headerName: '相关服务',
                width: 100,
                weight: 120
            }
        },
        type: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '类别',
                width: 150,
                weight: 120
            }
        },
        startTime: {
            type: 'date',
            display: {
                headerName: '出发时间',
                width: 180
            }
        },
        startLoc: {
            type: 'geo',
            display: {
                headerName: '起始位置坐标',
                hide: true
            }
        },
        startLat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '起始位置纬度'
            }
        },
        startLng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '起始位置经度'
            }
        },
        endLoc: {
            type: 'geo',
            display: {
                headerName: '结束位置坐标',
                hide: true
            }
        },
        endLat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '结束位置纬度'
            }
        },
        endLng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '结束位置经度'
            }
        },
        startPoiAddress: {
            type: 'text',
            display: {
                headerName: '起始位置POI',
                width: 200
            }
        },
        startPoiName: {
            type: 'text',
            display: {
                headerName: '起始位置POI名称',
                width: 200
            }
        },
        endPoiAddress: {
            type: 'text',
            display: {
                headerName: '结束位置POI',
                width: 200
            }
        },
        endPoiName: {
            type: 'text',
            display: {
                headerName: '结束位置POI名称',
                width: 200
            }
        },
        startMob: {
            type: {
                type: 'string',
                size: 24
            },
            display: {
                headerName: '起始位置联系人',
                width: 120,
                weight: 200
            }
        },
        endMob: {
            type: {
                type: 'string',
                size: 24
            },
            display: {
                headerName: '结束位置联系人',
                width: 120,
                weight: 200
            }
        },
        license: {
            type: {
                type: 'string',
                size: 10
            },
            display: {
                headerName: '车牌号',
                width: 140,
                weight: 120
            }
        },
        color: {
            type: {
                type: 'string',
                size: 8
            },
            display: {
                headerName: '颜色'
            }
        },
        fee: {
            type: {
                type: 'num',
                M: 8,
                D: 2
            },
            display: {
                headerName: '费用',
                width: 100,
                weight: 140
            }
        },
        feeDetail: {
            type: 'object',
            display: {
                headerName: '费用详情',
                width: 150
            }
        },
        distance: {
            type: {
                type: 'num',
                M: 8,
                D: 4
            },
            display: {
                headerName: '行驶距离',
                width: 100,
                weight: 140
            }
        },
        driveTime: {
            type: {
                type: 'int',
                size: 8
            },
            display: {
                headerName: '行驶时间',
                width: 100,
                weight: 140
            }
        },
        payState: {
            type: {
                type: 'int',
                size: 2
            },
            display: {
                headerName: '付款状态',
                width: 150,
                weight: 120
            }
        },
        driverInfo: {
            type: 'object',
            display: {
                headerName: '第三方司机详情',
                width: 150
            }
        },
        drivingRoad: {
            type: 'object',
            display: {
                headerName: '第三方行驶详情',
                width: 250
            }
        }
    },
    indexes: {
        indexTxnState: {
            columns: {
                txnState: 1
            }
        },
        indexExternalOid: {
            columns: {
                externalOid: 1
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.driverProxyAction, {
    title: '代驾状态操作',
    source: sources.mysql,
    attributes: {
        driverProxy: {
            type: 'ref',
            ref: tables.driverProxy,
            required: true,
            display: {
                headerName: '代驾',
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
}), _defineProperty(_BusinessSchema, tables.userVehicle, {
    title: '用户车辆关联',
    source: sources.mysql,
    attributes: {
        vehicle: {
            type: 'ref',
            ref: tables.station,
            required: true,
            display: {
                headerName: '车辆',
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
        }
    }
}), _defineProperty(_BusinessSchema, tables.cxbConfiguration, {
    title: '配置数据',
    source: sources.mysql,
    static: true,
    attributes: {
        name: {
            type: {
                type: "string",
                size: 64
            },
            unique: true,
            display: {
                headerName: "名称",
                width: 200
            }
        },
        data: {
            type: "object",
            display: {
                headerName: "数据",
                width: 300
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.cityGeoCache, {
    title: '城市坐标查询缓存',
    source: sources.mysql,
    static: true,
    attributes: {
        maxLng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '经度上限'
            }
        },
        minLng: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '经度下限'
            }
        },
        maxLat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '纬度上限'
            }
        },
        minLat: {
            type: {
                type: 'num',
                M: 12,
                D: 8
            },
            required: true,
            display: {
                headerName: '纬度下限'
            }
        },
        city: {
            type: 'ref',
            ref: tables.area,
            display: {
                headerName: '城市'
            }
        }
    }
}), _defineProperty(_BusinessSchema, tables.cityIpCache, {
    title: '城市Ip查询缓存',
    source: sources.mysql,
    static: true,
    attributes: {
        ip: {
            type: 'string',
            display: {
                headerName: 'IP'
            }
        },
        city: {
            type: 'ref',
            ref: tables.area,
            display: {
                headerName: '城市'
            }
        }
    },
    indexes: {
        ipCity: {
            columns: {
                ip: 1,
                cityId: 1
            }
        }
    }
}), _BusinessSchema);

module.exports = assign({}, SysSchema, BusinessSchema);