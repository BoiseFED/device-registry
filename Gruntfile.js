/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['public/js/**/*.js']
      },
      unit_test: {
        src: ['test/**/*.js']
      },
      server_test: {
        src: ['server.js']
      }
    },
    jsonlint: {
      resources: {
        src: [ 'res/**/*.json' ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['exec', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    exec: {
      run: 'node server.js'
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      jsonlint: {
        files: '<%= jsonlint.resources.src %>',
        tasks: ['jsonlint:resources']
      },
      html: {
        files: ['public/**/*.html', 'public/**/*.hbs']
<<<<<<< HEAD
      },
      server: {
        files: ['server.js']
=======
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jsonlint']);
  grunt.registerTask('dev', ['default', 'concurrent:dev']);
};
