requirejs.config({
  baseUrl: '../../public/js/',
  paths: {
    backbone: '../vendor/backbone/backbone',
    handlebars: 'lib/handlebars',
    'handlebars.lib': '../vendor/handlebars/handlebars.min',
    swag: '../vendor/swag/lib/swag',
    jquery: '../vendor/jquery/dist/jquery.min',
    text: '../vendor/requirejs-text/text',
    json: '../vendor/requirejs-plugins/src/json',
    tmpl: '../templates',
    underscore: 'lib/underscore',
    resources: '../../res',
    'underscore.lib': '../vendor/underscore/underscore',
    'underscore.string': '../vendor/underscore.string/dist/underscore.string.min',
    chai: '../../node_modules/chai/chai',
    sinon: '../vendor/sinonjs/sinon',
    sinonChai: '../../node_modules/sinon-chai/lib/sinon-chai',
    mocha: '../../node_modules/mocha/mocha',
    fixtures: '../../test/browser/fixtures',
    test: '../../test/browser',
    'localStorage': '../vendor/backbone.localstorage/backbone.localStorage'
  },
  shim: {
    'sinon': {
      exports: 'sinon'
    },
    'mocha': {
      exports: 'mocha'
    },
    'sinonFakeServer': {
      deps: ['sinon']
    },
    'underscore.lib': {
      exports: '_'
    },
    'handlebars.lib': {
      exports: 'Handlebars'
    },
    swag: {
      exports: 'Swag'
    }
  }
});

require([
  'require',
  'chai',
  'mocha',
  'sinon',
  'sinonChai'
], function (
  require,
  chai,
  mocha,
  sinon,
  sinonChai) {
  // Chai
    window.expect = chai.expect;
    window.sinon = sinon;
    chai.use(sinonChai);

    /*globals mocha */
    mocha.ui('bdd');
    mocha.reporter('html');

    require([
      'test/backbone'
    ], function (require) {
      if (window.mochaPhantomJS) {
        return mochaPhantomJS.run();
      } else {
        return mocha.run();
      }
    });
  });
