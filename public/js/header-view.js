define(
  ['bus',
<<<<<<< HEAD
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/header.hbs',
  'locations-view',
  'os-view'],
function (bus, _, Backbone, Handlebars, headerTmpl, LocationsView, OSView) {
=======
  'backbone',
  'handlebars',
  'text!tmpl/header.hbs'],
function (bus, Backbone, Handlebars, headerTmpl) {
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
  return Backbone.View.extend({
    el: '.header',
    events: {
      'click .js-toggle': 'toggleForm',
      'submit form': 'addDevice'
    },
<<<<<<< HEAD
    initialize: function (options) {
      this.collection = options.collection;
      this.default = {isFormHidden: true};
      this.locationsView = new LocationsView();
      this.osView = new OSView();
      this.render();
    },
    render: function () {
      this.$el.html(Handlebars.compile(headerTmpl)(this.default));
      this.$('.js-location-container').html(this.locationsView.$el);
      this.$('.js-os-container').html(this.osView.$el);
    },
    toggleForm: function (hideForm) {
      this.default.isFormHidden = _.isBoolean(hideForm) ? hideForm : !this.default.isFormHidden;
      this.render();
    },
    addDevice: function (ev) {
      var formObj = this._getFormData(this.$('form'));

      try {
        this.collection.validateAndAddDevice(formObj);
=======
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
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
      } catch (ex) {
        this.showError('Error:' + ex.message);
        return false;
      }
      return false;
    },
<<<<<<< HEAD
    _getFormData: function ($form) {
      try {
        var unindexed_array = $form.serializeArray(),
          indexed_array = {};

        _.map(unindexed_array, function (n, i) {
            indexed_array[n.name] = n.value;
          });

        return indexed_array;
      } catch (ex) {
        console.log(ex);
      }
    },
=======
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
    showError: function (error, device) {
      console.log(error);
    }
  });
});
