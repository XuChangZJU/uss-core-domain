'use strict';

var s = '\nreturn class A {\n    constructor(a, b) {\n        this.a = a;\n        this.b = b;\n    }\n\n    add() {\n        const assign = require(\'lodash/assign\');\n        return this.a + this.b;\n    }\n};\n';

var f = new Function('require', s);

/* const ff = new f(2, 3);

console.log(ff.add()); */
console.log(f(require));

var clazz = f(require);
var ff = new clazz(2, 3);
console.log(ff.add());