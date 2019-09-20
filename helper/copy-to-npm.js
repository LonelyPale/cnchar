var gulp = require('gulp');
var rename = require('gulp-rename');
var fs = require('fs');
let version = require('./version.json').version;
let files = [
    '../package.json',
    '../npm/order/package.json',
    '../npm/poly/package.json',
    '../npm/trad/package.json',
    '../npm/cnchar/package.json',
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

    gulp.src('dist/cnchar.'+version+'.min.js')
        .pipe(rename(function(path){
            path.basename ='index';
            path.extname = ".js";
        }))
        .pipe(gulp.dest('npm/cnchar'))
    
    gulp.src('dist/cnchar.order.'+version+'.min.js')
        .pipe(rename(function(path){
            path.basename ='index';
            path.extname = ".js";
        }))
        .pipe(gulp.dest('npm/order'))
            
    gulp.src('dist/cnchar.poly.'+version+'.min.js')
        .pipe(rename(function(path){
            path.basename ='index';
            path.extname = ".js";
        }))
        .pipe(gulp.dest('npm/poly'))
        
    gulp.src('dist/cnchar.trad.'+version+'.min.js')
        .pipe(rename(function(path){
            path.basename ='index';
            path.extname = ".js";
        }))
        .pipe(gulp.dest('npm/trad'))
}
task();