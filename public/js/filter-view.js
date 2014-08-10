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
      var filterText = this.$('.js-filter').val();
      this.model.filterBy(filterText);
    },
  });
});
