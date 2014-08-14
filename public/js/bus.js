define(['backbone', 'underscore'], function (Backbone, _) {
  var bus = _.extend({}, Backbone.Events);
  bus.navigate = function (location, options) {
    options = _.extend({trigger: true}, options);
    this.trigger('navigate', location, options);
  };
  return bus;
});
