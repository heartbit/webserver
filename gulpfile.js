var gulp = require("gulp");
var gutil = require("gulp-util");
var watch = require('gulp-watch');
var del = require('del');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var plato = require('gulp-plato');
var mocha = require('gulp-mocha');
var spawn = require('child_process').spawn;
var nodemon = require('gulp-nodemon');
var webpack = require("webpack");

var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./newclient/webpack.config.js");

gulp.task("install", ["bower", "build"]);
gulp.task("test-client", ["mocha", "casper"]);
gulp.task("dev", ["watch-sass", 'dev-demon']);
gulp.task("build-dev", ["clean", "test-client", "sass", "webpack:build-dev"]);
gulp.task("build", ["clean", "test-client", "plato", "sass", "build:prod"]);
gulp.task("doc", ["jsdoc"]);

gulp.task('dev-demon', function(cb) {
    nodemon({
        script: 'webserver.js',
        ignore: ['newclient/*', 'node_modules/*', 'client/*'],
        args: ['dev'],
        env: {
            'NODE_ENV': 'local'
        }
    });
});

gulp.task('clean', function(cb) {
    del(['./newclient/dist/css/*', './newclient/dist/js/*'], cb);
});

gulp.task('watch-sass', function() {
    gulp.watch('./newclient/style/**', ['sass']);
    gulp.start('sass');
});

/* Css */
gulp.task('sass', function() {
    gulp.src('./newclient/style/bundle/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./newclient/dist/css/'));
});
/* Bower */
gulp.task('bower', function() { 
    return bower() .pipe(gulp.dest('./newclient/lib/bower_components')) ;
});
/* Analytics */
gulp.task('plato', function() {
    return gulp.src('./newclient/src/**/*.js')
        .pipe(plato('report', {
            destDir: './newclient/report',
            complexity: {
                trycatch: true
            }
        }));
});
/* Tests client */
gulp.task('mocha', function() {
    return gulp.src('./newclient/test/mocha/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});
gulp.task('casper', function() {
    var tests = ['./newclient/test/casper/test.js'];
    var casperChild = spawn('casperjs', ['test'].concat(tests));
    casperChild.stdout.on('data', function(data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });
    casperChild.on('close', function(code) {
        var success = code === 0; // Will be 1 in the event of failure
    });
});

/* Webpack */
gulp.task("build:prod", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// modify some webpack config options
gulp.task("build:dev", function(callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.debug = true;
    var devCompiler = webpack(myDevConfig);
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});