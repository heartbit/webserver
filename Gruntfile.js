module.exports = function(grunt) {

    var path = require('path');

    var shellDefaultOptions = {
        execOptions: {
            maxBuffer: 2000 * 1024
        },
        stdout: true,
        stderr: true,
        failOnError: true
    };

    var minified = (grunt.option('minified') && grunt.option('minified') === "no") ? 'none' : 'uglify2';

    grunt.initConfig({

        /**
       General properties
    */
        pkg: grunt.file.readJSON('package.json'),

        props: {
            defaultport: 9090,
            defaultportProd: 9090,
            srcDir: './',
            buildDir: './build',
            reportDir: './reports',
            documentationDir: 'doc/html/',
            clientDir: './client',
            serverDir: './server',
            buildClientDir: './build/client',
            cssDir: './client/styles',
            dev: 'heartbit-dev',
            master: 'heartbit-prod',
            appbuild: './build/modules/app.js'
        },

        /**
      Sub tasks
    **/
        // Remove build directory
        clean: {
            options: {
                force: true
            },
            build: ['<%= props.buildDir %>', '<%= props.documentationDir %>']
        },

        simplemocha: {
            options: {
                timeout: 60000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['tests/client.tests.js', 'tests/server.tests.js']
            }
        },

        concat: {
            app: {
                src: ['client/libs/require/require.js', '<%= props.appbuild %>'],
                dest: '<%= props.appbuild %>'
            },
        },

        uglify: {
            app: {
                src: '<%= props.appbuild %>',
                dest: 'build/modules/app.min.js'
            },
        },

        // Minify, compress, uglify javascript files
        requirejs: {
            app: {
                options: {
                    // appDir: '<%= props.clientDir %>',
                    // dir: '<%= props.buildClientDir %>',
                    // modules: [{
                    //     name: 'common',
                    // }, {
                    //     name: 'app',
                    // }, {
                    //     name: 'embed-keyfacts',
                    // }, {
                    //     name: 'embed-maingraph',
                    // }],
                    // baseUrl: './modules',
                    // mainConfigFile: '<%= props.clientDir %>/modules/common.js',
                    // fileExclusionRegExp: /^(bower_components|build|node_modules)$/,
                    // optimize: 'uglify2',
                    // inlineText: true,
                    // preserveLicenseComments: false
                    // baseUrl: './modules',
                    logLevel: 0,
                    baseUrl: './client/',
                    name: 'modules/app',
                    mainConfigFile: '<%= props.clientDir %>/modules/common.js',
                    fileExclusionRegExp: /^(bower_components|build|node_modules)$/,
                    optimize: 'uglify2',
                    out: '<%= props.appbuild %>',
                    inlineText: true,
                    preserveLicenseComments: false
                }
            },

            main: {
                options: {
                    dir: '<%= props.buildClientDir %>',
                    appDir: '<%= props.clientDir %>',
                    baseUrl: '.',
                    mainConfigFile: '<%= props.clientDir %>/modules/common.js',
                    logLevel: 0,
                    optimize: 'uglify2',
                    modules: [{
                        name: 'modules/common',
                    }, {
                        name: 'modules/app',
                        include: ['application/routers/app.router']
                    }],
                    fileExclusionRegExp: /^(bower_components|build|node_modules)$/,
                    inlineText: true,
                    preserveLicenseComments: false
                }
            },

            css: {
                options: {
                    logLevel: 3,
                    optimizeCss: 'standard',
                    cssIn: '<%= props.cssDir %>/all-sass.css',
                    out: '<%= props.cssDir %>/all.css'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed', // compressed
                    banner: 'heartbit.io build: compiled css v.25'
                },
                files: {
                    '<%= props.cssDir %>/all-sass.css': '<%= props.cssDir %>/all-source.scss' // 'destination': 'source'
                }
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: './client/images',
                    src: ['**'],
                    dest: './build/client/images'
                }, {
                    expand: true,
                    cwd: './server',
                    src: ['**'],
                    dest: './build/server'
                }, {
                    expand: true,
                    src: ['Procfile', '*.js', '*.json'],
                    dest: './build'
                }]
            }
        },

        plato: {
            analyze: {
                options: {
                    exclude: /\.min\.js$/ // excludes source files finishing with ".min.js"
                },
                files: {
                    'reports': ['client/application/**/*.js', 'server/**/*.js'],
                },
            },
        },

        watch: {
            css: {
                files: ['<%= props.cssDir %>/**'],
                tasks: ['css'],
                options: {
                    nospawn: true
                }
            },
            local: {
                files: ['<%=props.serverDir%>/**', './webserver.js'],
                tasks: ['localServer'],
                options: {
                    nospawn: true
                }
            },
            offline: {
                files: ['<%=props.serverDir%>/**', './webserver.js'],
                tasks: ['offlineServer'],
                options: {
                    nospawn: true
                }
            }
        },

        nodemon: {
            local: {
                options: {
                    file: 'webserver.js',
                    args: ['-d', 'no'],
                    nodeArgs: ['--debug'],
                    ignore: ['**'],// 'RipplePairs/*', './client/application', './client/*.html'],
                    env: {
                        PORT: "<%= props.defaultport %>",
                        LOCAL: true
                    },
                }
            }
        },

        // Shell command lines (because the git plugin is shitty)
        shell: {
            gitdev: {
                options: shellDefaultOptions,
                command: ['cd ./build', 'git init', 'echo "node_modules/*" > .gitignore', 'git add .', 'echo "before commit"', 'git commit -m "deployment..."', 'echo "before add remote"', 'git remote add <%= props.dev %> git@heroku.com:<%= props.dev %>.git', 'echo "before push master"', 'git push --force <%= props.dev %> master:master', 'echo "after push dev branch"'].join('&&')
            },
            gitpreprod: {
                options: shellDefaultOptions,
                command: ['cd ./build', 'git init', 'echo "node_modules/*" > .gitignore', 'git add .', 'echo "before commit"', 'git commit -m "deployment..."', 'echo "before add remote"', 'git remote add <%= props.master %> git@heroku.com:<%= props.master %>.git', 'echo "before push master"', 'git push --force <%= props.master %> master:master', 'echo "after push pre prod branch"'].join('&&')
            }
        },

        concurrent: {
            concurrentLocal: ['watch:css', 'localServer', 'node-inspector'],
            concurrentOffline: ['watch:css', 'offlineServer', 'node-inspector'],
            options: {
                limit: 4,
                logConcurrentOutput: true
            }
        },

        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: '../**.md',
                    dest: '<%= props.documentationDir%>',
                    ext: '.html'
                }]
            }
        },

        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true
                }
            }
        },

        forever: {
            prod: {
                options: {
                    index: 'webserver.js',
                    command: 'node',
                    logDir: 'logs'
                }
            }
        }
    });

    /**
     MODULES
  **/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
    TASKS
    **/
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('analyze', ['plato:analyze']);

    grunt.registerTask('css', ['sass', 'requirejs:css']);
    grunt.registerTask('local', ['concurrent:concurrentLocal']);
    grunt.registerTask('localServer', ['css', 'nodemon:local']);

    grunt.registerTask('build', ['test', 'clean', 'css', 'requirejs:main', 'copy:main']);
    grunt.registerTask('prod-start', ['build', 'forever:prod:start']);
    grunt.registerTask('prod-stop', ['forever:prod:stop']);
    grunt.registerTask('prod-restart', ['forever:prod:restart']);
    grunt.registerTask('deploy-dev', ['build', 'shell:gitdev']);
    grunt.registerTask('deploy-preprod', ['build', 'shell:gitpreprod']);

    grunt.registerTask('documentation', ['clean', 'markdown:all']);
};