define(['backbone', 'underscore'], function (Backbone, _) {
  var bus = _.extend({}, Backbone.Events);
  bus.on('all', function () {
    console.log('Event Recieved', arguments);
  });
  return bus;
});
