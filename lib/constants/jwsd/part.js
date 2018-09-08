'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/9/8.
 */
var type = {
    hnmPreview: 1, // 课前预习
    hnmVideo: 2, // 讲解视频
    hnmExpand: 3, // 课后拓展
    hnmAudio: 4 // 跟读录音
};

var decodeType = function decodeType(t) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, type.hnmPreview, '课前预习'), _defineProperty(_STRING, type.hnmVideo, '讲解视频'), _defineProperty(_STRING, type.hnmExpand, '课后拓展'), _defineProperty(_STRING, type.hnmAudio, '跟读音频'), _STRING);
    return STRING[t];
};

var getTypeBackground = function getTypeBackground(t) {
    var _COLOR;

    var COLOR = (_COLOR = {}, _defineProperty(_COLOR, type.hnmPreview, 'deepskyblue'), _defineProperty(_COLOR, type.hnmVideo, 'palegreen'), _defineProperty(_COLOR, type.hnmExpand, 'wheat'), _defineProperty(_COLOR, type.hnmAudio, 'pink'), _COLOR);
    return COLOR[t];
};

module.exports = {
    type: type,
    decodeType: decodeType,
    getTypeBackground: getTypeBackground
};