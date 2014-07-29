define(['bus', 'backbone', 'device-model'], function (bus, Backbone, deviceModel) {
  return Backbone.Collection.extend({
    model: deviceModel,
<<<<<<< HEAD
=======
    initialize: function () {
      this.listenTo(bus, 'validateAndAddDevice', this.validateAndAddDevice);
    },
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
    url: function () {
      return '/api/devices';
    },
    parse: function (resp) {
<<<<<<< HEAD
      return resp;
    },
    validateAndAddDevice: function (model) {
      model.comments = [];
      model.comments.push({
        author: 'system',
        date: Date.now(),
        body: 'Device Created'
      });
=======
      console.log(resp);
      return resp;
    },
    validateAndAddDevice: function (model) {
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
      this.create(model, {validate: true});
    }
  });
});
