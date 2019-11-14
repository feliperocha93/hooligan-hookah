// Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Função para compilar o Sass e adicionar os prefixos
function compilaSass() {
  return gulp
    .src('./css/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
}

// Tarefa de Gulp para função de Sass
gulp.task('sass', compilaSass);

// Função para juntar o js
function gulpJS() {
  return gulp
    .src('script/js/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}

gulp.task('mainjs', gulpJS);

// Função para iniciar o Browser
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

// Tarefa para iniciar o Browser-Sync
gulp.task('browser-sync', browser);


// função de watch do Gulp
function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch('script/js/*.js', gulpJS);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// tarefa padrão de Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
