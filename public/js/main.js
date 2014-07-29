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
<<<<<<< HEAD
  'content-view',
  'device-collection'],
  function (HeaderView, FooterView, ContentView, DeviceCollection) {
  var deviceCollection = new DeviceCollection(),
    headerView = new HeaderView({collection: deviceCollection}),
    footerView = new FooterView(),
    contentView = new ContentView({model: deviceCollection});
=======
  'device-collection'],
  function (HeaderView, FooterView, DeviceCollection) {
  var headerView = new HeaderView(),
    footerView = new FooterView(),
    deviceCollection = new DeviceCollection();
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b

  deviceCollection.fetch();
});
