// =================== All Plagins ===========================
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const concat = require('gulp-concat');
// CSS
const cleanCSS = require ('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
// TS/ES6
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
// IMAGES
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
// SVG
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
// HELP
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const size = require('gulp-size');

// Конфигурация
const path = require("./config/paths.js");
const app = require("./config/app.js");

// Удаление директории
const clear = () => {
  return del(path.root)
}

// Обработка HTML
const html = () => {
  return src(path.html.src)
  .pipe(fileinclude(app.fileinclude))
  .pipe(dest(path.root))
}

// Обработка стилей
const styles = () => {
   return src(path.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(app.autoprefixer))
    .pipe(cleanCSS(app.cleanCSS))
    .pipe(rename(app.rename))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.styles.dest))
}

// Удаление неиспользуемого кода CSS
const standartCss = () => {
  return src(path.standartCss.src)
  .pipe(purgecss({content: path.standartCss.purge}))
  .pipe(dest(path.styles.dest))
}

// Обработка скриптов
const scriptLibs = () => {
  return src(path.scriptLibs.src)
    .pipe(size({ title: "До сжатия" }))
    .pipe(terser())
    .pipe(concat('compiled.js'))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest(path.scriptLibs.dest))
}

// Обработка скриптов
const scripts = () => {
  return src(path.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(ts(app.ts))
    .pipe(size({ title: "До сжатия" }))
    .pipe(terser())
    .pipe(size({ title: "После сжатия" }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.scripts.dest))
}

// Обработка картинок
const images = () => {
  return src(path.images.src)
    .pipe(newer(path.images.dest))
    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.images.dest))
}

// Обработка SVG
const svgAll = () => {
  return src(path.svgAll.src)
    .pipe(svgmin(app.svgmin))
    .pipe(cheerio(app.cheerio))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(app.svgSprite))
    .pipe(dest(path.svgAll.dest))
}

// Transfer
function transfer() {
  return src(path.transfer.src)
    .pipe(dest(path.transfer.dest));
}

// Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root
    }
  });
}
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.styles.watch, styles).on('all', browserSync.reload);
  watch(path.scripts.watch, scripts).on('all', browserSync.reload);
  watch(path.images.watch, images).on('all', browserSync.reload);
  watch(path.svgAll.watch, svgAll).on('all', browserSync.reload);
}

// Вывод задач
exports.clear = clear;
exports.html = html;
exports.styles = styles;
exports.scriptLibs = scriptLibs;
exports.scripts = scripts;
exports.standartCss = standartCss;
exports.images = images;
exports.svgAll = svgAll;
exports.transfer = transfer;
exports.watch = watcher;

// Сборка при разработке
exports.dev = series(
  clear,
  parallel (transfer),
  parallel (html, styles, scriptLibs, scripts, images, svgAll),
  parallel (watcher, server)
);

// Сборка для выгрузки
exports.build = series(
  clear,
  parallel (transfer),
  parallel (html, styles, scriptLibs, scripts, images, svgAll),
  standartCss
);
