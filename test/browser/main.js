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
    mocha: '../../node_modules/mocha/mocha',
    fixtures: '../../test/browser/fixtures',
    test: '../../test/browser'
  },
  shim: {
    'mocha': {
      exports: 'mocha'
    }
  }
});

require(['require', 'chai', 'mocha'], function (require, chai, mocha) {
  // Chai
  window.expect = chai.expect;

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
