const moment = require('moment');
function getUUID(){
    let uuid = moment.now().toString();
    const characters = [];
    for (let i = 48 ; i <= 57; i ++){         // 0-9
        characters.push(String.fromCharCode(i));
    }
    for (let i = 65 ; i <= 90; i ++){       //A-Z
        characters.push(String.fromCharCode(i));
    }
    for (let i = 97 ; i <= 122; i ++){      //a-z
        characters.push(String.fromCharCode(i));
    }
    while(uuid.length < 32){
        uuid += characters[Math.floor(Math.random() * characters.length)];
    }
    return uuid;
}

module.exports = {
    getUUID
};