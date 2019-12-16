var fs = require('fs');
var name = 'stroke-pos-fan';
var dict = require(`./${name}.json`);

function main () {
    for (var k in dict) {
        dict[k] = dict[k].split('#').map((item) => {
            return item.substring(item.indexOf(':') + 1).replace(/[\(\)]/g, '');
        }).join(';');
    }
    save(name, dict);
}
main();


function save (name, list) {
    fs.writeFile(name + '-out-min.json', JSON.stringify(list), function (err) {
        if (err) {
            throw err;
        }
    });
}