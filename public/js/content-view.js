define(
  [
  'jquery',
  'backbone',
  'handlebars',
  'bus',
  'text!tmpl/content.hbs',
  'text!tmpl/content-loading.hbs'
],
function ($, Backbone, Handlebars, bus, tmpl, loadingTmpl) {
  return Backbone.View.extend({
    tagName: 'div',
    className: 'content',
    events: {
      'click .js-clear-filter': 'clearFilter',
      'click .device': 'moreInfo'
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
    },
    moreInfo: function (ev) {
      ev.preventDefault();
      var device = this.$(ev.currentTarget);
      bus.navigate('device/' + device.attr('id'));
    }
  });
});
