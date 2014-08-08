define([
  'underscore',
  'backbone',
  'json!resources/formfactors.json'
], function (
  _,
  Backbone,
  formfactors
) {
  formfactors.name = 'formfactor';
  var model = new Backbone.Model(formfactors);
  return model;
});
