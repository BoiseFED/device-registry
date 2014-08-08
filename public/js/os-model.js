define([
  'underscore',
  'backbone',
  'json!resources/os.json'
], function (
  _,
  Backbone,
  os
) {
  var model = new Backbone.Model(os);
  return model;
});
