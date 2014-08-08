define([
  'underscore',
  'backbone',
  'location-model',
  'os-model',
  'formfactor-model'
],
function (
  _,
  Backbone,
  locationModel,
  osModel,
  formFactorModel
) {
  var Model = Backbone.Model.extend({
    filters: {
      location: locationModel.get('values'),
      os: osModel.get('values'),
      formfactor: formFactorModel.get('values'),
      version: [],
      serial: [],
      checkedoutto: [],
      checkedout: [true, false]
    },
    filter: function (input) {
      var multi,
        multiInput = input.split(' '),
        lastInput = _.last(multiInput);

      if (_.contains(lastInput.split(''), ':')) {
        multi = lastInput.split(':');
        return this.filterValue(multi[0], multi[1]);
      } else {
        return this.filterField(lastInput);
      }
    },
    filterField: function (input) {
      var keys = _.map(this.filters, function (value, key) {
        return key;
      }),
        filtered = _.filter(keys, function (key) {
          return _.startsWith(key.toLowerCase(), input.toLowerCase());
        });

      if (_.isEmpty(filtered)) {
        return keys;
      }

      return filtered;
    },
    filterValue: function (field, input) {
      var values = this.filters[field.toLowerCase()],
        filtered = _.filter(values, function (value) {
          return _.startsWith(value.toLowerCase(), input.toLowerCase());
        });

      if (_.isEmpty(filtered)) {
        return values;
      }

      return filtered;
    }
  }),
  model = new Model();
  return model;
});
