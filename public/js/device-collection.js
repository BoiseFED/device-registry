define(['bus', 'backbone', 'device-model'], function (bus, Backbone, deviceModel) {
  return Backbone.Collection.extend({
    model: deviceModel,
    url: function () {
      return '/api/devices';
    },
    parse: function (resp) {
      return resp;
    },
    validateAndAddDevice: function (model) {
      model.comments = [{
        author: 'system',
        date: Date.now(),
        body: 'Device Created'
      }];
      this.create(model, {validate: true});
    }
  });
});
