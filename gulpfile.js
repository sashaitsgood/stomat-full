import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

// Извлечение src и dest из gulp
const { src, dest, series } = gulp;

// Инициализация gulp-sass с компилятором sass
const scssCompiler = gulpSass(sass);

function cleanDist() {
    return src('dist/', { read: false, allowEmpty: true })
        .pipe(clean());
}

function compilePug() {
    return src('index.pug')
        .pipe(pug({
            pretty: true // Это добавит отступы в HTML для читаемости
        }))
        .pipe(dest('dist/'));
}


function styles() {
    return src(['scss/main.scss', 'css/reset.css']) // Исходные файлы
        .pipe(scssCompiler())
        .pipe(concat('styles.css')) // Объединить в один файл
        .pipe(postcss([autoprefixer()])) // Добавление префиксов
        .pipe(cleanCSS()) // Минифицировать CSS
        .pipe(dest('dist/css')); // Выходная директория
}

function replaceCssLinks() {
    return src('dist/**/*.html') // Все HTML файлы в выходной директории
        .pipe(replace(/main\.css|reset\.css/g, 'styles.css')) // Заменить старые ссылки на новый CSS файл
        .pipe(dest('dist/'));
}

function minifyJs() {
    return src('js/*.js')
        .pipe(concat('script.js')) // Объединить в один файл
        .pipe(uglify()) // Минифицировать JS
        .pipe(dest('dist/js'));
}

function minifyHtml() {
    return src('dist/**/*.html') // Все HTML файлы в выходной директории
        .pipe(htmlmin({ collapseWhitespace: true })) // Минифицировать HTML
        .pipe(dest('dist/'));
}

function optimizeImages() {
    return src('img/**/*', {
        encoding: false
    })
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

// Экспорт задач
export {
    cleanDist,
    compilePug,
    styles,
    replaceCssLinks,
    minifyJs,
    minifyHtml,
    optimizeImages
};

// Задача по умолчанию
export default series(
    cleanDist,  // Очистка старых файлов
    compilePug,
    styles,
    replaceCssLinks, // Обновление ссылок на CSS
    minifyJs,
    minifyHtml,
    optimizeImages
);
