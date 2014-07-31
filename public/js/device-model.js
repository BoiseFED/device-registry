define(['backbone', 'bus'], function (Backbone, bus) {
  return Backbone.Model.extend({
    validate: function () {
      return false;
    },
    parse: function (response) {
      return response;
    }
  });
});
