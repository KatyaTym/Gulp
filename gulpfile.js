const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('prefix', () =>
    gulp.src('style.css')
    .pipe(autoprefixer({
        browsers: [
            'ie >= 8',
            'edge >= 15',
            'ie_mob >= 10',
            'ff >= 45',
            'chrome >= 45',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4',
            'bb >= 10'
        ],
        cascade: false
    }))
    .pipe(gulp.dest('style'))
);

const gulp_imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

gulp.task('optimization-image', () =>
    gulp.src('img/*')
    .pipe(cache(
        gulp_imagemin([
            gulp_imagemin.optipng({ optimizationLevel: 5 })
        ]),
        {
        	name: 'images'
        }
    ))
    .pipe(gulp.dest('dist/images'))

);

const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('optimization-image-pngquant', async () => {
    await imagemin(['img/*.png'], 'dist/images', {
        plugins: [
            imageminPngquant()
        ]
    })
    console.log('Images optimized');
});

const babel = require('gulp-babel');

gulp.task('pre-release-babel', () =>
    gulp.src('index.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
);

gulp.task('build', () =>
    gulp.src('style.css', 'img/*', 'index.js')
        .pipe(gulp.dest('dist'))
);