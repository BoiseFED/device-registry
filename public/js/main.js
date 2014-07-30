requirejs.config({
    baseUrl: 'js',
    paths: {
      backbone: '../vendor/backbone/backbone',
      handlebars: '../vendor/handlebars/handlebars.min',
      jquery: '../vendor/jquery/dist/jquery.min',
      text: '../vendor/requirejs-text/text',
      tmpl: '../templates',
      underscore: '../vendor/underscore/underscore'
    },
    shim: {
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      underscore: {
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
  'device-collection'],
  function (HeaderView, FooterView, ContentView, DeviceCollection) {
  var deviceCollection = new DeviceCollection(),
    headerView = new HeaderView({collection: deviceCollection}),
    footerView = new FooterView(),
    contentView = new ContentView({model: deviceCollection});

  deviceCollection.fetch();
});
