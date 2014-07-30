define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    url: '/resources/os',
    parse: function (response) {
      response.name = 'os';
      return response;
    }
  });
});
