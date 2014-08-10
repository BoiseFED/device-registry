define(
  ['backbone',
  'handlebars',
  'text!tmpl/content.hbs',
  'text!tmpl/content-loading.hbs'],
function (Backbone, Handlebars, tmpl, loadingTmpl) {
  return Backbone.View.extend({
    el: '.content',
    events: {
      'click .js-clear-filter': 'clearFilter',
      'click .viewswitch a': 'toggleViewType',
      'click .header .device-info div': 'sortData',
    },
    initialize: function () {
      this.viewType = 'grid';
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
      model.sort = this.model.sort;
      model.order = this.model.order;
      model.viewType = this.viewType;
      this.$el.html(Handlebars.compile(tmpl)(model));
    },
    renderLoading: function () {
      this.$el.html(Handlebars.compile(loadingTmpl)({}));
    },
    clearFilter: function (ev) {
      ev.preventDefault();
      this.model.clearFilter();
    },
    toggleViewType: function (ev) {
      ev.preventDefault();
      this.viewType = (this.viewType === 'grid') ? 'list' : 'grid';
      this.render();
    },
    sortData: function (ev) {
      ev.preventDefault();
      var ele = this.$(ev.target),
        sortBy = ele.data('sortby'),
        asc = ele.data('asc');
      this.model.sortBy(sortBy, asc);
    }
  });
});
