module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['frontend/**'],
        tasks: ['concat', 'uglify', 'sass'],
        options: {
          spawn: false,
        },
      },
    },

    concat: {
      options: {
        separator: ''
      },
      js: {
        src: [
          'frontend/js/class/*.js',
          'frontend/js/base/*.js',
          'frontend/js/model/*.js',
          'frontend/js/collection/*.js',
          'frontend/js/view/*.js',
          'frontend/js/controller/*.js',
          'frontend/js/init.js'
        ],
        dest: 'compiled-source/client.js'
      },
      templates: {
        src: [
          'frontend/templates/**.tpl'
        ],
        dest: 'compiled-source/templates.tpl'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'compiled-source/client-min.js': ['compiled-source/client.js']
        }
      }
    },

    sass: {  
      dist: {  
        options: {
          style: 'compressed'
        },
        files: {  
          'compiled-source/stylesheet.css': 'frontend/css/main.scss', 
        }
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'sass']);
 
};