const gulp = require('gulp');
const server = require('gulp-server-livereload');
// const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
 
gulp.task('auto', () =>
    gulp.src('DIST/CSS/bundle.css')
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('DIST/CSS/'))
);
// (добавления скомпилированного файла в папку)


gulp.task('concatCss', function () {
  return gulp.src('APP/SASS/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('DIST/CSS/'));
});
// (компилирует все файлы sass в один файл сss)


gulp.task('cssmin', function () {
    gulp.src('DIST/CSS/bundle.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('DIST'));
}); 
// (минифицируется файл сss, все в одну строку и упрощает написание, если есть совпадения)


gulp.task('sass', function () {
  return gulp.src('APP/SASS/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('APP/CSS/'));
});

 
gulp.task('sass:watch', function () {
  gulp.watch('APP/SASS/*.sass', ['sass']);
}); 



gulp.task('server', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['server'])