define([
  'underscore',
  'backbone',
  'json!resources/formfactors.json'
], function (
  _,
  Backbone,
  formfactors
) {
  var model = new Backbone.Model(formfactors);
  return model;
});
