var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');
var browserSync = require('browser-sync').create();
gulp.task('welcome-message',async function() {
 return console.log('Welcome to Gulp')
}
)
gulp.task('copy-files',function() {
    return gulp.src('src/css/*.css').pipe(
        gulp.dest('dist/css')
    )
})
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss').pipe(sass()).pipe(
        gulp.dest('dist/css')
    ).pipe(browserSync.stream());
})
gulp.task('minify-js', function () {
    return gulp.src('src/js/*.js').pipe(uglify()).pipe(
        gulp.dest('dist/js')
    )
})
gulp.task('concat-js',function () {
    return gulp.src('src/js/*.js').pipe(concatJs('app.js')).pipe(uglify()).pipe(gulp.dest('dist/js'));
})
gulp.task("watch",async function () {
    gulp.watch("src/js/*.js", gulp.series("concat-js"));
    gulp.watch('src/sass/*.scss', gulp.series("sass"));
})
gulp.task('browser-sync',function(){
    browserSync.init({
        server: { baseDir: "../"}
    })
    gulp.watch('../*.html').on('change', browserSync.reload);
})
gulp.task('default', gulp.series('welcome-message', 'watch','browser-sync'));