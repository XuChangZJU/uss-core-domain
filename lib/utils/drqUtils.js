/**
 * Created by Administrator on 2016/8/31.
 */
// destruct request query
"use strict";

var assign = require("lodash/assign");

function destructRequestOptions(req) {
	var result = assign({}, req.query);
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

	var ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip || '';
	if (ip.indexOf(',') !== -1) {
		ip = ip.split(',')[0];
	}
	if (ip.indexOf('fff:') !== -1) {
		ip = ip.slice(ip.indexOf("fff:") + 4);
	}
	result.ip = ip;

	return result;
}

module.exports = {
	destructRequestOptions: destructRequestOptions
};