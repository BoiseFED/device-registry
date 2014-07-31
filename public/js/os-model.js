define(['backbone'], function (Backbone) {
  var Model = Backbone.Model.extend({
    url: '/resources/os',
    parse: function (response) {
      response.name = 'os';
      return response;
    }
  }),
    model = new Model();

  model.fetch();
  return model;
});
