/**
 * Created by Administrator on 2018/9/8.
 */
const type = {
    hnmPreview: 1,     // 课前预习
    hnmVideo: 2,        // 讲解视频
    hnmExpand: 3,       // 课后拓展
    hnmAudio: 4,        // 跟读录音
};

const decodeType = (t) => {
    const STRING = {
        [type.hnmPreview]: '课前预习',
        [type.hnmVideo]: '讲解视频',
        [type.hnmExpand]: '课后拓展',
        [type.hnmAudio]: '跟读音频',
    };
    return STRING[t];
};

const getTypeBackground = (t) => {
    const COLOR = {
        [type.hnmPreview]: 'deepskyblue',
        [type.hnmVideo]: 'palegreen',
        [type.hnmExpand]: 'wheat',
        [type.hnmAudio]: 'pink',
    };
    return COLOR[t];
}

module.exports = {
    type,
    decodeType,
    getTypeBackground,
};
