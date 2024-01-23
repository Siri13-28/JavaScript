//const gulp = require('gulp');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cssMinify = require('gulp-minify');
const livereload = require('gulp-livereload');
//const notify = require('gulp-notify');
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));

/*
 -- Top Level Functions --
 gulp.task - Define tasks
 gulp.src - Point tofiles to use
 gulp.dest - Points to folder to output
 glup.watch - Watch files and folders for changes
*/

//Logs Message
gulp.task('message', async function () {
    return console.log('Gulp is running...')
});

//HTML file
gulp.task('html', async function () {
    gulp.src('src/*.pug')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
        .pipe(livereload());
});


//css
gulp.task('css', async function () {
    var cssSrc = ['src/css/*.scss']
    return gulp.src(cssSrc)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(cssMinify())
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        //.pipe(concat('app.css'))
        //.pipe(notify({
        //    message: "main SCSS processed"
        //}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
        .pipe(livereload());
});

//script
gulp.task('testJS', async function () {
    var scrptSrc = ['src/js/jquery-3.6.1.min.js', './src/js/*.js']
    return gulp.src(scrptSrc)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream())
        .pipe(livereload());
});

//image
gulp.task('imagemin', async function () {
    var img_src = 'src/img/**/*', img_dest = 'dist/img';
    gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_dest))
});

//Browser Sync
gulp.task('browserSync', async function (done) {
    browserSync.init({
        server: "./dist"
    });
    done();
});

//All task
gulp.task("default", gulp.series("css", "testJS", "imagemin", "html", "browserSync", () => {
    livereload.listen();
    gulp.watch('src/js/*.js', gulp.series('testJS'));
    gulp.watch('src/css/*.css', gulp.series('css'));
    gulp.watch('src/img/**/*', gulp.series('imagemin'));
    gulp.watch('src/*.pug', gulp.series('html'));
}));

//Watch
//gulp.task('watch', async function () {
//    gulp.watch('src/js/*.js', gulp.series('testJS'));
//    gulp.watch('src/css/*.css', gulp.series('css'));
//    gulp.watch('src/*.pug', gulp.series('html'));
//});
