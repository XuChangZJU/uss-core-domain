'use strict';

var moment = require('moment');
function getUUID() {
    var uuid = moment.now().toString();
    var characters = [];
    for (var i = 48; i <= 57; i++) {
        // 0-9
        characters.push(String.fromCharCode(i));
    }
    for (var _i = 65; _i <= 90; _i++) {
        //A-Z
        characters.push(String.fromCharCode(_i));
    }
    for (var _i2 = 97; _i2 <= 122; _i2++) {
        //a-z
        characters.push(String.fromCharCode(_i2));
    }
    while (uuid.length < 32) {
        uuid += characters[Math.floor(Math.random() * characters.length)];
    }
    return uuid;
}

module.exports = {
    getUUID: getUUID
};