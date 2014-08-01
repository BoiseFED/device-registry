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
    'path-check': {
      'developer-tools': {
        src: ['sass', 'convert']
      }
    },
    checkDependencies: {
      npm: {
        options: {
          install: true
        }
      },
      bower: {
        options: {
          packageManager: 'bower',
          install: true
        }
      }
    },
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
        src: [ 'res/**/*.json', 'test/**/fixtures/**/*.json' ]
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
    sass: {
      build: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'public/css/main.css': 'public/scss/main.scss'
        }
      }
    },
    exec: {
      run: 'node server.js',
      node_test: 'npm run test-node',
      browser_test: 'npm run test-browser'
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
      scss: {
        files: ['public/scss/*.scss'],
        tasks: ['sass:build']
      },
      html: {
        files: ['public/**/*.html', 'public/**/*.hbs']
      },
      server: {
        files: ['server.js']
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-path-check');
  grunt.loadNpmTasks('grunt-check-dependencies');

  // Default task.
  grunt.registerTask('check', [
    'checkDependencies',
    'path-check',
    'jshint',
    'jsonlint',
    'sass',
    'exec:node_test',
    'exec:browser_test'
  ]);
  grunt.registerTask('dev', ['check', 'concurrent:dev']);
  grunt.registerTask('default', ['dev']);
};
