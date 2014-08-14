define([
  'jquery',
  'backbone',
  'bus',
  'header-view',
  'footer-view',
  'content-view',
  'error-view',
  'filter-view',
  'device-model',
  'device-collection',
  'device-view'
], function (
  $,
  Backbone,
  bus,
  HeaderView,
  FooterView,
  ContentView,
  ErrorView,
  FilterView,
  DeviceModel,
  DeviceCollection,
  DeviceView
) {
  var Router = Backbone.Router.extend({
    initialize: function () {
      this.listenTo(bus, 'navigate', this.navigate);
      this.deviceCollection = new DeviceCollection();
      this.hederView = new HeaderView({model: this.deviceCollection});
      this.errorView = new ErrorView();
      this.footerView = new FooterView();
      this.filterView = new FilterView({model: this.deviceCollection});
    },
    routes: {
      'device/:id': 'device',
      '': 'list'
    },
    list: function () {
      this._cleanUpViews();
      this.contentView = new ContentView({model: this.deviceCollection});
      $('.content-container').html(this.contentView.$el);
      this.deviceCollection.fetch();
    },
    device: function (device) {
      this._cleanUpViews();
      var model = new DeviceModel({_id: device});
      this.contentView = new DeviceView({model: model});
      $('.content-container').html(this.contentView.$el);
      model.fetch({reset: true});
    },
    _cleanUpViews: function () {
      if (this.contentView) {
        this.contentView.remove();
      }
    }
  }),
    retVal = new Router();
  Backbone.history.start({pushState: false});
  return retVal;
});
