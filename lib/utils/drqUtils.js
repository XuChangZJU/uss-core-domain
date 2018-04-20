/**
 * Created by Administrator on 2016/8/31.
 */
// destruct request query
"use strict";

const assign = require("lodash/assign");

function destructRequestOptions(req) {
	let result = assign({}, req.query);
	if (result.indexFrom) {
		result.indexFrom = parseInt(result.indexFrom, 10);
	}
	if (result.count) {
		result.count = parseInt(result.count, 10);
	}
	if (result.query) {
		result.query = JSON.parse(result.query);
	}
	if (result.sort) {
		result.sort = JSON.parse(result.sort);
	}
	result.user = req._user;
	result.clientInfo = req._clientInfo;

	let ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '';
	if (ip.split(',').length > 0) {
		ip = ip.split(',')[0];
	}
	//  ::ffff:183.157.160.32
	ip = ip.slice(ip.indexOf("fff:") + 4, ip.length);
	result.ip = ip;

	return result;
}

module.exports = {
	destructRequestOptions
};