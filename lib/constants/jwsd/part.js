'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, type.hnmPreview, '课前预习'), (0, _defineProperty3.default)(_STRING, type.hnmVideo, '讲解视频'), (0, _defineProperty3.default)(_STRING, type.hnmExpand, '课后拓展'), (0, _defineProperty3.default)(_STRING, type.hnmAudio, '跟读音频'), _STRING);
    return STRING[t];
};

var getTypeBackground = function getTypeBackground(t) {
    var _COLOR;

    var COLOR = (_COLOR = {}, (0, _defineProperty3.default)(_COLOR, type.hnmPreview, 'deepskyblue'), (0, _defineProperty3.default)(_COLOR, type.hnmVideo, 'palegreen'), (0, _defineProperty3.default)(_COLOR, type.hnmExpand, 'wheat'), (0, _defineProperty3.default)(_COLOR, type.hnmAudio, 'pink'), _COLOR);
    return COLOR[t];
};

module.exports = {
    type: type,
    decodeType: decodeType,
    getTypeBackground: getTypeBackground
};