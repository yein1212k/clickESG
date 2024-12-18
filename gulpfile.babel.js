const gulp = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const htmlbeautify = require("gulp-html-beautify");
const ejs = require("gulp-ejs");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const ghPages = require("gulp-gh-pages");
const del = require("del");

// Folder paths
const SRC_FOLDER = "./src";
const DIST_FOLDER = "./dist";

const SRC_PATH = {
  ASSETS: {
    FONTS: "./src/assets/fonts",
    IMAGES: "./src/assets/images",
    SCSS: "./src/assets/scss",
    JS: "./src/assets/js",
    MOVIES: "./src/assets/movies",
  },
  EJS: "./src/ejs",
};

const DEST_PATH = {
  ASSETS: {
    FONTS: "./dist/assets/fonts",
    IMAGES: "./dist/assets/images",
    CSS: "./dist/assets/css",
    JS: "./dist/assets/js",
    MOVIES: "./dist/assets/movies",
  },
};

// -------------------- Clean Tasks --------------------
gulp.task("clean", () => del([DIST_FOLDER]));
gulp.task("cleanDeploy", () => del(".publish"));

// -------------------- EJS Task --------------------
gulp.task("ejs", () => {
  console.log("Compiling EJS files...");
  return gulp
    .src([`${SRC_PATH.EJS}/**/!(_)*.ejs`], { base: SRC_PATH.EJS }) // Exclude partials
    .pipe(ejs({ DOCUMENT_ROOT: "./" }).on("error", (err) => {
      console.error("EJS Compilation Error:", err.message);
      this.emit("end");
    }))
    .pipe(rename({ extname: ".html" }))
    .pipe(htmlbeautify({ indentSize: 2 }))
    .pipe(gulp.dest(DIST_FOLDER)) // Output to dist folder
    .pipe(browserSync.stream());
});


// -------------------- SCSS Task --------------------
gulp.task("scss:compile", () => {
  return gulp
    .src(`${SRC_PATH.ASSETS.SCSS}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(scss().on("error", scss.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(DEST_PATH.ASSETS.CSS))
    .pipe(browserSync.stream());
});

// -------------------- JS Task --------------------
gulp.task("js", () => {
  return gulp
    .src(`${SRC_PATH.ASSETS.JS}/**/*.js`)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(DEST_PATH.ASSETS.JS))
    .pipe(browserSync.stream());
});

// -------------------- Assets Tasks --------------------
gulp.task("images", () => gulp.src(`${SRC_PATH.ASSETS.IMAGES}/**/*`).pipe(gulp.dest(DEST_PATH.ASSETS.IMAGES)));
gulp.task("fonts", () => gulp.src(`${SRC_PATH.ASSETS.FONTS}/**/*`).pipe(gulp.dest(DEST_PATH.ASSETS.FONTS)));
gulp.task("movies", () => gulp.src(`${SRC_PATH.ASSETS.MOVIES}/*`).pipe(gulp.dest(DEST_PATH.ASSETS.MOVIES)));

// -------------------- BrowserSync --------------------
gulp.task("browserSync", () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: DIST_FOLDER,
    },
    startPath: "main/index.html",
  });
});

// -------------------- Watch Task --------------------
gulp.task("watch", () => {
  gulp.watch(`${SRC_PATH.EJS}/**/*.ejs`, gulp.series("ejs")).on("change", (path) => {
    console.log(`EJS file changed: ${path}`);
  });
  gulp.watch(`${SRC_PATH.ASSETS.SCSS}/**/*.scss`, gulp.series("scss:compile"));
  gulp.watch(`${SRC_PATH.ASSETS.JS}/**/*.js`, gulp.series("js"));
  gulp.watch(`${SRC_PATH.ASSETS.SCSS}/**/*.scss`, gulp.series("scss:compile"));
  gulp.watch(`${SRC_PATH.ASSETS.JS}/**/*.js`, gulp.series("js"));
  gulp.watch(`${SRC_PATH.ASSETS.IMAGES}/**/*`, gulp.series("images"));
  gulp.watch(`${SRC_PATH.ASSETS.FONTS}/**/*`, gulp.series("fonts"));
  gulp.watch(`${SRC_PATH.ASSETS.MOVIES}/*`, gulp.series("movies"));
});

// -------------------- Deployment --------------------
gulp.task("gh", () => gulp.src(`${DIST_FOLDER}/**/*`).pipe(ghPages()));

// -------------------- Task Groups --------------------
const build = gulp.series("clean", gulp.parallel("ejs", "scss:compile", "js", "images", "fonts", "movies"));
const dev = gulp.series(build, gulp.parallel("browserSync", "watch"));
const deploy = gulp.series(build, "gh", "cleanDeploy");

// -------------------- Export Tasks --------------------
exports.clean = gulp.series("clean");
exports.build = build;
exports.dev = dev;
exports.deploy = deploy;
exports.default = dev;
