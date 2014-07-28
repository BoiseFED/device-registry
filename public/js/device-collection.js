define(['bus', 'backbone', 'device-model'], function (bus, Backbone, deviceModel) {
  return Backbone.Collection.extend({
    model: deviceModel,
    initialize: function () {
      this.listenTo(bus, 'validateAndAddDevice', this.validateAndAddDevice);
    },
    url: function () {
      return '/api/devices';
    },
    parse: function (resp) {
      console.log(resp);
      return resp;
    },
    validateAndAddDevice: function (model) {
      this.create(model, {validate: true});
    }
  });
});
