requirejs.config({
  baseUrl: '../../public/js/',
  paths: {
    backbone: '../vendor/backbone/backbone',
    handlebars: '../vendor/handlebars/handlebars.min',
    jquery: '../vendor/jquery/dist/jquery.min',
    text: '../vendor/requirejs-text/text',
    json: '../vendor/requirejs-plugins/src/json',
    underscore: '../vendor/underscore/underscore',
    chai: '../../node_modules/chai/chai',
    sinon: '../vendor/sinonjs/sinon',
    sinonChai: '../../node_modules/sinon-chai/lib/sinon-chai',
    mocha: '../../node_modules/mocha/mocha',
    fixtures: '../../test/browser/fixtures',
    test: '../../test/browser'
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
