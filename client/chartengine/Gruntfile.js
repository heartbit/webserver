module.exports = function(grunt) {

	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config.js');

	grunt.initConfig({

		props: {
			moduleName: 'ChartEngine.js',
			jsDir: './src',
			cssDir: './style',
			docDir: './doc',
			buildDir: 'dist',
			version: '0.1'
		},

		clean: {
			options: {
				force: true
			},
			build: ['<%= props.buildDir %>']
		},

		sass: {
			dist: {
				options: {
					style: 'compressed',
					banner: 'qunb chart engine v<%= props.version %>'
				},
				files: {
					'<%= props.buildDir %>/ChartEngine.css': '<%= props.cssDir %>/all-source.scss'
				}
			}
		},

		markdown: {
			generateDoc: {
				files: [{
					cwd: '<%= props.docDir%>/src/',
					expand: true,
					src: './**/*.md',
					dest: '<%= props.docDir%>/html/',
					ext: '.html'
				}]
			}
		},

		jsdoc: {
			generateApiDoc: {
				src: ['src/**/*.js', 'test/**/*.js'],
				options: {
					destination: '<%= props.docDir%>/api/'
				}
			}
		},

		simplemocha: {
			options: {
				timeout: 60000,
				ignoreLeaks: true,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: ['test/adapters_test.js'] // 'test/charts_test.js', 'test/datavis_test.js']
			}
		},

		casper: {
			test: {
				options: {
					test: true,
					async: {
						parallel: true
					}
				},
				files: {
					'test/casper-results.xml': ['test/casper/**/*.js']
				}
			}
		},

		webpack: {
			options: webpackConfig,
			build: {
				// plugins: webpackConfig.plugins.concat(
				// new webpack.optimize.DedupePlugin(),
				// new webpack.optimize.UglifyJsPlugin()
				// )
			},
			'build-dev': {
				devtool: 'sourcemap',
				debug: true
			}
		},

		'webpack-dev-server': {
			options: {
				webpack: webpackConfig,
				publicPath: '/' + webpackConfig.output.publicPath
			},
			start: {
				keepAlive: true,
				webpack: {
					// 	devtool: 'eval',
					debug: true
				}
			}
		},

		watch: {
			app: {
				files: ['src/**/*', 'test/**/*'],
				tasks: ['webpack:build-dev'],
				options: {
					spawn: false,
				}
			}
		}

	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('dev', ['webpack-dev-server:start'])
	grunt.registerTask('doc', ['markdown:generateDoc', 'jsdoc:generateApiDoc']);
	grunt.registerTask('test', ['clean', 'build', 'simplemocha', 'casper']);
	grunt.registerTask('build', ['sass', 'webpack:build']);

};
