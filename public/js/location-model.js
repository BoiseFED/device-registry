define([
  'underscore',
  'backbone',
  'json!resources/locations.json'
], function (
  _,
  Backbone,
  locations
) {
  locations.name = 'location';
  var Model = Backbone.Model.extend({
    contains: function (location) {
      return _.contains(this.get('values'), location);
    }
  }),
    model = new Model(locations);
  return model;
});
