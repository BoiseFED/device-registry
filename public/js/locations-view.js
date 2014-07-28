define(
  ['backbone',
  'handlebars',
  'location-model',
  'text!tmpl/dropdown.hbs'],
  function (Backbone, Handlebars, Model, tmpl) {
  return Backbone.View.extend({
    initialize: function () {
      this.model = new Model();
      this.listenTo(this.model, 'sync', this.render);
      this.model.fetch();
    },
    render: function () {
      var model = this.model.toJSON();
      this.$el.html(Handlebars.compile(tmpl)(model));
    }
  });
});
