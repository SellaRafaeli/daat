'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        paths: {
            styles: 'styles',
            scripts: 'scripts'
        },

        jshint: {
            all: '<%= paths.scripts %>/**/*.js',
            options: {
                jshintrc: true
            }
        },

        less: {
            dev: {
                files: {
                    "<%= paths.styles %>/main.css": "<%= paths.styles %>/main.less"
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