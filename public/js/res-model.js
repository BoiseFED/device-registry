define(['underscore', 'backbone'], function (_, Backbone) {
  var Model = Backbone.Model.extend({
    initialize: function (options) {
      this.type = options.type;
    },
    url: function () {
      return '/resources/' + this.type;
    },
    parse: function (response) {
      response.name = this.type;
      return response;
    },
    contains: function (value) {
      return _.contains(this.get('values'), value);
    }
  });
  return Model;
});
