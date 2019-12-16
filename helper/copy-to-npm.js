var gulp = require('gulp');
var rename = require('gulp-rename');
var fs = require('fs');
let version = require('../package.json').version;
let files = [
    '../npm/order/package.json',
    '../npm/poly/package.json',
    '../npm/trad/package.json',
    '../npm/cnchar/package.json',
    '../npm/cnchar-all/package.json',
    '../npm/hanzi-util/package.json',
    '../npm/hanzi-util-base/package.json',
];

function modVersion () {
    files.forEach(file => {
        let pkg = require(file);
        pkg.version = version;
        fs.writeFile(file.substr(1), JSON.stringify(pkg, null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    });
}
let depFiles = [
    '../npm/cnchar-all/package.json',
    '../npm/hanzi-util/package.json',
    '../npm/hanzi-util-base/package.json'
];

function modDep () {
    depFiles.forEach(file => {
        let pkg = require(file);
        let dep = pkg.dependencies;
        for (let key in dep) {
            if (key.substr(0, 6) === 'cnchar') {
                dep[key] = '^' + version;
            }
        }
        fs.writeFile(file.substr(1), JSON.stringify(pkg, null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    });
}

function task () {
    modVersion();
    modDep();

    gulp.src(['src/main/*.*', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('npm/cnchar'));

    gulp.src(['src/plugin/order/*.*', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('npm/order'));

    gulp.src(['src/plugin/poly/*.*', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('npm/poly'));

    gulp.src(['src/plugin/trad/*.*', 'README.md', 'LICENSE'])
        .pipe(gulp.dest('npm/trad'));

    gulp.src(['src/main/index.d.ts', 'LICENSE'])
        .pipe(gulp.dest('npm/cnchar-all'))
        .pipe(gulp.dest('npm/hanzi-util'))
        .pipe(gulp.dest('npm/hanzi-util-base'));
        
    gulp.src(`dist/*.${version}.min.js`)
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(version, 'latest');
            return path;
        }))
        .pipe(gulp.dest('dist'));
}
task();