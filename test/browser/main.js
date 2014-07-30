requirejs.config({
  paths: {
    chai: '../../node_modules/chai/chai',
    mocha: '../../node_modules/mocha/mocha'
  },
  shim: {
    'mocha': {
      exports: 'mocha'
    }
  }
});

require(['require', 'chai', 'mocha'], function (require, chai, mocha) {
  // Chai
  var should = chai.should();

  /*globals mocha */
  mocha.ui('bdd');
  mocha.reporter('html');

  require([
    'test'
  ], function (require) {
      if (window.mochaPhantomJS) {
        return mochaPhantomJS.run();
      } else {
        return mocha.run();
      }
    });
});
