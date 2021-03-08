/**
 * Created by Administrator on 2016/8/31.
 */
// destruct request query
"use strict";
const assign = require("lodash/assign");

function destructRequestOptions(req) {
	let result = assign({}, req.query);
	if(result.indexFrom) {
		result.indexFrom = parseInt(result.indexFrom, 10);
	}
	if(result.count) {
		result.count = parseInt(result.count, 10);
	}
	if(result.query) {
		result.query = JSON.parse(result.query);
	}
	if(result.sort) {
		result.sort = JSON.parse(result.sort);
	}
	if (result.projection) {
		result.projection = JSON.parse(result.projection);
	}
	if (result.groupBy) {
		result.groupBy = JSON.parse(result.groupBy);
	}
	result.user = req._user;
	result.clientInfo = req._clientInfo;
	result.appName = req._appName;
	result.systemId = req._systemId;
	result.tokenId = req._tokenId;
	result.isRoot = req._isRoot;

	let ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip || '';
	if (ip.indexOf(',') !== -1) {
		ip = ip.split(',')[0];
	}
	if (ip.indexOf('fff:') !== -1) {
		ip = ip.slice(ip.indexOf("fff:") + 4);
	}
	result.ip = ip;

	if(req.headers['coordinate']) {
		result.coordinate = req.headers['coordinate'];
	}

	return result;
}

function mappingReqToMetadata(req, params = {}) {
	const requestOptions = destructRequestOptions(req);
	const options = assign({}, requestOptions, params);
    const metadata = {
		coordinate: options.coordinate,
		appName: options.appName,
		systemId: options.systemId,
		ip: options.ip,
		roleName: options.roleName,
	};
	return metadata;
}


module.exports = {
	destructRequestOptions,
	mappingReqToMetadata,
};

