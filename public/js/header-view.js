define(
  ['bus',
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/header.hbs',
  'locations-view',
  'os-view',
  'formfactor-view'],
function (
  bus,
  $,
  _,
  Backbone,
  Handlebars,
  headerTmpl,
  LocationsView,
  OSView,
  FormFactorView
) {
  return Backbone.View.extend({
    el: '.header',
    events: {
      'click .js-toggleform': 'toggleForm',
      'click .js-togglefilter': 'toggleFilter',
      'submit form': 'addDevice'
    },
    initialize: function (options) {
      this.default = {isFormHidden: true, isFilterHidden: false};
      this.locationsView = new LocationsView();
      this.osView = new OSView();
      this.formFactorView = new FormFactorView();
      this.render();
    },
    render: function () {
      this.$el.html(Handlebars.compile(headerTmpl)(this.default));
      this.$('.js-location-container').html(this.locationsView.$el);
      this.$('.js-os-container').html(this.osView.$el);
      this.$('.js-formfactor-container').html(this.formFactorView.$el);
    },
    toggleForm: function (hideForm) {
      $('.filter').addClass('hidden');
      this.$('.form').toggleClass('hidden');
    },
    toggleFilter: function () {
      this.$('.form').addClass('hidden');
      $('.filter').toggleClass('hidden');
    },
    addDevice: function (ev) {
      ev.preventDefault();
      var formObj = this._getFormData(this.$('form')),
        errors;

      errors = this.model.validateAndAddDevice(formObj);
      bus.trigger('error', errors);

      if (!errors) {
        this.resetForm();
        this.toggleForm(true);
      }

      return false;
    },
    resetForm: function () {
      this.$('form')[0].reset();
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
    }
  });
});
