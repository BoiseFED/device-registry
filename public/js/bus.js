define(['backbone', 'underscore'], function (Backbone, _) {
  var bus = _.extend({}, Backbone.Events);
  return bus;
});
