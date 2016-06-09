"use strict";

module.exports = function(grunt) {

    // Module Requires
    // --------------------------
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);


    // Init Config
    // --------------------------

    var appConfig = {

        // Dirs
        dirs: {
            // PATHS SRC
            js: "assets/js",
            sass: "assets/sass",

            // BUILD PATHS
            base: '../build',
            views: '../build/views',

            // ASSETS build
            css: "../build/css",
            jsfinal: "../build/js"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
        "\n" +
        "/*\n" +
        " * -------------------------------------------------------\n" +
        " * Project: <%= pkg.title %>\n" +
        " * Version: <%= pkg.version %>\n" +
        " * Author:  <%= pkg.author.name %> (<%= pkg.author.email %>)\n" +
        " *\n" +
        " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.title %>\n" +
        " * -------------------------------------------------------\n" +
        " */\n" +
        "\n",


        // Watch Task
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            css: {
                files: "<%= dirs.sass %>/**",
                tasks: ["compass","autoprefixer"],
                options: {
                    spawn: false
                }
            },
            js: {
                files: "<%= jshint.all %>",
                tasks: ["jshint", "uglify"]
            },

            files: [
                '<%= dirs.base %>/**/{*,}*.html',
                '<%= dirs.views %>/**/{*,}*.html'
            ]
        },

        // Linting
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                "Gruntfile.js",
                "<%= dirs.js %>/filters/**/*.js",
                "<%= dirs.js %>/services/**/*.js",
                "<%= dirs.js %>/directives/**/*.js",
                "<%= dirs.js %>/controllers/**/*.js",
                "<%= dirs.js %>/app.js"
            ]
        },

        // Minifica e concatena
        uglify: {
            options: {
                mangle: false,
                banner: "<%= banner %>"
            },
            dist: {
                files: {
                    // Seu script do projeto
                    "<%= dirs.jsfinal %>/site.min.js": [
                        "<%= dirs.js %>/libs/**/*.js",
                        "<%= dirs.js %>/app.js",
                        "<%= dirs.js %>/filters/**/*.js",
                        "<%= dirs.js %>/services/**/*.js",
                        "<%= dirs.js %>/directives/**/*.js",
                        "<%= dirs.js %>/controllers/**/*.js"
                    ]
                    // Javascript para concatenar
                }
            }
        },

        // Compile Sass/Scss to CSS
        compass: {
            dist: {
                options: {
                    force: true,
                    config: "config.rb",
                }
            }
        },


        // Prefixo automático para css cross browser
        autoprefixer: {
            options: {
                browsers: ['last 5 version']
            },

            single_file: {
                src: '<%= dirs.css %>style.css',
                dest: '<%= dirs.css %>style.css'
            }

        }
    };

    grunt.initConfig(appConfig);


    // Register tasks
    // --------------------------

    // Start server and watch for changes
    grunt.registerTask("default", ["watch"]);

    // Run build
    grunt.registerTask("build", ["jshint", "uglify", "compass"]);

    // Aliases Tasks
    grunt.registerTask("b",  ["build"]);
};