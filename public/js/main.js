requirejs.config({
    baseUrl: 'js',
    paths: {
      backbone: 'lib/backbone',
      'backbone.lib': '../vendor/backbone/backbone',
      'backbone.keyboard': '../vendor/backbone.keyboard/backbone.keyboard',
      handlebars: 'lib/handlebars',
      'handlebars.lib': '../vendor/handlebars/handlebars.min',
      swag: '../vendor/swag/lib/swag',
      jquery: '../vendor/jquery/dist/jquery.min',
      text: '../vendor/requirejs-text/text',
      json: '../vendor/requirejs-plugins/src/json',
      tmpl: '../templates',
      resources: '../../res',
      underscore: 'lib/underscore',
      'underscore.lib': '../vendor/underscore/underscore',
      'underscore.string': '../vendor/underscore.string/dist/underscore.string.min'
    },
    map: {
      'backbone.keyboard': {
        backbone: 'backbone.lib'
      }
    },
    shim: {
      'backbone.lib': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'underscore.lib': {
        exports: '_'
      },
      jquery: {
        exports: '$'
      },
      'handlebars.lib': {
        exports: 'Handlebars'
      },
      swag: {
        exports: 'Swag'
      }
    }
  });

// Start loading the main app file. Put all of
// your application logic in there.
requirejs([
  'backbone',
  'router'
], function (
  Backbone,
  router
) {});
