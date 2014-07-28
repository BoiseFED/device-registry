define(
  ['bus',
  'backbone',
  'handlebars',
  'text!tmpl/header.hbs'],
function (bus, Backbone, Handlebars, headerTmpl) {
  return Backbone.View.extend({
    el: '.header',
    events: {
      'click .js-toggle': 'toggleForm',
      'submit form': 'addDevice'
    },
    initialize: function () {
      this.default = {isFormHidden: true};
      this.render();
      this.listenTo(bus, 'invalidDevice', this.showError);
    },
    render: function () {
      this.$el.html(Handlebars.compile(headerTmpl)(this.default));
    },
    toggleForm: function () {
      this.default.isFormHidden = !this.default.isFormHidden;
      this.render();
    },
    addDevice: function (ev) {
      var deviceAsText = this.$('.js-new-device').val(),
        deviceAsObj = {};
      try {
        try {
          deviceAsObj = JSON.parse(deviceAsText);
        } catch (ex) {
          this.showError('Invalid JSON: ' + ex.message);
          return false;
        }
        bus.trigger('validateAndAddDevice', deviceAsObj);
      } catch (ex) {
        this.showError('Error:' + ex.message);
        return false;
      }
      return false;
    },
    showError: function (error, device) {
      console.log(error);
    }
  });
});
