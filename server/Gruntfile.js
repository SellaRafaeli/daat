'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        paths: {
            less: 'public/ui/main.css.less',
            css: 'public/ui/main.css'
        },

        jshint: {
            all: './**/*.js',
            options: {
                jshintrc: true
            }
        },

        less: {
            dev: {
                files: {
                    "<%= paths.css %>": "<%= paths.less %>"
                },
                options: {
                    compress: false,
                    cleancss: false
                }
            }
        },

        watch: {
            files: ['<%= paths.less %>'],
            tasks: ['less:dev'],
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

};