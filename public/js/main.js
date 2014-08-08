requirejs.config({
    baseUrl: 'js',
    paths: {
      backbone: '../vendor/backbone/backbone',
      handlebars: '../vendor/handlebars/handlebars.min',
      jquery: '../vendor/jquery/dist/jquery.min',
      text: '../vendor/requirejs-text/text',
      tmpl: '../templates',
      underscore: 'lib/underscore',
      'underscore.lib': '../vendor/underscore/underscore',
      'underscore.string': '../vendor/underscore.string/dist/underscore.string.min'
    },
    shim: {
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'underscore.lib': {
        exports: '_'
      },
      jquery: {
        exports: '$'
      },
      handlebars: {
        exports: 'Handlebars'
      }
    }
  });

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(
  ['header-view',
  'footer-view',
  'content-view',
  'error-view',
  'device-collection'],
  function (HeaderView, FooterView, ContentView, ErrorView, DeviceCollection) {
  var deviceCollection = new DeviceCollection(),
    headerView = new HeaderView({collection: deviceCollection}),
    errorView = new ErrorView(),
    footerView = new FooterView(),
    contentView = new ContentView({model: deviceCollection});

  deviceCollection.fetch();
});
