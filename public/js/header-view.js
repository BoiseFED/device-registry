define(
  ['bus',
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/header.hbs',
  'locations-view',
  'os-view'],
function (bus, _, Backbone, Handlebars, headerTmpl, LocationsView, OSView) {
  return Backbone.View.extend({
    el: '.header',
    events: {
      'click .js-toggle': 'toggleForm',
      'submit form': 'addDevice'
    },
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
      } catch (ex) {
        this.showError('Error:' + ex.message);
        return false;
      }
      return false;
    },
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
    showError: function (error, device) {
      console.log(error);
    }
  });
});
