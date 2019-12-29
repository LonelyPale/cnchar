let config = require('./test.config');
const chalk = require('chalk');

function green (txt) {
    console.log(chalk.green(txt));
}
function red (txt) {
    console.log(chalk.red(txt));
}
function blue (txt) {
    console.log(chalk.blue(txt));
}

function testSingle ({
    name, test, expect, args
}, argsConfig) {
    let result;
    if (args instanceof Array) {
        result = test.apply(argsConfig, args.map((item) => {
            return argsConfig[item];
        }));
    } else {
        result = test.call(argsConfig, argsConfig);
    }
    let res = {
        result,
        expect,
        name
    };
    if (typeof result !== typeof expect) {
        res.pass = false;
    } else {
        if (typeof res === 'object') {
            res.pass = objectEqual(result, expect);
        } else {
            res.pass = result === expect;
        }
    }
    return res;
};

function main (argsConfig) {
    blue('Test start:');
    config.forEach((item) => {
        let result = testSingle(item, argsConfig);
        if (result.pass) {
            green(`PASS: [${result.name}]; result:${JSON.stringify(result.result)}`);
        } else {
            red(`FAIL: [${result.name}]; result:${JSON.stringify(result.result)}; but expect: ${JSON.stringify(result.expect)}`);
        }
        console.log();
    });
}
function objectEqual (o1, o2) {
    return objectEqualBase(o1, o2) && objectEqualBase(o2, o1);
}

function objectEqualBase (result, expect) {
    // 数组与json都是用for in遍历
    // 数组需要下标一致
    let equal = true;
    for (let key in result) {
        let resultItem = result[key];
        let expectItem = expect[key];
        if (typeof resultItem !== typeof expectItem) {
            equal = false;
        } else if (typeof resultItem === 'object') {
            if (!objectEqual(resultItem, expectItem)) {
                equal = false;
            }
        } else if (resultItem !== expectItem) {
            equal = false;
        }
    }
    return equal;
}

function startTest (argsConfig) {
    main(argsConfig);
}
module.exports = startTest;
// console.log(cnchar.stroke('一个', 'order'));
// console.log(cnchar.stroke('長城', 'count', 'order', 'name'));
// console.log(cnchar.orderToWord(['横', '撇', '捺']));
// console.log('美好的地方'.spell('tone'));
// module.exports = cnchar
