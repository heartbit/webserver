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
            master: 'heartbit-prod'
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

        // Minify, compress, uglify javascript files
        requirejs: {
            main: {
                options: {
                    dir: '<%= props.buildClientDir %>',
                    baseUrl: '.',
                    appDir: '<%= props.clientDir %>',
                    mainConfigFile: '<%= props.clientDir %>/modules/main.js',
                    fileExclusionRegExp: /^(bower_components|build|node_modules)$/,
                    optimize: 'uglify2',
                    // name: "modules/app",
                    // out: 'compress.js',
                    modules: [{
                        name: 'main',
                        include: ['application/app.router']
                    }],
                    preserveLicenseComments: false
                }
            },
            css: {
                options: {
                    logLevel: 3,
                    optimizeCss: 'none', // standard
                    cssIn: '<%= props.cssDir %>/all-sass.css',
                    out: '<%= props.cssDir %>/all.css'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'extended', // compressed
                    banner: 'insightfullcointrader grunt build: compiled css v.25'
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

        express: {
            options: {
                port: 9090,
                delay: 1000
            },
            local: {
                options: {
                    script: path.resolve(__dirname, 'webserver.js')
                }
            }
        },

        nodemon: {
            prod: {
                options: {
                    file: 'webserver.js',
                    args: ['-d', 'yes'],
                    ignoredFiles: ['node_modules/**'],
                    env: {
                        PORT: "<%= props.defaultportProd %>"
                    },
                }
            },
            local: {
                options: {
                    file: 'webserver.js',
                    args: ['-d', 'no'],
                    nodeArgs: ['--debug'],
                    ignoredFiles: ['node_modules/**', 'RipplePairs/*', './client/application', './client/*.html'],
                    env: {
                        PORT: "<%= props.defaultport %>"
                    },
                }
            },
            offline: {
                options: {
                    file: 'webserver.js',
                    args: ['-d', 'no', '-m', 'offline'],
                    nodeArgs: ['--debug'],
                    ignoredFiles: ['node_modules/**'],
                    env: {
                        PORT: "<%= props.defaultport %>"
                    },
                }
            },
            brk: {
                options: {
                    file: 'webserver.js',
                    args: ['-d', 'no', '-m', 'offline'],
                    nodeArgs: ['--debug-brk'],
                    ignoredFiles: ['node_modules/**'],
                    env: {
                        PORT: "<%= props.defaultport %>"
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
            gitmaster: {
                options: shellDefaultOptions,
                command: ['cd ./build', 'git init', 'echo "node_modules/*" > .gitignore', 'git add .', 'echo "before commit"', 'git commit -m "deployment..."', 'echo "before add remote"', 'git remote add <%= props.master %> git@heroku.com:<%= props.master %>.git', 'echo "before push master"', 'git push --force <%= props.master %> master:master', 'echo "after push dev branch"'].join('&&')
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
        }

    });

    /**
     MODULES
  **/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
    TASKS
    **/
    grunt.registerTask('css', ['sass', 'requirejs:css']);
    grunt.registerTask('local', ['concurrent:concurrentLocal']);
    grunt.registerTask('localServer', ['css', 'nodemon:local']);
    grunt.registerTask('build', ['clean', 'css', 'requirejs:main', 'copy:main']);
    grunt.registerTask('deploy-dev', ['build', 'shell:gitdev']);
    grunt.registerTask('deploy-master', ['build', 'shell:gitmaster']);
    grunt.registerTask('documentation', ['clean', 'markdown:all']);
    grunt.registerTask('analyze', ['plato:analyze']);
};