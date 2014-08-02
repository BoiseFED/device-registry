define(
  ['backbone',
  'handlebars',
  'text!tmpl/content.hbs'],
function (Backbone, Handlebars, tmpl) {
  return Backbone.View.extend({
    el: '.content',
    initialize: function () {
      this.listenTo(this.model, 'request', function () {
        this.renderLoading();
      });
      this.listenTo(this.model, 'sync', function () {
        this.render();
      });
    },
    render: function () {
      var model = this.model.toJSON();
      this.$el.html(Handlebars.compile(tmpl)(model));
    },
    renderLoading: function () {
      this.$el.html('LOADING...');
    }
  });
});
