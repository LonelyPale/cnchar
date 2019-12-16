var version = require('./version');
var {spell, stroke, arg, has, _throw, _wran, dealUpLowFirst, removeTone, sumStroke, isCnChar, checkArgs, initCnchar} = require('./tool');
var dict = require('./dict');

function _spell (...args) {
    return spell(dict.spell, args);
}
function _stroke (...args) {
    return stroke(dict.stroke, args);
}

function init () {
    String.prototype.spell = function (...args) {
        return _spell(this, ...args);
    };
    String.prototype.stroke = function (...args) {
        return _stroke(this, ...args);
    };
}
function use (...plugins) {
    plugins.forEach(f => {
        if (typeof f === 'function') {
            f(cnchar);
        }
    });
}
init();

let cnchar = {
    version,
    spell: _spell,
    stroke: _stroke,
    check: true,
    _origin: {
        spell: _spell,
        stroke: _stroke,
    },
    plugins: [],
    use,
    _: {arg, has, _throw, _wran, dealUpLowFirst, removeTone, sumStroke, isCnChar, checkArgs, dict: {}},
    type: {
        spell: arg,
        stroke: {
            array: arg.array
        }
    }
};

if (typeof window !== 'undefined') {
    window.cnchar = window.CnChar = cnchar;
}
initCnchar(cnchar);
module.exports = cnchar;