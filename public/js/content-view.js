define(
  ['backbone',
  'handlebars',
  'text!tmpl/content.hbs',
  'text!tmpl/content-loading.hbs'],
function (Backbone, Handlebars, tmpl, loadingTmpl) {
  return Backbone.View.extend({
    el: '.content',
    events: {
      'click .js-clear-filter': 'clearFilter'
    },
    initialize: function () {
      this.listenTo(this.model, 'request', function () {
        this.renderLoading();
      });
      this.listenTo(this.model, 'sync', function () {
        this.render();
      });
    },
    render: function () {
      var model = {};
      model.devices = this.model.toJSON();
      model.filters = this.model.filters;
      this.$el.html(Handlebars.compile(tmpl)(model));
    },
    renderLoading: function () {
      this.$el.html(Handlebars.compile(loadingTmpl)({}));
    },
    clearFilter: function (ev) {
      ev.preventDefault();
      this.model.clearFilter();
      this.model.fetch({reset: true});
    }
  });
});
