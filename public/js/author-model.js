define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    url: '/resources/authors',
    parse: function (response) {
      response.name = 'author';
      return response;
    }
  });
});
