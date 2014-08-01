define(['underscore', 'bus', 'backbone', 'device-model'], function (_, bus, Backbone, deviceModel) {
  return Backbone.Collection.extend({
    initialize: function () {
      this.order = '';
    },
    model: deviceModel,
    url: function () {
      var url = '/api/devices?select=-comments',
        filters = [];
      if (_.isObject(this.filters)) {
        filters = _.map(this.filters, function (value, key) {
          return key + '=' + value;
        });
        url += '&' + filters.join('&');
      }

      if (_.isString(this.sort) && !_.isEmpty(this.sort)) {
        url += '&sort=' + this.order + this.sort;
      }
      return url;
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
    },
    filterBy: function (filters) {
      this.filters = filters;
    },
    clearFilter: function () {
      this.filters = null;
    },
    sortBy: function (field) {
      this.sort = field;
    },
    clearSort: function () {
      this.sort = null;
    },
    toggleOrder: function () {
      this.order = (this.order === '-') ? '' : '-';
    }
  });
});
