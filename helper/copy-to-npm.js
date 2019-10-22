var gulp = require('gulp');
// var rename = require('gulp-rename');
var fs = require('fs');
let version = require('./version.json').version;
let files = [
    '../package.json',
    '../npm/order/package.json',
    '../npm/poly/package.json',
    '../npm/trad/package.json',
    '../npm/cnchar/package.json',
    '../npm/cnchar-all/package.json',
    '../npm/hanzi-util/package.json',
    '../npm/hanzi-util-base/package.json',
    // '../npm/cncharorder/package.json',
    // '../npm/cncharpoly/package.json',
    // '../npm/cnchartrad/package.json',
    // '../npm/cncharall/package.json',
]

function modVersion(){
    files.forEach(file=>{
        var package = require(file)
        package.version = version;
        fs.writeFile(file.substr(1), JSON.stringify(package,null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    })
}


function task(){
    modVersion();

    gulp.src(['src/main/*.*','README.md','LICENSE'])
        .pipe(gulp.dest('npm/cnchar'))

    gulp.src(['src/plugin/order/*.*','README.md','LICENSE'])
        .pipe(gulp.dest('npm/order'))

    gulp.src(['src/plugin/poly/*.*','README.md','LICENSE'])
        .pipe(gulp.dest('npm/poly'))

    gulp.src(['src/plugin/trad/*.*','README.md','LICENSE'])
        .pipe(gulp.dest('npm/trad'))

    gulp.src(['LICENSE'])
        .pipe(gulp.dest('npm/cnchar-all'))
        .pipe(gulp.dest('npm/hanzi-util'))
        .pipe(gulp.dest('npm/hanzi-util-base'))

}
task();