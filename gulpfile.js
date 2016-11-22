var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// Server
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8080,
        livereload: true
    });
});

// Sends assets to the dist folder
gulp.task('assets',function() {
    gulp.src('src/images/**')
      .pipe( gulp.dest('./dist/images') );

    gulp.src('src/*.html')
      .pipe(gulp.dest('./dist/'));

    gulp.src('src/*.json')
      .pipe(gulp.dest('./dist/'));

    gulp.src('src/html/**')
      .pipe(gulp.dest('./dist/html/'));

    gulp.src('src/js/**')
      .pipe(gulp.dest('./dist/js/'));

    gulp.src('bower_components/jquery/dist/jquery.min.js')
      .pipe( gulp.dest('./dist/js/jquery/'));

    gulp.src('bower_components/font-awesome/fonts/**')
      .pipe( gulp.dest('./dist/fonts/')); 

    gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/**')
      .pipe( gulp.dest('./dist/fonts/'));    

    gulp.src('bower_components/bootstrap-sass/assets/images/**')
      .pipe( gulp.dest('./dist/images/'));

    gulp.src('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js')
      .pipe( gulp.dest('./dist/js/bootstrap/')); 

    gulp.src('bower_components/bootstrap-table/dist/bootstrap-table.min.js')
      .pipe( gulp.dest('./dist/js/bootstrap/'));
      gulp.src('bower_components/bootstrap-table/dist/bootstrap-table.min.css')
      .pipe( gulp.dest('./dist/css/bootstrap/')); 

    gulp.src('bower_components/handlebars/handlebars.min.js')
      .pipe( gulp.dest('./dist/js/handlebars/'));

    gulp.src('./dist').pipe(connect.reload());     
});

// Compiles sass
gulp.task('sass', function() {
    return gulp
        .src('./src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
              'bower_components/font-awesome/scss', 
              'bower_components/bootstrap-sass/assets/stylesheets'
            ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

// Watches for changes on the source files
gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    // gulp.watch('./src/*.html', ['assets']);
    // gulp.watch('./src/js/*.js', ['assets']);
    gulp.watch('./src/**', ['assets']);
});

// Default task
gulp.task('default', ['connect', 'assets', 'sass', 'watch']);