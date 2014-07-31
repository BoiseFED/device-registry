define(['underscore', 'backbone'], function (_, Backbone) {
  var Model = Backbone.Model.extend({
    url: '/resources/locations',
    parse: function (response) {
      response.name = 'location';
      return response;
    },
    contains: function (location) {
      return _.contains(this.get('values'), location);
    }
  }),
    model = new Model();

  model.fetch();
  return model;
});
