define(['underscore', 'bus', 'backbone', 'device-model'], function (_, bus, Backbone, deviceModel) {
  return Backbone.Collection.extend({
    initialize: function () {
      this.order = '';
      this.sort = 'name';
    },
    model: deviceModel,
    url: function () {
      var url = '/api/devices?select=-comments',
        filters = [];
      if (_.isObject(this.filters)) {
        filters = _.map(this.filters, function (value, key) {
          switch (key.toLowerCase()) {
            case 'ischeckedout':
              return 'isCheckedOut=true';
            case 'isnotcheckedout':
              return 'isCheckedOut=false';
          }
          return key + '__nocase=' + value;
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
        body: 'Device Created',
        type: 'created'
      }];
      var validationModel = new this.model(),
        errors = validationModel.validate(model);
      if (errors) {
        return errors;
      }
      this.create(model, {validate: false});
    },
    filterBy: function (filters) {
      this.filters = filters;
      this.fetch({reset: true});
    },
    clearFilter: function () {
      this.filters = null;
      this.fetch({reset: true});
    },
    sortBy: function (field) {
      this.sort = field;
      this.fetch({reset: true});
    },
    clearSort: function () {
      this.sort = null;
      this.fetch({reset: true});
    },
    toggleOrder: function () {
      this.order = (this.order === '-') ? '' : '-';
      this.fetch({reset: true});
    }
  });
});
