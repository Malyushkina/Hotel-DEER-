const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const postImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const webp = require("gulp-webp");

const imagemin = require("gulp-imagemin");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

const styles = () => {
  return gulp
    .src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([postImport()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "source",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher наблюдатели

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

exports.default = gulp.series(styles, server, watcher);
const images = () => {
  return gulp.src("build/img/**/*.{jpg,png,svg}").pipe(
    imagemin([
      imagemin.optipng({
        optimizationLevel: 3,
      }),
      imagemin.mozjpeg({
        progressive: true,
      }),
      imagemin.svgo(),
    ])
  );
};
exports.images = images;

const toWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(
      webp({
        quality: 90,
      })
    )
    .pipe(gulp.dest("build/img"));
};
exports.webp = toWebp;
const copy = () => {
  return gulp
    .src(
      [
        "source/css/**/*.css",
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/**/*.ico",
        "source/*.html",
      ], {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
};
exports.copy = copy;

// удалить старую версию build

const clean = () => {
  return del("build");
};
exports.clean = clean;

const html = () => {
  return gulp
    .src("source/**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"))
};
exports.html = html;

const build = gulp.series(clean, copy, styles, images, toWebp, html);
// const build = gulp.series(clean, copy, styles, html);
exports.build = build;