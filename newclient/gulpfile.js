var gulp = require("gulp");
var gutil = require("gulp-util");

gulp.task("install", ["bower"]);
gulp.task("test", ["mocha", "casper"]);
gulp.task("dev", ["plato", "sass", "webpack-dev-server"]);
gulp.task("build-dev", ["clean", "test", "sass", "webpack:build-dev"]);
gulp.task("build", ["clean", "test", "plato", "sass", "webpack:build"]);
gulp.task("doc", ["jsdoc", ""]);

var del = require('del');
gulp.task('clean', function(cb) {
    del([
        'dist',
        // 'dist/css/*',
        // // here we use a globbing pattern to match everything inside the `mobile` folder
        // 'dist/js/*',
        // 'dist/doc/*',
        // // we don't want to clean this file though so we negate the pattern
        // '!dist/mobile/deploy.json'
    ], cb);
});

var sass = require('gulp-sass');
gulp.task('sass', function() {
    gulp.src('./style/bundle/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});


var bower = require('gulp-bower');
gulp.task('bower', function() { 
    return bower() .pipe(gulp.dest('lib/bower_components')) ;
});


var plato = require('gulp-plato');
gulp.task('plato', function() {
    return gulp.src('./src/**/*.js')
        .pipe(plato('report', {
            destDir: 'report',
            complexity: {
                trycatch: true
            }
        }));
});


var mocha = require('gulp-mocha');
gulp.task('mocha', function() {
    return gulp.src('./test/mocha/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});


var spawn = require('child_process').spawn;
gulp.task('casper', function() {
    var tests = ['./test/casper/test.js'];

    var casperChild = spawn('casperjs', ['test'].concat(tests));

    casperChild.stdout.on('data', function(data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function(code) {
        var success = code === 0; // Will be 1 in the event of failure
        // Do something with success here
    });
});


var webpackConfig = require("./webpack.config.js");
var webpack = require("webpack");
gulp.task("webpack", function(callback) {
    webpack({
        // configuration
    }, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});


gulp.task("webpack:build", function(callback) {
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
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);
gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});


var WebpackDevServer = require("webpack-dev-server");
gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});