define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    url: '/resources/locations',
    parse: function (response) {
      response.name = 'location';
      return response;
    }
  });
});
