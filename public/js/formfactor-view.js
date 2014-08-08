define(
  ['backbone',
  'handlebars',
  'formfactor-model',
  'text!tmpl/dropdown.hbs'],
  function (Backbone, Handlebars, model, tmpl) {
  return Backbone.View.extend({
    initialize: function () {
      this.model = model;
      this.listenTo(this.model, 'sync', this.render);
      this.model.fetch();
    },
    render: function () {
      var model = this.model.toJSON();
      this.$el.html(Handlebars.compile(tmpl)(model));
    }
  });
});
