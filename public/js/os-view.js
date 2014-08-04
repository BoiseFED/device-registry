define(
  ['backbone',
  'handlebars',
  'os-model',
  'text!tmpl/dropdown.hbs'],
  function (Backbone, Handlebars, model, tmpl) {
  return Backbone.View.extend({
    initialize: function () {
      this.model = model;
      this.render();
    },
    render: function () {
      var model = this.model.toJSON();
      this.$el.html(Handlebars.compile(tmpl)(model));
    }
  });
});
