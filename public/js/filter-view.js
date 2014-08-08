define([
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/filter.hbs'
], function (
  _,
  Backbone,
  Handlebars,
  tmpl
) {
  return Backbone.View.extend({
    el: '.filter',
    events: {
      'click .js-search': 'changeFilter'
    },
    keys : {
      'enter': 'changeFilter'
    },
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(Handlebars.compile(tmpl)({}));
    },
    changeFilter: function () {
      var filterText = this.$('.js-filter').val(),
        filters = _.reduce(filterText.split(' '), function (filters, filter) {
          var keyval = filter.split(':');
          if (!_.isEmpty(keyval[0])) {
            filters[keyval[0]] = keyval[1];
          }
          return filters;
        }, {});
      if (!_.isEmpty(filters)) {
        this.model.filterBy(filters);
      }
    },
  });
});
